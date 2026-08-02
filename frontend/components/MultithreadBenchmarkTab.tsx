'use client';

import React, { useState, useEffect } from 'react';
import { BenchmarkResult, SummarizeResponse } from '../lib/types';
import { fetchBenchmarkResults, fetchSerpSummary } from '../lib/api';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from 'recharts';
import { Activity, Zap, Search, Sparkles, Clock, Layers, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const MultithreadBenchmarkTab: React.FC = () => {
  const [benchmarks, setBenchmarks] = useState<BenchmarkResult[]>([]);
  const [loadingBenchmark, setLoadingBenchmark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('transformer hotspot mapping');
  const [domainFilter, setDomainFilter] = useState('ALL');
  const [summaryResponse, setSummaryResponse] = useState<SummarizeResponse | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(false);

  const runBenchmark = async () => {
    setLoadingBenchmark(true);
    const results = await fetchBenchmarkResults();
    setBenchmarks(results);
    setLoadingBenchmark(false);
  };

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoadingSummary(true);
    const res = await fetchSerpSummary(searchQuery, domainFilter);
    setSummaryResponse(res);
    setLoadingSummary(false);
  };

  useEffect(() => {
    runBenchmark();
    handleSearch();
  }, []);

  return (
    <div className="space-y-8">
      {/* Benchmark Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-amber-500/20">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold mb-1">
            <Zap className="w-4 h-4" />
            <span>Parallel Performance Metrics</span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            Multithreaded Benchmark &amp; Execution Analytics
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Java <code className="text-amber-300 font-mono">ExecutorService</code> thread pool evaluation measuring scaling speedup, throughput, and execution latency across worker allocations (1 to 16 threads).
          </p>
        </div>

        <button
          onClick={runBenchmark}
          disabled={loadingBenchmark}
          className="flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-amber-600/30 transition disabled:opacity-50"
        >
          <Activity className={`w-4 h-4 ${loadingBenchmark ? 'animate-spin' : ''}`} />
          <span>{loadingBenchmark ? 'Running Threads...' : 'Re-Run Benchmark'}</span>
        </button>
      </div>

      {/* Benchmark Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Speedup & Execution Time Line Chart */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-semibold text-white mb-2 flex items-center justify-between">
            <span>Parallel Speedup Factor</span>
            <span className="text-xs text-amber-400 font-mono">Speedup ($T_1 / T_N$)</span>
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={benchmarks} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="threadCount" stroke="#64748B" label={{ value: 'Threads', position: 'insideBottom', offset: -5 }} />
                <YAxis stroke="#94A3B8" />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px' }} />
                <Legend />
                <Line type="monotone" dataKey="speedup" name="Parallel Speedup (x)" stroke="#F59E0B" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Throughput Line Chart */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-semibold text-white mb-2 flex items-center justify-between">
            <span>Throughput (Papers / Sec)</span>
            <span className="text-xs text-emerald-400 font-mono">Execution Rate</span>
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={benchmarks} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="threadCount" stroke="#64748B" />
                <YAxis stroke="#94A3B8" />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px' }} />
                <Legend />
                <Line type="monotone" dataKey="throughputPapersPerSec" name="Throughput (papers/sec)" stroke="#10B981" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Semantic SERP Content Summarizer Component */}
      <div className="glass-panel p-6 rounded-2xl border border-indigo-500/30 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Semantic SERP Engine</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Semantic Search Query Summarizer
            </h3>
            <p className="text-xs text-slate-400">
              Summarizes key SERP content instead of merely returning raw links and titles.
            </p>
          </div>

          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <select
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg px-3 py-2 focus:outline-none"
            >
              <option value="ALL">All Domains</option>
              <option value="CRIME_REPORTING">Crime Systems</option>
              <option value="DEEP_LEARNING">Deep Learning</option>
            </select>

            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter query terms..."
                className="bg-slate-900 border border-slate-700 text-xs text-white rounded-lg pl-8 pr-3 py-2 w-64 focus:outline-none focus:border-indigo-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>

            <button
              type="submit"
              disabled={loadingSummary}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition"
            >
              {loadingSummary ? 'Parsing...' : 'Summarize'}
            </button>
          </form>
        </div>

        {/* Summary Output */}
        {summaryResponse && (
          <div className="space-y-4">
            <div className="bg-indigo-950/40 border border-indigo-500/30 p-5 rounded-xl">
              <div className="flex items-center justify-between text-xs text-indigo-300 font-mono mb-2">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Synthesized SERP Content Summary
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {summaryResponse.executionTimeMs} ms
                </span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed font-sans">
                {summaryResponse.summaryText}
              </p>
            </div>

            {/* Relevant Papers Grid */}
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Top Relevant Papers ({summaryResponse.matchedPapersCount} Matched)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {summaryResponse.topRelevantPapers.map((paper) => (
                  <div key={paper.id} className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        paper.domain === 'CRIME_REPORTING' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                      }`}>
                        {paper.domain}
                      </span>
                      <span className="text-xs font-mono text-slate-500">{paper.year}</span>
                    </div>

                    <h5 className="text-xs font-bold text-white leading-snug">{paper.title}</h5>
                    <p className="text-[11px] text-slate-400">{paper.authors} &bull; <em className="text-slate-300">{paper.journal}</em></p>
                    <p className="text-xs text-slate-300 line-clamp-2 bg-slate-950/60 p-2 rounded text-[11px]">
                      {paper.abstractText}
                    </p>

                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <span className="text-indigo-400 font-mono truncate max-w-[200px]">
                        {paper.featuresOrSubheadings[0]}
                      </span>
                      <a
                        href={paper.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-cyan-400 hover:underline flex items-center gap-0.5"
                      >
                        DOI/Link <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
