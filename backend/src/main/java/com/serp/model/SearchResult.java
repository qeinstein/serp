package com.serp.model;

public class SearchResult {
    private SerpPaper paper;
    private double relevanceScore;
    private String snippet;     // highlighted excerpt relevant to the query

    public SearchResult() {}

    public SearchResult(SerpPaper paper, double relevanceScore, String snippet) {
        this.paper = paper;
        this.relevanceScore = relevanceScore;
        this.snippet = snippet;
    }

    public SerpPaper getPaper() { return paper; }
    public void setPaper(SerpPaper paper) { this.paper = paper; }

    public double getRelevanceScore() { return relevanceScore; }
    public void setRelevanceScore(double relevanceScore) { this.relevanceScore = relevanceScore; }

    public String getSnippet() { return snippet; }
    public void setSnippet(String snippet) { this.snippet = snippet; }
}
