'use client';

import React, { useState, useEffect } from 'react';
import { BenchmarkResult, SerpSearchResponse } from '../lib/types';
import { fetchBenchmarkResults, serpSearch } from '../lib/api';

import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="surface" style={{ padding: '10px 14px' }}>
      <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>{label} threads</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ fontSize: 13, fontWeight: 600, color: p.stroke }}>{p.name}: {p.value}</p>
      ))}
    </div>
  );
};

export const MultithreadBenchmarkTab: React.FC = () => {
  const [benchmarks, setBenchmarks] = useState<BenchmarkResult[]>([]);
  const [loadingBench, setLoadingBench] = useState(false);
  const [query, setQuery] = useState('');
  const [domain, setDomain] = useState('ALL');
  const [summary, setSummary] = useState<SerpSearchResponse | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [activeMetric, setActiveMetric] = useState<'speedup' | 'throughput' | 'time'>('speedup');

  const runBenchmark = async () => {
    setLoadingBench(true);
    const r = await fetchBenchmarkResults();
    setBenchmarks(r);
    setLoadingBench(false);
  };

  const handleSummarize = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;
    setLoadingSummary(true);
    const r = await serpSearch(query, domain);
    setSummary(r as any);
    setLoadingSummary(false);
  };

  useEffect(() => { runBenchmark(); }, []);

  const chartDataKey = activeMetric === 'speedup' ? 'speedup'
    : activeMetric === 'throughput' ? 'throughputPapersPerSec'
    : 'executionTimeMs';

  const metricLabel = activeMetric === 'speedup' ? 'Speedup (×)'
    : activeMetric === 'throughput' ? 'Papers / sec'
    : 'Execution time (ms)';

  const metricColor = activeMetric === 'speedup' ? '#f59e0b'
    : activeMetric === 'throughput' ? '#10b981'
    : '#6366f1';

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* ── Benchmark Section ── */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span className="tag tag-amber">Benchmark</span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Concurrency performance</span>
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: 'white', margin: 0 }}>Multithreaded Execution Benchmark</h2>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
          Java <span className="mono" style={{ color: '#a5b4fc', fontSize: 12 }}>ExecutorService</span> thread pool scaling — 1 to 16 workers.
        </p>
      </div>

      <div className="surface" style={{ padding: 20 }}>
        {/* Top controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, gap: 10, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 4, background: 'var(--surface-2)', borderRadius: 8, padding: 3, border: '1px solid var(--border-subtle)' }}>
            {(['speedup', 'throughput', 'time'] as const).map(m => (
              <button key={m} onClick={() => setActiveMetric(m)} style={{
                padding: '4px 12px', fontSize: 12, fontWeight: 500, borderRadius: 6, border: 'none',
                background: activeMetric === m ? 'var(--surface)' : 'transparent',
                color: activeMetric === m ? 'white' : 'var(--text-muted)', cursor: 'pointer', transition: 'all 0.15s', whiteSpace: 'nowrap',
              }}>
                {m === 'speedup' ? 'Speedup' : m === 'throughput' ? 'Throughput' : 'Exec. Time'}
              </button>
            ))}
          </div>

          <button className="btn btn-ghost" onClick={runBenchmark} disabled={loadingBench} style={{ fontSize: 12 }}>
            {loadingBench ? <svg className="spin" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> : null}
            {loadingBench ? 'Running…' : 'Re-run'}
          </button>
        </div>

        {/* Chart */}
        <div style={{ height: 240 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={benchmarks} margin={{ top: 4, right: 12, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="4 4" stroke="var(--border-subtle)" />
              <XAxis dataKey="threadCount" stroke="var(--border)" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} label={{ value: 'Threads', position: 'insideBottomRight', offset: -4, style: { fontSize: 11, fill: 'var(--text-muted)' } }} />
              <YAxis stroke="var(--border)" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--border)', strokeWidth: 1 }} />
              <Line type="monotone" dataKey={chartDataKey} name={metricLabel} stroke={metricColor} strokeWidth={2} dot={{ r: 4, fill: metricColor, strokeWidth: 0 }} activeDot={{ r: 6, strokeWidth: 0 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Benchmark stats row */}
        {benchmarks.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${benchmarks.length}, 1fr)`, gap: 8, marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border-subtle)' }}>
            {benchmarks.map(b => (
              <div key={b.threadCount} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 3 }}>{b.threadCount}T</p>
                <p style={{ fontSize: 14, fontWeight: 700, color: 'white', lineHeight: 1 }}>{b.speedup}×</p>
                <p style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{b.executionTimeMs}ms</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── SERP Summarizer ── */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span className="tag tag-accent">Semantic SERP</span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Query-to-summary engine</span>
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: 'white', margin: 0 }}>Search & Summarize</h2>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
          Enter any keyword — get a semantic synthesis of matching SERP content instead of raw links.
        </p>
      </div>

      <div className="surface" style={{ padding: 20 }}>
        <form onSubmit={handleSummarize} style={{ display: 'flex', gap: 8, marginBottom: summary ? 20 : 0 }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <svg style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input
              className="input"
              style={{ paddingLeft: 34 }}
              placeholder="e.g. spatial hotspot mapping, transformer attention, GIS encryption…"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>

          <select
            className="input"
            style={{ width: 'auto', flexShrink: 0 }}
            value={domain}
            onChange={e => setDomain(e.target.value)}
          >
            <option value="ALL">All domains</option>
            <option value="CRIME_REPORTING">Crime systems</option>
            <option value="DEEP_LEARNING">Deep learning</option>
          </select>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ flexShrink: 0 }}
            disabled={loadingSummary || !query.trim()}
          >
            {loadingSummary ? <svg className="spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> : null}
            {loadingSummary ? 'Parsing…' : 'Summarize'}
          </button>
        </form>

        {summary && (
          <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="divider" />

            {/* Query tokens + timing */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {summary.tokens.map((kw, i) => (
                  <span key={i} className="tag tag-accent">{kw}</span>
                ))}
              </div>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', flexShrink: 0 }} className="mono">{summary.executionTimeMs}ms</span>
            </div>

            {/* Summary text */}
            <div style={{ padding: '14px 16px', background: 'var(--surface-2)', borderRadius: 8, borderLeft: '2px solid #6366f1' }}>
              <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, margin: 0 }}>{summary.semanticSummary}</p>
            </div>

            {/* Matched papers */}
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
                {summary.totalResults} Matched Papers
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
                {summary.results.map(r => { const paper = r.paper; return (
                  <div key={paper.id} style={{ background: 'var(--surface-2)', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span className={paper.domain === 'CRIME_REPORTING' ? 'tag tag-green' : 'tag tag-cyan'} style={{ fontSize: 10 }}>
                        {paper.domain === 'CRIME_REPORTING' ? 'Crime' : 'Deep Learning'}
                      </span>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>{paper.year}</span>
                    </div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'white', lineHeight: 1.35, marginBottom: 4 }}>{paper.title}</p>
                    <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8 }}>{paper.authors}</p>
                    <p style={{ fontSize: 11, color: 'var(--text)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {paper.abstractText}
                    </p>
                    <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: 10, color: '#a5b4fc', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 180 }}>
                        {paper.featuresOrSubheadings[0]}
                      </span>
                      <a href={paper.url} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: '#06b6d4', textDecoration: 'none', flexShrink: 0, marginLeft: 8 }}>
                        DOI ↗
                      </a>
                    </div>
                  </div>
                ); })}

              </div>
            </div>
          </div>
        )}

        {!summary && (
          <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)', fontSize: 13 }}>
            Enter a query above to semantically synthesize SERP content
          </div>
        )}
      </div>
    </div>
  );
};
