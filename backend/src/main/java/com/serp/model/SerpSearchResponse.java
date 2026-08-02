package com.serp.model;

import java.util.List;

public class SerpSearchResponse {
    private String query;
    private List<String> tokens;         // parsed query tokens
    private int totalResults;
    private long executionTimeMs;
    private String semanticSummary;      // synthesized paragraph summary
    private List<SearchResult> results;  // ranked results

    public SerpSearchResponse() {}

    public SerpSearchResponse(String query, List<String> tokens, int totalResults,
                              long executionTimeMs, String semanticSummary, List<SearchResult> results) {
        this.query = query;
        this.tokens = tokens;
        this.totalResults = totalResults;
        this.executionTimeMs = executionTimeMs;
        this.semanticSummary = semanticSummary;
        this.results = results;
    }

    public String getQuery() { return query; }
    public void setQuery(String q) { this.query = q; }

    public List<String> getTokens() { return tokens; }
    public void setTokens(List<String> tokens) { this.tokens = tokens; }

    public int getTotalResults() { return totalResults; }
    public void setTotalResults(int n) { this.totalResults = n; }

    public long getExecutionTimeMs() { return executionTimeMs; }
    public void setExecutionTimeMs(long ms) { this.executionTimeMs = ms; }

    public String getSemanticSummary() { return semanticSummary; }
    public void setSemanticSummary(String s) { this.semanticSummary = s; }

    public List<SearchResult> getResults() { return results; }
    public void setResults(List<SearchResult> results) { this.results = results; }
}
