package com.serp.model;

public class BenchmarkResult {
    private int threadCount;
    private long executionTimeMs;
    private double speedup;
    private double throughputPapersPerSec;

    public BenchmarkResult() {}

    public BenchmarkResult(int threadCount, long executionTimeMs, double speedup, double throughputPapersPerSec) {
        this.threadCount = threadCount;
        this.executionTimeMs = executionTimeMs;
        this.speedup = speedup;
        this.throughputPapersPerSec = throughputPapersPerSec;
    }

    public int getThreadCount() { return threadCount; }
    public void setThreadCount(int threadCount) { this.threadCount = threadCount; }

    public long getExecutionTimeMs() { return executionTimeMs; }
    public void setExecutionTimeMs(long executionTimeMs) { this.executionTimeMs = executionTimeMs; }

    public double getSpeedup() { return speedup; }
    public void setSpeedup(double speedup) { this.speedup = speedup; }

    public double getThroughputPapersPerSec() { return throughputPapersPerSec; }
    public void setThroughputPapersPerSec(double throughputPapersPerSec) { this.throughputPapersPerSec = throughputPapersPerSec; }
}
