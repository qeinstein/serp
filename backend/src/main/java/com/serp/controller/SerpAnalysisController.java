package com.serp.controller;

import com.serp.model.*;
import com.serp.service.CrimeReportingAnalysisService;
import com.serp.service.DeepLearningAnalysisService;
import com.serp.service.MultithreadedBenchmarkService;
import com.serp.service.PaperDatasetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class SerpAnalysisController {

    @Autowired
    private CrimeReportingAnalysisService crimeService;

    @Autowired
    private DeepLearningAnalysisService deepLearningService;

    @Autowired
    private MultithreadedBenchmarkService benchmarkService;

    @Autowired
    private PaperDatasetService datasetService;

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("service", "serp-backend");
        response.put("timestamp", System.currentTimeMillis());
        response.put("availableProcessors", Runtime.getRuntime().availableProcessors());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/serp/crime-features")
    public ResponseEntity<Map<String, Object>> getCrimeFeatures(
            @RequestParam(defaultValue = "4") int threadCount) {
        long startTime = System.currentTimeMillis();
        List<CrimeFeatureResult> features = crimeService.analyzeFeatures(threadCount);
        long duration = System.currentTimeMillis() - startTime;

        Map<String, Object> response = new HashMap<>();
        response.put("task", "Distinctive Features of Crime-Reporting Papers/Systems");
        response.put("totalDistinctFeatures", features.size());
        response.put("totalAnalyzedSystems", datasetService.getCrimeReportingPapers().size());
        response.put("threadCount", threadCount);
        response.put("executionTimeMs", duration);
        response.put("features", features);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/serp/dl-subheadings")
    public ResponseEntity<Map<String, Object>> getDlSubheadings(
            @RequestParam(defaultValue = "4") int threadCount) {
        long startTime = System.currentTimeMillis();
        List<SubHeadingResult> subheadings = deepLearningService.analyzeSubheadings(threadCount);
        long duration = System.currentTimeMillis() - startTime;

        Map<String, Object> response = new HashMap<>();
        response.put("task", "Distinct Sub-Headings in Deep Learning Journal Papers");
        response.put("totalDistinctSubheadings", subheadings.size());
        response.put("totalAnalyzedPapers", datasetService.getDeepLearningPapers().size());
        response.put("threadCount", threadCount);
        response.put("executionTimeMs", duration);
        response.put("subheadings", subheadings);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/serp/benchmark")
    public ResponseEntity<Map<String, Object>> runBenchmark() {
        List<BenchmarkResult> benchmarks = benchmarkService.runThreadBenchmark();
        Map<String, Object> response = new HashMap<>();
        response.put("benchmarkTitle", "Multithreaded Parallel Speedup & Throughput Analysis");
        response.put("availableCPUProcessors", Runtime.getRuntime().availableProcessors());
        response.put("results", benchmarks);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/serp/summarize")
    public ResponseEntity<SummarizeResponse> summarizeContent(@RequestBody SummarizeRequest request) {
        SummarizeResponse response = benchmarkService.summarizeSerpContent(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/serp/papers")
    public ResponseEntity<List<SerpPaper>> getPapers(@RequestParam(defaultValue = "ALL") String domain) {
        if ("CRIME_REPORTING".equalsIgnoreCase(domain)) {
            return ResponseEntity.ok(datasetService.getCrimeReportingPapers());
        } else if ("DEEP_LEARNING".equalsIgnoreCase(domain)) {
            return ResponseEntity.ok(datasetService.getDeepLearningPapers());
        }
        return ResponseEntity.ok(datasetService.getAllPapers());
    }
}
