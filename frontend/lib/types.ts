export interface CrimeFeatureResult {
  rank: number;
  featureName: string;
  category: string;
  description: string;
  systemCount: number;
  percentageOfSystems: number;
  adoptingSystems: string[];
  technicalImpact: string;
}

export interface SubHeadingResult {
  rank: number;
  title: string;
  category: string;
  paperCount: number;
  occurrencePercentage: number;
  description: string;
  standardSectionHeader: string;
  samplePaperTitles: string[];
}

export interface BenchmarkResult {
  threadCount: number;
  executionTimeMs: number;
  speedup: number;
  throughputPapersPerSec: number;
}

export interface SerpPaper {
  id: string;
  title: string;
  authors: string;
  year: number;
  journal: string;
  domain: string;
  abstractText: string;
  featuresOrSubheadings: string[];
  url: string;
}

export interface SearchResult {
  paper: SerpPaper;
  relevanceScore: number;
  snippet: string;
}

export interface SerpSearchResponse {
  query: string;
  tokens: string[];
  totalResults: number;
  executionTimeMs: number;
  semanticSummary: string;
  results: SearchResult[];
}

// Legacy
export interface SummarizeResponse {
  query: string;
  summaryText: string;
  extractedKeywords: string[];
  matchedPapersCount: number;
  topRelevantPapers: SerpPaper[];
  executionTimeMs: number;
}
