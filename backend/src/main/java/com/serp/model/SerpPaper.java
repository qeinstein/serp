package com.serp.model;

import java.util.List;

public class SerpPaper {
    private String id;
    private String title;
    private String authors;
    private int year;
    private String journal;
    private String domain; // "CRIME_REPORTING" or "DEEP_LEARNING"
    private String abstractText;
    private List<String> featuresOrSubheadings;
    private String url;

    public SerpPaper() {}

    public SerpPaper(String id, String title, String authors, int year, String journal,
                     String domain, String abstractText, List<String> featuresOrSubheadings, String url) {
        this.id = id;
        this.title = title;
        this.authors = authors;
        this.year = year;
        this.journal = journal;
        this.domain = domain;
        this.abstractText = abstractText;
        this.featuresOrSubheadings = featuresOrSubheadings;
        this.url = url;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAuthors() { return authors; }
    public void setAuthors(String authors) { this.authors = authors; }

    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }

    public String getJournal() { return journal; }
    public void setJournal(String journal) { this.journal = journal; }

    public String getDomain() { return domain; }
    public void setDomain(String domain) { this.domain = domain; }

    public String getAbstractText() { return abstractText; }
    public void setAbstractText(String abstractText) { this.abstractText = abstractText; }

    public List<String> getFeaturesOrSubheadings() { return featuresOrSubheadings; }
    public void setFeaturesOrSubheadings(List<String> featuresOrSubheadings) { this.featuresOrSubheadings = featuresOrSubheadings; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }
}
