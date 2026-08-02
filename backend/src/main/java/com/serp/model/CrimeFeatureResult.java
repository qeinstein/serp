package com.serp.model;

import java.util.List;

public class CrimeFeatureResult {
    private int rank;
    private String featureName;
    private String category;
    private String description;
    private int systemCount;
    private double percentageOfSystems;
    private List<String> adoptingSystems;
    private String technicalImpact;

    public CrimeFeatureResult() {}

    public CrimeFeatureResult(int rank, String featureName, String category, String description,
                              int systemCount, double percentageOfSystems,
                              List<String> adoptingSystems, String technicalImpact) {
        this.rank = rank;
        this.featureName = featureName;
        this.category = category;
        this.description = description;
        this.systemCount = systemCount;
        this.percentageOfSystems = percentageOfSystems;
        this.adoptingSystems = adoptingSystems;
        this.technicalImpact = technicalImpact;
    }

    public int getRank() { return rank; }
    public void setRank(int rank) { this.rank = rank; }

    public String getFeatureName() { return featureName; }
    public void setFeatureName(String featureName) { this.featureName = featureName; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public int getSystemCount() { return systemCount; }
    public void setSystemCount(int systemCount) { this.systemCount = systemCount; }

    public double getPercentageOfSystems() { return percentageOfSystems; }
    public void setPercentageOfSystems(double percentageOfSystems) { this.percentageOfSystems = percentageOfSystems; }

    public List<String> getAdoptingSystems() { return adoptingSystems; }
    public void setAdoptingSystems(List<String> adoptingSystems) { this.adoptingSystems = adoptingSystems; }

    public String getTechnicalImpact() { return technicalImpact; }
    public void setTechnicalImpact(String technicalImpact) { this.technicalImpact = technicalImpact; }
}
