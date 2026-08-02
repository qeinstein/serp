import {
  CrimeFeatureResult,
  SubHeadingResult,
  BenchmarkResult,
  SerpPaper,
  SummarizeResponse
} from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

// Fallback Mock Data for standalone frontend review or offline preview
const MOCK_CRIME_FEATURES: CrimeFeatureResult[] = [
  {
    rank: 1,
    featureName: "GIS Spatial Mapping & Hotspot Visualization",
    category: "Spatial Visualization & Mapping",
    description: "Interactive crime map overlays, kernel density heatmap rendering, and GIS spatial layer integration for geographical law enforcement analysis.",
    systemCount: 9,
    percentageOfSystems: 90.0,
    adoptingSystems: [
      "CrimeStat IV Spatial Analysis",
      "SafeCity Anonymous Web Portal",
      "UrbanShield Smart City Mobile App",
      "SpatioTemporal Crime Density Engine"
    ],
    technicalImpact: "Crucial for tactical patrol allocation and geographical risk assessment."
  },
  {
    rank: 2,
    featureName: "Real-Time Alert Dispatch",
    category: "Alerting & Emergency Operations",
    description: "Automated alert broadcasting, push notifications, and emergency unit dispatch upon incident report ingestion.",
    systemCount: 8,
    percentageOfSystems: 80.0,
    adoptingSystems: [
      "PredPol Real-time Algorithm",
      "SafeCity Emergency Dispatch",
      "UrbanShield Officer Mobile App",
      "SentriNet Law Enforcement Exchange"
    ],
    technicalImpact: "Drastically reduces emergency response latency from minutes to seconds."
  },
  {
    rank: 3,
    featureName: "Anonymous Tip Submission & Privacy Shield",
    category: "Privacy & Reporter Protection",
    description: "Zero-knowledge encrypted submission portals, proxy routing, and metadata scrubbers to protect whistleblower and witness identities.",
    systemCount: 7,
    percentageOfSystems: 70.0,
    adoptingSystems: [
      "SafeCity Web Portal",
      "ChainGuard Blockchain System",
      "AnonTip Zero-Knowledge Platform"
    ],
    technicalImpact: "Encourages community reporting by eliminating fear of retaliation."
  },
  {
    rank: 4,
    featureName: "Predictive Hotspot & Temporal Analytics",
    category: "Predictive Analytics & AI",
    description: "Statistical modeling (Hawkes process, time-series forecasting) to anticipate high-probability future crime locations and times.",
    systemCount: 7,
    percentageOfSystems: 70.0,
    adoptingSystems: [
      "PredPol Algorithm",
      "SpatioTemporal Mapper Engine"
    ],
    technicalImpact: "Enables proactive deterrence rather than reactive investigation."
  },
  {
    rank: 5,
    featureName: "Multi-Agency Interoperability Protocol",
    category: "System Integration & Interoperability",
    description: "Standardized API exchange protocols (e.g., NIEM, GraphQL) enabling seamless data federation across municipal, state, and federal law enforcement agencies.",
    systemCount: 6,
    percentageOfSystems: 60.0,
    adoptingSystems: [
      "SentriNet Multi-Agency Framework",
      "ChainGuard Blockchain Forensic Network",
      "CopTrack Serial Crime Linkage Engine"
    ],
    technicalImpact: "Breaks down agency data silos for unified regional intelligence."
  },
  {
    rank: 6,
    featureName: "Mobile Field Incident Logging",
    category: "Field Mobility & Remote Logging",
    description: "Mobile-first offline reporting UI with GPS auto-tagging, voice-to-text transcription, and immediate sync upon network restoration.",
    systemCount: 6,
    percentageOfSystems: 60.0,
    adoptingSystems: [
      "UrbanShield Mobile App",
      "AnonTip Field Gateway"
    ],
    technicalImpact: "Empowers field officers to log incidents directly at crime scenes."
  },
  {
    rank: 7,
    featureName: "Evidence & Multimedia Attachment Vault",
    category: "Forensics & Data Ingestion",
    description: "Secure cloud storage for high-resolution crime scene photos, bodycam video streams, audio recordings, and forensic documents.",
    systemCount: 5,
    percentageOfSystems: 50.0,
    adoptingSystems: [
      "CrimeNLP Incident Vault",
      "UrbanShield Media Vault",
      "ChainGuard Immutable Evidence Storage"
    ],
    technicalImpact: "Centralizes digital evidence management with cryptographic hashing."
  },
  {
    rank: 8,
    featureName: "Incident Categorization & Classification",
    category: "Taxonomy & Machine Learning",
    description: "Automated multi-label categorization (e.g., burglary, assault, cybercrime, narcotics) based on legal statutes and offense codes.",
    systemCount: 5,
    percentageOfSystems: 50.0,
    adoptingSystems: [
      "CrimeNLP Automated Classifier",
      "SentriNet Incident Taxonomy"
    ],
    technicalImpact: "Standardizes reporting taxonomies across disparate jurisdiction codes."
  },
  {
    rank: 9,
    featureName: "Audit Trail & Digital Chain-of-Custody",
    category: "Security & Legal Compliance",
    description: "Immutable audit logs and cryptographic evidence timestamps tracking every edit, access, and transfer of crime records.",
    systemCount: 4,
    percentageOfSystems: 40.0,
    adoptingSystems: [
      "ChainGuard Forensic Ledger",
      "UrbanShield Secure Audit Subsystem"
    ],
    technicalImpact: "Ensures legal admissibility and prevents evidence tampering in court."
  },
  {
    rank: 10,
    featureName: "Automated NLP Victimology & Narrative Mining",
    category: "Natural Language Processing",
    description: "Transformer-based named entity recognition (NER) extracting suspect descriptors, victim demographics, and incident chronologies from unstructured text.",
    systemCount: 4,
    percentageOfSystems: 40.0,
    adoptingSystems: [
      "CrimeNLP Narrative Miner",
      "CopTrack Narrative Matcher"
    ],
    technicalImpact: "Transforms raw officer narratives into structured relational data."
  }
];

const MOCK_SUBHEADINGS: SubHeadingResult[] = [
  {
    rank: 1,
    title: "Abstract",
    category: "Executive Overview",
    paperCount: 8,
    occurrencePercentage: 100.0,
    description: "Executive summary of research problem, proposed deep learning model architecture, key findings, and empirical benchmarks.",
    standardSectionHeader: "Mandatory Initial Section",
    samplePaperTitles: [
      "Attention Is All You Need (Transformers)",
      "Deep Residual Learning (ResNet)",
      "BERT: Bidirectional Transformers",
      "Mastering the Game of Go (AlphaGo)",
      "Deep Compression (Quantization)"
    ]
  },
  {
    rank: 2,
    title: "Introduction & Motivation",
    category: "Background & Context",
    paperCount: 8,
    occurrencePercentage: 100.0,
    description: "Contextualization of problem domain, computational limitations of prior models, and list of key technical contributions.",
    standardSectionHeader: "Section 1: Introduction",
    samplePaperTitles: [
      "Attention Is All You Need",
      "Deep Residual Learning (ResNet)",
      "Vision Transformers (ViT)",
      "Generative Adversarial Nets (GANs)"
    ]
  },
  {
    rank: 3,
    title: "Experimental Setup & Benchmarking",
    category: "Empirical Evaluation",
    paperCount: 7,
    occurrencePercentage: 87.5,
    description: "Comprehensive breakdown of dataset splits, baseline models, training hardware specifications, and evaluation metrics.",
    standardSectionHeader: "Section 4: Experiments",
    samplePaperTitles: [
      "Attention Is All You Need",
      "BERT Pre-training",
      "AlphaGo Deep Neural Networks",
      "Adam Optimizer Benchmark"
    ]
  },
  {
    rank: 4,
    title: "Transformer & Multi-Head Self-Attention Architecture",
    category: "Model Architecture Specification",
    paperCount: 6,
    occurrencePercentage: 75.0,
    description: "Detailed mathematical breakdown of query/key/value dot-product attention mechanisms, positional encodings, and feed-forward layers.",
    standardSectionHeader: "Section 3: Model Architecture",
    samplePaperTitles: [
      "Attention Is All You Need",
      "BERT Pre-training",
      "Vision Transformers (ViT)"
    ]
  },
  {
    rank: 5,
    title: "Loss Function Formulation & Optimization",
    category: "Mathematical Formulation",
    paperCount: 6,
    occurrencePercentage: 75.0,
    description: "Explicit mathematical definition of objective function (e.g., cross-entropy, focal loss, contrastive loss) and gradient optimization rules.",
    standardSectionHeader: "Section 3.2: Objective Formulation",
    samplePaperTitles: [
      "Generative Adversarial Nets (GANs)",
      "Adam Optimization Algorithm",
      "AlphaGo Policy Gradient"
    ]
  },
  {
    rank: 6,
    title: "Ablation Study & Sensitivity Analysis",
    category: "Empirical Evaluation",
    paperCount: 5,
    occurrencePercentage: 62.5,
    description: "Controlled isolation experiments evaluating the specific contribution of individual model components and hyperparameters.",
    standardSectionHeader: "Section 4.3: Ablation Study",
    samplePaperTitles: [
      "Attention Is All You Need",
      "Deep Residual Learning (ResNet)",
      "Vision Transformers (ViT)"
    ]
  },
  {
    rank: 7,
    title: "Hyperparameter Tuning & Grid Search",
    category: "Optimization & Hyperparameters",
    paperCount: 5,
    occurrencePercentage: 62.5,
    description: "Empirical search spaces for learning rate schedules, batch sizes, weight decay coefficients, and dropout probabilities.",
    standardSectionHeader: "Section 4.2: Hyperparameter Setup",
    samplePaperTitles: [
      "BERT Pre-training",
      "Deep Compression",
      "Adam Optimizer"
    ]
  },
  {
    rank: 8,
    title: "Computational Complexity & FLOPs Analysis",
    category: "Efficiency & Hardware Metrics",
    paperCount: 4,
    occurrencePercentage: 50.0,
    description: "Theoretical and empirical evaluation of floating-point operations (FLOPs), parameter counts, memory footprints, and inference latency.",
    standardSectionHeader: "Section 5.2: Efficiency Benchmark",
    samplePaperTitles: [
      "Deep Compression (Quantization)",
      "Vision Transformers (ViT)",
      "AlphaGo Computational Bounds"
    ]
  }
];

const MOCK_BENCHMARKS: BenchmarkResult[] = [
  { threadCount: 1, executionTimeMs: 420, speedup: 1.0, throughputPapersPerSec: 214.2 },
  { threadCount: 2, executionTimeMs: 220, speedup: 1.91, throughputPapersPerSec: 409.0 },
  { threadCount: 4, executionTimeMs: 115, speedup: 3.65, throughputPapersPerSec: 782.6 },
  { threadCount: 8, executionTimeMs: 65, speedup: 6.46, throughputPapersPerSec: 1384.6 },
  { threadCount: 16, executionTimeMs: 45, speedup: 9.33, throughputPapersPerSec: 2000.0 }
];

export async function fetchCrimeFeatures(threadCount: number = 4): Promise<CrimeFeatureResult[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/serp/crime-features?threadCount=${threadCount}`, {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('API request failed');
    const data = await res.json();
    return data.features;
  } catch (err) {
    console.warn('Backend API unavailable. Using fallback dataset.', err);
    return MOCK_CRIME_FEATURES;
  }
}

export async function fetchDlSubheadings(threadCount: number = 4): Promise<SubHeadingResult[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/serp/dl-subheadings?threadCount=${threadCount}`, {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('API request failed');
    const data = await res.json();
    return data.subheadings;
  } catch (err) {
    console.warn('Backend API unavailable. Using fallback dataset.', err);
    return MOCK_SUBHEADINGS;
  }
}

export async function fetchBenchmarkResults(): Promise<BenchmarkResult[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/serp/benchmark`, {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('API request failed');
    const data = await res.json();
    return data.results;
  } catch (err) {
    console.warn('Backend API unavailable. Using fallback dataset.', err);
    return MOCK_BENCHMARKS;
  }
}

export async function fetchSerpSummary(query: string, domain: string = 'ALL'): Promise<SummarizeResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/serp/summarize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, domain }),
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('API request failed');
    return await res.json();
  } catch (err) {
    console.warn('Backend API unavailable. Generating client-side synthesis.', err);
    return {
      query,
      summaryText: `Synthesis of Search Engine Results Pages (SERP) for '${query}': Multi-threaded analysis reveals strong emphasis on spatial hotspot analytics, zero-knowledge tip encryption, and self-attention model architectures across academic paper datasets.`,
      extractedKeywords: [query, 'Multithreaded', 'SERP', 'Feature Extraction'],
      matchedPapersCount: 5,
      topRelevantPapers: [
        {
          id: 'CR-01',
          title: 'CrimeStat IV: Spatial Statistics Program for Crime Incident Locations',
          authors: 'Ned Levine et al.',
          year: 2015,
          journal: 'National Institute of Justice',
          domain: 'CRIME_REPORTING',
          abstractText: 'Presents spatial point pattern analysis, kernel density hotspot estimation, and nearest neighbor hierarchical clustering for regional law enforcement analytics.',
          featuresOrSubheadings: ['GIS Spatial Mapping & Hotspot Visualization', 'Spatial-Temporal Density Estimation'],
          url: 'https://doi.org/10.1037/e527012012-001'
        },
        {
          id: 'DL-01',
          title: 'Attention Is All You Need: Modern Transformer Architectures',
          authors: 'Ashish Vaswani et al.',
          year: 2017,
          journal: 'NeurIPS',
          domain: 'DEEP_LEARNING',
          abstractText: 'Introduces the Transformer architecture relying entirely on multi-head self-attention mechanisms without recurrent or convolutional neural layers.',
          featuresOrSubheadings: ['Transformer & Multi-Head Self-Attention Architecture', 'Loss Function Formulation & Optimization'],
          url: 'https://arxiv.org/abs/1706.03762'
        }
      ],
      executionTimeMs: 18
    };
  }
}
