package com.serp.service;

import com.serp.model.SerpPaper;
import com.serp.model.SubHeadingResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.*;
import java.util.stream.Collectors;

@Service
public class DeepLearningAnalysisService {

    @Autowired
    private PaperDatasetService datasetService;

    // Sub-heading definitions with structural metadata
    private static final Map<String, String[]> SUBHEADING_METADATA = new LinkedHashMap<>();

    static {
        SUBHEADING_METADATA.put("Abstract", new String[]{
            "Executive Overview",
            "Executive summary of research problem, proposed deep learning model architecture, key findings, and empirical benchmarks.",
            "Mandatory Initial Section"
        });
        SUBHEADING_METADATA.put("Introduction & Motivation", new String[]{
            "Background & Context",
            "Contextualization of problem domain, computational limitations of prior models, and list of key technical contributions.",
            "Section 1: Introduction"
        });
        SUBHEADING_METADATA.put("Transformer & Multi-Head Self-Attention Architecture", new String[]{
            "Model Architecture Specification",
            "Detailed mathematical breakdown of query/key/value dot-product attention mechanisms, positional encodings, and feed-forward layers.",
            "Section 3: Model Architecture"
        });
        SUBHEADING_METADATA.put("Convolutional Neural Network Architecture", new String[]{
            "Model Architecture Specification",
            "Specification of spatial filter kernel dimensions, stride, pooling layers, feature maps, and receptive field expansion.",
            "Section 3: Model Architecture"
        });
        SUBHEADING_METADATA.put("Loss Function Formulation & Optimization", new String[]{
            "Mathematical Formulation",
            "Explicit mathematical definition of objective function (e.g., cross-entropy, focal loss, contrastive loss) and gradient optimization rules.",
            "Section 3.2: Objective Formulation"
        });
        SUBHEADING_METADATA.put("Gradient Vanishing & Optimization Dynamics", new String[]{
            "Mathematical Formulation",
            "Theoretical analysis of gradient flow through deep layer compositions, residual skip connections, and weight initialization strategies.",
            "Section 3.3: Optimization Analysis"
        });
        SUBHEADING_METADATA.put("Experimental Setup & Benchmarking", new String[]{
            "Empirical Evaluation",
            "Comprehensive breakdown of dataset splits, baseline models, training hardware specifications, and evaluation metrics (Accuracy, F1, BLEU, mAP).",
            "Section 4: Experiments"
        });
        SUBHEADING_METADATA.put("Ablation Study & Sensitivity Analysis", new String[]{
            "Empirical Evaluation",
            "Controlled isolation experiments evaluating the specific contribution of individual model components and hyperparameters.",
            "Section 4.3: Ablation Study"
        });
        SUBHEADING_METADATA.put("Data Augmentation & Preprocessing Strategies", new String[]{
            "Data Pipeline",
            "Description of input normalization, stochastic transformations, synthetic data generation, and tokenization pipelines.",
            "Section 4.1: Data Preparation"
        });
        SUBHEADING_METADATA.put("Hyperparameter Tuning & Grid Search", new String[]{
            "Optimization & Hyperparameters",
            "Empirical search spaces for learning rate schedules, batch sizes, weight decay coefficients, and dropout probabilities.",
            "Section 4.2: Hyperparameter Setup"
        });
        SUBHEADING_METADATA.put("Transfer Learning & Fine-Tuning Protocols", new String[]{
            "Adaptation & Transfer",
            "Protocols for adapting pre-trained foundation models to downstream task domains via linear probing or parameter-efficient fine-tuning (LoRA).",
            "Section 5: Task Adaptation"
        });
        SUBHEADING_METADATA.put("Computational Complexity & FLOPs Analysis", new String[]{
            "Efficiency & Hardware Metrics",
            "Theoretical and empirical evaluation of floating-point operations (FLOPs), parameter counts, memory footprints, and inference latency.",
            "Section 5.2: Efficiency Benchmark"
        });
        SUBHEADING_METADATA.put("Model Quantization & Edge Deployment", new String[]{
            "Efficiency & Hardware Metrics",
            "Techniques for FP32 to INT8/INT4 weight quantization, network pruning, and deployment onto resource-constrained edge hardware.",
            "Section 5.3: Deployment Engineering"
        });
        SUBHEADING_METADATA.put("Conclusion & Future Work", new String[]{
            "Summary & Directions",
            "Summary of empirical achievements, discussion of remaining model failure modes, and open research directions.",
            "Section 6: Conclusion"
        });
    }

    public List<SubHeadingResult> analyzeSubheadings(int threadCount) {
        List<SerpPaper> papers = datasetService.getDeepLearningPapers();
        int totalPapers = papers.size();

        ConcurrentHashMap<String, List<String>> subheadingOccurrenceMap = new ConcurrentHashMap<>();

        ExecutorService executor = Executors.newFixedThreadPool(Math.max(1, threadCount));

        try {
            List<CompletableFuture<Void>> futures = papers.stream()
                .map(paper -> CompletableFuture.runAsync(() -> {
                    simulateProcessingDelay();

                    List<String> subheadings = paper.getFeaturesOrSubheadings();
                    for (String subheading : subheadings) {
                        subheadingOccurrenceMap.computeIfAbsent(subheading, k -> Collections.synchronizedList(new ArrayList<>()))
                            .add(paper.getTitle());
                    }
                }, executor))
                .collect(Collectors.toList());

            CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();
        } finally {
            executor.shutdown();
        }

        List<SubHeadingResult> results = new ArrayList<>();

        SUBHEADING_METADATA.forEach((title, meta) -> {
            List<String> samplePapers = subheadingOccurrenceMap.getOrDefault(title, Collections.emptyList());
            int count = samplePapers.size();
            double pct = Math.round((count * 100.0 / totalPapers) * 10.0) / 10.0;

            results.add(new SubHeadingResult(
                0,
                title,
                meta[0], // category
                count,
                pct,
                meta[1], // description
                meta[2], // standardSectionHeader
                new ArrayList<>(samplePapers)
            ));
        });

        // Sort by occurrence frequency descending
        results.sort((a, b) -> Integer.compare(b.getPaperCount(), a.getPaperCount()));

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
