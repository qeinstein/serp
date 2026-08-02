package com.serp.model;

public class SummarizeRequest {
    private String query;
    private String domain; // optional filter: "CRIME_REPORTING", "DEEP_LEARNING", or "ALL"

    public SummarizeRequest() {}

    public SummarizeRequest(String query, String domain) {
        this.query = query;
        this.domain = domain;
    }

    public String getQuery() { return query; }
    public void setQuery(String query) { this.query = query; }

    public String getDomain() { return domain; }
    public void setDomain(String domain) { this.domain = domain; }
}
