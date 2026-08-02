import {
  CrimeFeatureResult,
  SubHeadingResult,
  BenchmarkResult,
  SerpSearchResponse,
} from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

// ── Fallback datasets (used when backend is cold/offline) ────────────────────

const MOCK_SEARCH: SerpSearchResponse = {
  query: '',
  tokens: [],
  totalResults: 0,
  executionTimeMs: 0,
  semanticSummary: '',
  results: [],
};

const MOCK_CRIME_FEATURES: CrimeFeatureResult[] = [
  { rank: 1, featureName: 'GIS Spatial Mapping & Hotspot Visualization', category: 'Spatial Visualization & Mapping', description: 'Interactive crime map overlays, kernel density heatmap rendering, and GIS spatial layer integration.', systemCount: 9, percentageOfSystems: 90.0, adoptingSystems: ['CrimeStat IV', 'SafeCity', 'UrbanShield', 'SpatioTemporal-Mapper'], technicalImpact: 'Crucial for tactical patrol allocation and geographical risk assessment.' },
  { rank: 2, featureName: 'Real-Time Alert Dispatch', category: 'Alerting & Emergency Operations', description: 'Automated alert broadcasting and emergency unit dispatch upon incident report ingestion.', systemCount: 8, percentageOfSystems: 80.0, adoptingSystems: ['PredPol', 'SafeCity', 'UrbanShield', 'SentriNet'], technicalImpact: 'Drastically reduces emergency response latency from minutes to seconds.' },
  { rank: 3, featureName: 'Anonymous Tip Submission & Privacy Shield', category: 'Privacy & Reporter Protection', description: 'Zero-knowledge encrypted submission portals and metadata scrubbers.', systemCount: 7, percentageOfSystems: 70.0, adoptingSystems: ['SafeCity', 'ChainGuard', 'AnonTip'], technicalImpact: 'Encourages community reporting by eliminating fear of retaliation.' },
  { rank: 4, featureName: 'Predictive Hotspot & Temporal Analytics', category: 'Predictive Analytics & AI', description: 'Statistical modeling (Hawkes process) to anticipate future crime locations and times.', systemCount: 7, percentageOfSystems: 70.0, adoptingSystems: ['PredPol', 'SpatioTemporal Mapper'], technicalImpact: 'Enables proactive deterrence rather than reactive investigation.' },
  { rank: 5, featureName: 'Multi-Agency Interoperability Protocol', category: 'System Integration', description: 'NIEM-compliant data federation across municipal, state, and federal agencies.', systemCount: 6, percentageOfSystems: 60.0, adoptingSystems: ['SentriNet', 'ChainGuard', 'CopTrack'], technicalImpact: 'Breaks down agency data silos.' },
  { rank: 6, featureName: 'Mobile Field Incident Logging', category: 'Field Mobility', description: 'Mobile-first offline reporting with GPS auto-tagging and voice-to-text transcription.', systemCount: 6, percentageOfSystems: 60.0, adoptingSystems: ['UrbanShield', 'AnonTip'], technicalImpact: 'Empowers field officers to log incidents at crime scenes.' },
  { rank: 7, featureName: 'Evidence & Multimedia Attachment Vault', category: 'Forensics & Data Ingestion', description: 'Secure cloud storage for photos, video, audio, and forensic documents.', systemCount: 5, percentageOfSystems: 50.0, adoptingSystems: ['CrimeNLP', 'UrbanShield', 'ChainGuard'], technicalImpact: 'Centralizes digital evidence management.' },
  { rank: 8, featureName: 'Incident Categorization & Classification', category: 'Taxonomy & Machine Learning', description: 'Automated multi-label categorization based on legal statutes and offense codes.', systemCount: 5, percentageOfSystems: 50.0, adoptingSystems: ['CrimeNLP', 'SentriNet'], technicalImpact: 'Standardizes reporting taxonomies.' },
  { rank: 9, featureName: 'Audit Trail & Digital Chain-of-Custody', category: 'Security & Legal Compliance', description: 'Immutable audit logs and cryptographic evidence timestamps.', systemCount: 4, percentageOfSystems: 40.0, adoptingSystems: ['ChainGuard', 'UrbanShield'], technicalImpact: 'Ensures legal admissibility and prevents evidence tampering.' },
  { rank: 10, featureName: 'Automated NLP Victimology & Narrative Mining', category: 'NLP', description: 'Transformer-based NER extracting suspect descriptors from unstructured text.', systemCount: 4, percentageOfSystems: 40.0, adoptingSystems: ['CrimeNLP', 'CopTrack'], technicalImpact: 'Transforms raw narratives into structured data.' },
];

const MOCK_SUBHEADINGS: SubHeadingResult[] = [
  { rank: 1, title: 'Abstract', category: 'Executive Overview', paperCount: 8, occurrencePercentage: 100.0, description: 'Executive summary of problem, model, findings, and benchmarks.', standardSectionHeader: 'Mandatory Initial Section', samplePaperTitles: ['Attention Is All You Need', 'Deep Residual Learning (ResNet)', 'BERT'] },
  { rank: 2, title: 'Introduction & Motivation', category: 'Background & Context', paperCount: 8, occurrencePercentage: 100.0, description: 'Contextualization of the problem domain and key contributions.', standardSectionHeader: 'Section 1: Introduction', samplePaperTitles: ['GANs', 'Vision Transformers (ViT)', 'AlphaGo'] },
  { rank: 3, title: 'Experimental Setup & Benchmarking', category: 'Empirical Evaluation', paperCount: 7, occurrencePercentage: 87.5, description: 'Dataset splits, baselines, hardware, and evaluation metrics.', standardSectionHeader: 'Section 4: Experiments', samplePaperTitles: ['Attention Is All You Need', 'BERT', 'Adam Optimizer'] },
  { rank: 4, title: 'Transformer & Multi-Head Self-Attention Architecture', category: 'Model Architecture', paperCount: 6, occurrencePercentage: 75.0, description: 'Query/key/value dot-product attention and positional encodings.', standardSectionHeader: 'Section 3: Architecture', samplePaperTitles: ['Attention Is All You Need', 'BERT', 'ViT'] },
  { rank: 5, title: 'Loss Function Formulation & Optimization', category: 'Mathematical Formulation', paperCount: 6, occurrencePercentage: 75.0, description: 'Objective function definition and gradient optimization rules.', standardSectionHeader: 'Section 3.2: Objective', samplePaperTitles: ['GANs', 'Adam Optimizer', 'AlphaGo'] },
  { rank: 6, title: 'Ablation Study & Sensitivity Analysis', category: 'Empirical Evaluation', paperCount: 5, occurrencePercentage: 62.5, description: 'Controlled isolation experiments for individual components.', standardSectionHeader: 'Section 4.3: Ablation', samplePaperTitles: ['Attention Is All You Need', 'ResNet', 'ViT'] },
  { rank: 7, title: 'Hyperparameter Tuning & Grid Search', category: 'Optimization', paperCount: 5, occurrencePercentage: 62.5, description: 'Learning rate schedules, batch sizes, and dropout search spaces.', standardSectionHeader: 'Section 4.2: Hyperparameters', samplePaperTitles: ['BERT', 'Deep Compression', 'Adam'] },
  { rank: 8, title: 'Computational Complexity & FLOPs Analysis', category: 'Efficiency & Hardware', paperCount: 4, occurrencePercentage: 50.0, description: 'Theoretical FLOPs, parameter counts, and inference latency.', standardSectionHeader: 'Section 5.2: Efficiency', samplePaperTitles: ['Deep Compression', 'ViT', 'AlphaGo'] },
];

const MOCK_BENCHMARKS: BenchmarkResult[] = [
  { threadCount: 1,  executionTimeMs: 420, speedup: 1.0,  throughputPapersPerSec: 214.2  },
  { threadCount: 2,  executionTimeMs: 220, speedup: 1.91, throughputPapersPerSec: 409.0  },
  { threadCount: 4,  executionTimeMs: 115, speedup: 3.65, throughputPapersPerSec: 782.6  },
  { threadCount: 8,  executionTimeMs: 65,  speedup: 6.46, throughputPapersPerSec: 1384.6 },
  { threadCount: 16, executionTimeMs: 45,  speedup: 9.33, throughputPapersPerSec: 2000.0 },
];

// ── API calls ────────────────────────────────────────────────────────────────

export async function serpSearch(query: string, domain = 'ALL', threadCount = 4): Promise<SerpSearchResponse> {
  try {
    const params = new URLSearchParams({ q: query, domain, threadCount: String(threadCount) });
    const res = await fetch(`${API_BASE}/api/v1/serp/search?${params}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Backend offline – returning empty result', err);
    return { ...MOCK_SEARCH, query };
  }
}

export async function fetchCrimeFeatures(threadCount = 4): Promise<CrimeFeatureResult[]> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/serp/crime-features?threadCount=${threadCount}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    return data.features;
  } catch {
    return MOCK_CRIME_FEATURES;
  }
}

export async function fetchDlSubheadings(threadCount = 4): Promise<SubHeadingResult[]> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/serp/dl-subheadings?threadCount=${threadCount}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    return data.subheadings;
  } catch {
    return MOCK_SUBHEADINGS;
  }
}

export async function fetchBenchmarkResults(): Promise<BenchmarkResult[]> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/serp/benchmark`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`${res.status}`);
    const data = await res.json();
    return data.results;
  } catch {
    return MOCK_BENCHMARKS;
  }
}
