package com.serp.model;

import java.util.List;

public class SubHeadingResult {
    private int rank;
    private String title;
    private String category;
    private int paperCount;
    private double occurrencePercentage;
    private String description;
    private String standardSectionHeader;
    private List<String> samplePaperTitles;

    public SubHeadingResult() {}

    public SubHeadingResult(int rank, String title, String category, int paperCount,
                            double occurrencePercentage, String description,
                            String standardSectionHeader, List<String> samplePaperTitles) {
        this.rank = rank;
        this.title = title;
        this.category = category;
        this.paperCount = paperCount;
        this.occurrencePercentage = occurrencePercentage;
        this.description = description;
        this.standardSectionHeader = standardSectionHeader;
        this.samplePaperTitles = samplePaperTitles;
    }

    public int getRank() { return rank; }
    public void setRank(int rank) { this.rank = rank; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public int getPaperCount() { return paperCount; }
    public void setPaperCount(int paperCount) { this.paperCount = paperCount; }

    public double getOccurrencePercentage() { return occurrencePercentage; }
    public void setOccurrencePercentage(double occurrencePercentage) { this.occurrencePercentage = occurrencePercentage; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getStandardSectionHeader() { return standardSectionHeader; }
    public void setStandardSectionHeader(String standardSectionHeader) { this.standardSectionHeader = standardSectionHeader; }

    public List<String> getSamplePaperTitles() { return samplePaperTitles; }
    public void setSamplePaperTitles(List<String> samplePaperTitles) { this.samplePaperTitles = samplePaperTitles; }
}
