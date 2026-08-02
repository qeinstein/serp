package com.serp.model;

import java.util.List;

public class SummarizeResponse {
    private String query;
    private String summaryText;
    private List<String> extractedKeywords;
    private int matchedPapersCount;
    private List<SerpPaper> topRelevantPapers;
    private long executionTimeMs;

    public SummarizeResponse() {}

    public SummarizeResponse(String query, String summaryText, List<String> extractedKeywords,
                             int matchedPapersCount, List<SerpPaper> topRelevantPapers, long executionTimeMs) {
        this.query = query;
        this.summaryText = summaryText;
        this.extractedKeywords = extractedKeywords;
        this.matchedPapersCount = matchedPapersCount;
        this.topRelevantPapers = topRelevantPapers;
        this.executionTimeMs = executionTimeMs;
    }

    public String getQuery() { return query; }
    public void setQuery(String query) { this.query = query; }

    public String getSummaryText() { return summaryText; }
    public void setSummaryText(String summaryText) { this.summaryText = summaryText; }

    public List<String> getExtractedKeywords() { return extractedKeywords; }
    public void setExtractedKeywords(List<String> extractedKeywords) { this.extractedKeywords = extractedKeywords; }

    public int getMatchedPapersCount() { return matchedPapersCount; }
    public void setMatchedPapersCount(int matchedPapersCount) { this.matchedPapersCount = matchedPapersCount; }

    public List<SerpPaper> getTopRelevantPapers() { return topRelevantPapers; }
    public void setTopRelevantPapers(List<SerpPaper> topRelevantPapers) { this.topRelevantPapers = topRelevantPapers; }

    public long getExecutionTimeMs() { return executionTimeMs; }
    public void setExecutionTimeMs(long executionTimeMs) { this.executionTimeMs = executionTimeMs; }
}
