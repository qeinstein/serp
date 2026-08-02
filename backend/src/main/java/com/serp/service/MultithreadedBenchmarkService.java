package com.serp.service;

import com.serp.model.BenchmarkResult;
import com.serp.model.SearchResult;
import com.serp.model.SerpPaper;
import com.serp.model.SerpSearchResponse;
import com.serp.model.SummarizeRequest;
import com.serp.model.SummarizeResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.*;
import java.util.stream.Collectors;

@Service
public class MultithreadedBenchmarkService {

    @Autowired
    private CrimeReportingAnalysisService crimeService;

    @Autowired
    private DeepLearningAnalysisService deepLearningService;

    @Autowired
    private PaperDatasetService datasetService;

    // ────────────────────────────────────────────────────────────────────────
    // Stopwords to exclude from scoring
    // ────────────────────────────────────────────────────────────────────────
    private static final Set<String> STOPWORDS = new HashSet<>(Arrays.asList(
        "the","a","an","and","or","of","in","on","for","to","with","at","by",
        "from","is","are","was","were","be","been","that","this","it","as",
        "which","not","but","its","into","than","has","have","had"
    ));

    // ────────────────────────────────────────────────────────────────────────
    // Real Multithreaded Search  (GET /api/v1/serp/search)
    // ────────────────────────────────────────────────────────────────────────
    public SerpSearchResponse search(String rawQuery, String domainFilter, int threadCount) {
        long startTime = System.currentTimeMillis();

        // 1. Tokenise & clean query
        List<String> tokens = tokenise(rawQuery);
        if (tokens.isEmpty()) {
            return new SerpSearchResponse(rawQuery, tokens, 0,
                    System.currentTimeMillis() - startTime,
                    "Please enter a search query to find relevant academic papers.",
                    Collections.emptyList());
        }

        // 2. Choose candidate corpus
        List<SerpPaper> corpus = chooseCandidates(domainFilter);

        // 3. Concurrently score every paper using a thread pool
        ExecutorService executor = Executors.newFixedThreadPool(Math.max(1, threadCount));
        ConcurrentLinkedQueue<SearchResult> resultQueue = new ConcurrentLinkedQueue<>();

        List<CompletableFuture<Void>> futures = corpus.stream()
            .map(paper -> CompletableFuture.runAsync(() -> {
                double score = score(paper, tokens);
                if (score > 0.0) {
                    String snippet = buildSnippet(paper, tokens);
                    resultQueue.add(new SearchResult(paper, score, snippet));
                }
            }, executor))
            .collect(Collectors.toList());

        CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();
        executor.shutdown();

        // 4. Sort by relevance descending
        List<SearchResult> ranked = resultQueue.stream()
            .sorted(Comparator.comparingDouble(SearchResult::getRelevanceScore).reversed())
            .collect(Collectors.toList());

        // 5. Build semantic summary over top results
        String summary = buildSemanticSummary(rawQuery, tokens, ranked);

        long duration = System.currentTimeMillis() - startTime;
        return new SerpSearchResponse(rawQuery, tokens, ranked.size(), duration, summary, ranked);
    }

    // ────────────────────────────────────────────────────────────────────────
    // TF-based relevance scoring
    // Field weights: title × 10, features/subheadings × 6, abstract × 3, authors × 2, journal × 1
    // ────────────────────────────────────────────────────────────────────────
    private double score(SerpPaper paper, List<String> tokens) {
        double score = 0.0;
        for (String token : tokens) {
            score += countOccurrences(paper.getTitle(), token)              * 10.0;
            score += countOccurrences(paper.getAbstractText(), token)       *  3.0;
            score += countOccurrences(paper.getAuthors(), token)            *  2.0;
            score += countOccurrences(paper.getJournal(), token)            *  1.0;
            score += countOccurrences(String.join(" ", paper.getFeaturesOrSubheadings()), token) * 6.0;
        }
        return score;
    }

    private int countOccurrences(String text, String token) {
        if (text == null || token == null) return 0;
        String lower = text.toLowerCase();
        int count = 0;
        int idx = 0;
        while ((idx = lower.indexOf(token, idx)) != -1) { count++; idx += token.length(); }
        return count;
    }

    // ────────────────────────────────────────────────────────────────────────
    // Snippet: finds the sentence in the abstract containing most query tokens
    // ────────────────────────────────────────────────────────────────────────
    private String buildSnippet(SerpPaper paper, List<String> tokens) {
        String[] sentences = paper.getAbstractText().split("[\\.!?]\\s+");
        String best = paper.getAbstractText();
        int bestHits = 0;
        for (String sentence : sentences) {
            String lc = sentence.toLowerCase();
            long hits = tokens.stream().filter(lc::contains).count();
            if (hits > bestHits) { bestHits = (int) hits; best = sentence.trim(); }
        }
        // Trim to ~240 chars
        return best.length() > 240 ? best.substring(0, 237) + "…" : best;
    }

    // ────────────────────────────────────────────────────────────────────────
    // Semantic summary generation over top-5 results
    // ────────────────────────────────────────────────────────────────────────
    private String buildSemanticSummary(String query, List<String> tokens, List<SearchResult> ranked) {
        if (ranked.isEmpty()) {
            return "No papers matched the query "" + query + "". Try broader terms such as "spatial", "GIS", "transformer", or "deep learning".";
        }

        // Collect dominant features/subheadings across top results
        List<String> topHighlights = ranked.stream()
            .limit(5)
            .flatMap(r -> r.getPaper().getFeaturesOrSubheadings().stream())
            .filter(f -> tokens.stream().anyMatch(t -> f.toLowerCase().contains(t)))
            .distinct()
            .limit(4)
            .collect(Collectors.toList());

        if (topHighlights.isEmpty()) {
            topHighlights = ranked.stream()
                .limit(3)
                .flatMap(r -> r.getPaper().getFeaturesOrSubheadings().stream())
                .distinct()
                .limit(3)
                .collect(Collectors.toList());
        }

        // Summarise by domain split
        long crimeCount = ranked.stream().filter(r -> "CRIME_REPORTING".equals(r.getPaper().getDomain())).count();
        long dlCount    = ranked.stream().filter(r -> "DEEP_LEARNING".equals(r.getPaper().getDomain())).count();

        StringBuilder sb = new StringBuilder();
        sb.append("Search Engine Results for "").append(query).append("" — ");
        sb.append(ranked.size()).append(" paper").append(ranked.size() != 1 ? "s" : "").append(" found");

        if (crimeCount > 0 && dlCount > 0) {
            sb.append(" across crime-reporting systems (").append(crimeCount).append(") and deep learning publications (").append(dlCount).append(")");
        } else if (crimeCount > 0) {
            sb.append(" in crime-reporting systems literature");
        } else {
            sb.append(" in deep learning publications");
        }
        sb.append(". ");

        if (!topHighlights.isEmpty()) {
            sb.append("Key themes identified: ").append(String.join("; ", topHighlights)).append(". ");
        }

        sb.append("The highest-ranked result is "")
          .append(ranked.get(0).getPaper().getTitle())
          .append("" (").append(ranked.get(0).getPaper().getYear()).append(").");

        return sb.toString();
    }

    // ────────────────────────────────────────────────────────────────────────
    // Tokeniser: lowercase, split on non-alphanumeric, remove stopwords & short tokens
    // ────────────────────────────────────────────────────────────────────────
    private List<String> tokenise(String raw) {
        if (raw == null || raw.isBlank()) return Collections.emptyList();
        return Arrays.stream(raw.toLowerCase().split("[^a-z0-9]+"))
            .filter(t -> t.length() > 1 && !STOPWORDS.contains(t))
            .distinct()
            .collect(Collectors.toList());
    }

    private List<SerpPaper> chooseCandidates(String domainFilter) {
        if ("CRIME_REPORTING".equalsIgnoreCase(domainFilter)) return datasetService.getCrimeReportingPapers();
        if ("DEEP_LEARNING".equalsIgnoreCase(domainFilter))   return datasetService.getDeepLearningPapers();
        return datasetService.getAllPapers();
    }

    // ────────────────────────────────────────────────────────────────────────
    // Thread benchmark  (GET /api/v1/serp/benchmark)
    // ────────────────────────────────────────────────────────────────────────
    public List<BenchmarkResult> runThreadBenchmark() {
        int[] threadCounts = {1, 2, 4, 8, 16};
        List<BenchmarkResult> results = new ArrayList<>();
        long baselineTimeMs = 0;

        for (int threads : threadCounts) {
            long startTime = System.currentTimeMillis();
            for (int i = 0; i < 5; i++) {
                crimeService.analyzeFeatures(threads);
                deepLearningService.analyzeSubheadings(threads);
            }
            long duration = Math.max(1, System.currentTimeMillis() - startTime);
            if (threads == 1) baselineTimeMs = duration;

            double speedup = Math.round((double) baselineTimeMs / duration * 100.0) / 100.0;
            int total = (datasetService.getCrimeReportingPapers().size() + datasetService.getDeepLearningPapers().size()) * 5;
            double throughput = Math.round(total / (duration / 1000.0) * 10.0) / 10.0;

            results.add(new BenchmarkResult(threads, duration, speedup, throughput));
        }
        return results;
    }

    // ────────────────────────────────────────────────────────────────────────
    // Legacy summarize endpoint (kept for backward compat)
    // ────────────────────────────────────────────────────────────────────────
    public SummarizeResponse summarizeSerpContent(SummarizeRequest request) {
        SerpSearchResponse r = search(request.getQuery(), request.getDomain(), 4);
        List<SerpPaper> papers = r.getResults().stream()
            .map(SearchResult::getPaper)
            .collect(Collectors.toList());

        return new SummarizeResponse(
            request.getQuery(),
            r.getSemanticSummary(),
            r.getTokens(),
            r.getTotalResults(),
            papers.subList(0, Math.min(5, papers.size())),
            r.getExecutionTimeMs()
        );
    }
}
