package com.serp.service;

import com.serp.model.BenchmarkResult;
import com.serp.model.SerpPaper;
import com.serp.model.SummarizeRequest;
import com.serp.model.SummarizeResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class MultithreadedBenchmarkService {

    @Autowired
    private CrimeReportingAnalysisService crimeService;

    @Autowired
    private DeepLearningAnalysisService deepLearningService;

    @Autowired
    private PaperDatasetService datasetService;

    public List<BenchmarkResult> runThreadBenchmark() {
        int[] threadCounts = {1, 2, 4, 8, 16};
        List<BenchmarkResult> results = new ArrayList<>();

        long baselineTimeMs = 0;

        for (int threads : threadCounts) {
            long startTime = System.currentTimeMillis();

            // Execute both extraction tasks under specified thread allocation
            for (int i = 0; i < 5; i++) { // run multiple iterations to measure work load
                crimeService.analyzeFeatures(threads);
                deepLearningService.analyzeSubheadings(threads);
            }

            long duration = Math.max(1, System.currentTimeMillis() - startTime);

            if (threads == 1) {
                baselineTimeMs = duration;
            }

            double speedup = Math.round(( (double) baselineTimeMs / duration ) * 100.0) / 100.0;
            int totalPapersProcessed = (datasetService.getCrimeReportingPapers().size() + datasetService.getDeepLearningPapers().size()) * 5;
            double throughput = Math.round((totalPapersProcessed / (duration / 1000.0)) * 10.0) / 10.0;

            results.add(new BenchmarkResult(threads, duration, speedup, throughput));
        }

        return results;
    }

    public SummarizeResponse summarizeSerpContent(SummarizeRequest request) {
        long startTime = System.currentTimeMillis();

        String query = request.getQuery() != null ? request.getQuery().trim().toLowerCase() : "";
        String domainFilter = request.getDomain() != null ? request.getDomain().toUpperCase() : "ALL";

        List<SerpPaper> candidates = datasetService.getAllPapers();
        if ("CRIME_REPORTING".equals(domainFilter)) {
            candidates = datasetService.getCrimeReportingPapers();
        } else if ("DEEP_LEARNING".equals(domainFilter)) {
            candidates = datasetService.getDeepLearningPapers();
        }

        List<SerpPaper> matches = candidates.stream()
            .filter(p -> query.isEmpty() ||
                p.getTitle().toLowerCase().contains(query) ||
                p.getAbstractText().toLowerCase().contains(query) ||
                p.getFeaturesOrSubheadings().stream().anyMatch(f -> f.toLowerCase().contains(query)))
            .collect(Collectors.toList());

        if (matches.isEmpty()) {
            matches = candidates.subList(0, Math.min(3, candidates.size()));
        }

        List<String> keywords = Arrays.asList(query.split("\\s+")).stream()
            .filter(k -> k.length() > 2)
            .distinct()
            .collect(Collectors.toList());

        if (keywords.isEmpty()) {
            keywords = Arrays.asList("SERP", "Semantics", "Multithreaded", "Feature Mining");
        }

        StringBuilder summary = new StringBuilder();
        summary.append("Synthesis of Search Engine Results Pages (SERP) matching query '").append(query).append("': ");
        summary.append("Across ").append(matches.size()).append(" analyzed academic paper records, key structural themes focus on ");
        
        List<String> featureHighlights = matches.stream()
            .flatMap(p -> p.getFeaturesOrSubheadings().stream())
            .distinct()
            .limit(4)
            .collect(Collectors.toList());

        summary.append(String.join(", ", featureHighlights)).append(". ");
        summary.append("Semantic parsing demonstrates that research in this domain heavily prioritizes systematic empirical evaluation, standardized reporting taxonomies, and multi-thread data ingestion.");

        long duration = System.currentTimeMillis() - startTime;

        return new SummarizeResponse(
            request.getQuery(),
            summary.toString(),
            keywords,
            matches.size(),
            matches.subList(0, Math.min(5, matches.size())),
            duration
        );
    }
}
