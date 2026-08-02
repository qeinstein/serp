package com.serp.service;

import com.serp.model.CrimeFeatureResult;
import com.serp.model.SerpPaper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.*;
import java.util.stream.Collectors;

@Service
public class CrimeReportingAnalysisService {

    @Autowired
    private PaperDatasetService datasetService;

    // Feature definitions with details
    private static final Map<String, String[]> FEATURE_METADATA = new LinkedHashMap<>();

    static {
        FEATURE_METADATA.put("GIS Spatial Mapping & Hotspot Visualization", new String[]{
            "Spatial Visualization & Mapping",
            "Interactive crime map overlays, kernel density heatmap rendering, and GIS spatial layer integration for geographical law enforcement analysis.",
            "Crucial for tactical patrol allocation and geographical risk assessment."
        });
        FEATURE_METADATA.put("Real-Time Alert Dispatch", new String[]{
            "Alerting & Emergency Operations",
            "Automated alert broadcasting, push notifications, and emergency unit dispatch upon incident report ingestion.",
            "Drastically reduces emergency response latency from minutes to seconds."
        });
        FEATURE_METADATA.put("Anonymous Tip Submission & Privacy Shield", new String[]{
            "Privacy & Reporter Protection",
            "Zero-knowledge encrypted submission portals, proxy routing, and metadata scrubbers to protect whistleblower and witness identities.",
            "Encourages community reporting by eliminating fear of retaliation."
        });
        FEATURE_METADATA.put("Predictive Hotspot & Temporal Analytics", new String[]{
            "Predictive Analytics & AI",
            "Statistical modeling (Hawkes process, time-series forecasting) to anticipate high-probability future crime locations and times.",
            "Enables proactive deterrence rather than reactive investigation."
        });
        FEATURE_METADATA.put("Multi-Agency Interoperability Protocol", new String[]{
            "System Integration & Interoperability",
            "Standardized API exchange protocols (e.g., NIEM, GraphQL) enabling seamless data federation across municipal, state, and federal law enforcement agencies.",
            "Breaks down agency data silos for unified regional intelligence."
        });
        FEATURE_METADATA.put("Mobile Field Incident Logging", new String[]{
            "Field Mobility & Remote Logging",
            "Mobile-first offline reporting UI with GPS auto-tagging, voice-to-text transcription, and immediate sync upon network restoration.",
            "Empowers field officers to log incidents directly at crime scenes."
        });
        FEATURE_METADATA.put("Evidence & Multimedia Attachment Vault", new String[]{
            "Forensics & Data Ingestion",
            "Secure cloud storage for high-resolution crime scene photos, bodycam video streams, audio recordings, and forensic documents.",
            "Centralizes digital evidence management with cryptographic hashing."
        });
        FEATURE_METADATA.put("Incident Categorization & Classification", new String[]{
            "Taxonomy & Machine Learning",
            "Automated multi-label categorization (e.g., burglary, assault, cybercrime, narcotics) based on legal statutes and offense codes.",
            "Standardizes reporting taxonomies across disparate jurisdiction codes."
        });
        FEATURE_METADATA.put("Audit Trail & Digital Chain-of-Custody", new String[]{
            "Security & Legal Compliance",
            "Immutable audit logs and cryptographic evidence timestamps tracking every edit, access, and transfer of crime records.",
            "Ensures legal admissibility and prevents evidence tampering in court."
        });
        FEATURE_METADATA.put("Automated NLP Victimology & Narrative Mining", new String[]{
            "Natural Language Processing",
            "Transformer-based named entity recognition (NER) extracting suspect descriptors, victim demographics, and incident chronologies from unstructured text.",
            "Transforms raw officer narratives into structured relational data."
        });
        FEATURE_METADATA.put("Automated Suspect & Modus Operandi Re-Identification", new String[]{
            "Pattern Recognition & Re-ID",
            "Graph matching algorithms linking repeat criminal patterns, modus operandi signatures, and suspect characteristics across cold cases.",
            "Accelerates serial crime resolution through pattern mining."
        });
        FEATURE_METADATA.put("Statistical Crime Forecasting", new String[]{
            "Predictive Analytics & AI",
            "Long-term macro-level longitudinal statistical forecasting models predicting quarterly crime rate shifts based on socio-economic variables.",
            "Guides strategic budget allocations and policy decisions."
        });
    }

    public List<CrimeFeatureResult> analyzeFeatures(int threadCount) {
        List<SerpPaper> papers = datasetService.getCrimeReportingPapers();
        int totalSystems = papers.size();

        // Concurrent map to accumulate adoption per feature safely across threads
        ConcurrentHashMap<String, List<String>> featureAdoptersMap = new ConcurrentHashMap<>();

        ExecutorService executor = Executors.newFixedThreadPool(Math.max(1, threadCount));

        try {
            // Concurrently process each paper in separate worker thread tasks
            List<CompletableFuture<Void>> futures = papers.stream()
                .map(paper -> CompletableFuture.runAsync(() -> {
                    // Simulate CPU work / paper parsing
                    simulateProcessingDelay();

                    List<String> features = paper.getFeaturesOrSubheadings();
                    for (String feature : features) {
                        featureAdoptersMap.computeIfAbsent(feature, k -> Collections.synchronizedList(new ArrayList<>()))
                            .add(paper.getTitle());
                    }
                }, executor))
                .collect(Collectors.toList());

            // Wait for all worker threads to complete
            CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();
        } finally {
            executor.shutdown();
        }

        // Transform into sorted list ordered by system count descending (Part 1 requirement)
        List<CrimeFeatureResult> results = new ArrayList<>();

        // Ensure all 12 defined features are evaluated even if dataset evolves
        FEATURE_METADATA.forEach((featureName, meta) -> {
            List<String> adopters = featureAdoptersMap.getOrDefault(featureName, Collections.emptyList());
            int count = adopters.size();
            double pct = Math.round((count * 100.0 / totalSystems) * 10.0) / 10.0;

            results.add(new CrimeFeatureResult(
                0, // rank set later
                featureName,
                meta[0], // category
                meta[1], // description
                count,
                pct,
                new ArrayList<>(adopters),
                meta[2] // technicalImpact
            ));
        });

        // Sort in order of number of systems having the feature (Descending)
        results.sort((a, b) -> Integer.compare(b.getSystemCount(), a.getSystemCount()));

        // Assign ranks 1 to N
        for (int i = 0; i < results.size(); i++) {
            results.get(i).setRank(i + 1);
        }

        return results;
    }

    private void simulateProcessingDelay() {
        try {
            Thread.sleep(15);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
