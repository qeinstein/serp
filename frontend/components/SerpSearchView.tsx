'use client';

import React, { useState, useRef, useCallback } from 'react';
import { SerpSearchResponse, SearchResult } from '../lib/types';
import { serpSearch } from '../lib/api';

// ── helpers ──────────────────────────────────────────────────────────────────

const domainLabel = (d: string) =>
  d === 'CRIME_REPORTING' ? 'Crime Systems' : 'Deep Learning';

const domainColor = (d: string) =>
  d === 'CRIME_REPORTING'
    ? { bg: 'rgba(16,185,129,0.08)', text: '#6ee7b7', border: 'rgba(16,185,129,0.2)' }
    : { bg: 'rgba(6,182,212,0.08)',  text: '#67e8f9', border: 'rgba(6,182,212,0.2)'  };

const scoreBar = (score: number, max: number) => {
  const pct = max > 0 ? Math.round((score / max) * 100) : 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div style={{ width: 60, height: 3, background: 'var(--border-subtle)', borderRadius: 2 }}>
        <div style={{ width: `${pct}%`, height: '100%', background: '#6366f1', borderRadius: 2 }} />
      </div>
      <span style={{ fontSize: 10, color: 'var(--text-muted)' }} className="mono">{score.toFixed(1)}</span>
    </div>
  );
};

// ── Search result card ────────────────────────────────────────────────────────

const ResultCard: React.FC<{ result: SearchResult; maxScore: number; tokens: string[] }> = ({ result, maxScore, tokens }) => {
  const { paper, snippet } = result;
  const dc = domainColor(paper.domain);

  // Bold the matching tokens in the snippet
  const highlightSnippet = (text: string) => {
    if (!tokens.length) return <span>{text}</span>;
    const pattern = new RegExp(`(${tokens.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
    const parts = text.split(pattern);
    return (
      <>
        {parts.map((part, i) =>
          pattern.test(part)
            ? <mark key={i} style={{ background: 'rgba(99,102,241,0.2)', color: '#c7d2fe', borderRadius: 2, padding: '0 1px' }}>{part}</mark>
            : <span key={i}>{part}</span>
        )}
      </>
    );
  };

  return (
    <div style={{
      padding: '18px 20px',
      borderBottom: '1px solid var(--border-subtle)',
      transition: 'background 0.12s',
    }}
    onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-2)')}
    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
    >
      {/* URL line */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <div style={{ width: 16, height: 16, borderRadius: 3, background: dc.bg, border: `1px solid ${dc.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <div style={{ width: 7, height: 7, borderRadius: 1, background: dc.text }} />
        </div>
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{paper.journal} · {paper.year}</span>
        <span style={{ fontSize: 10, color: dc.text, background: dc.bg, border: `1px solid ${dc.border}`, padding: '1px 6px', borderRadius: 99 }}>
          {domainLabel(paper.domain)}
        </span>
      </div>

      {/* Title */}
      <a
        href={paper.url}
        target="_blank"
        rel="noreferrer"
        style={{ display: 'block', fontSize: 16, fontWeight: 600, color: '#a5b4fc', textDecoration: 'none', marginBottom: 5, lineHeight: 1.3 }}
        onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
        onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
      >
        {paper.title}
      </a>

      {/* Authors */}
      <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 7 }}>{paper.authors}</p>

      {/* Snippet */}
      <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.65, marginBottom: 10 }}>
        {highlightSnippet(snippet)}
      </p>

      {/* Feature tags + relevance bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          {paper.featuresOrSubheadings.slice(0, 3).map((f, i) => (
            <span key={i} style={{ fontSize: 10, color: 'var(--text-muted)', background: 'var(--surface-2)', border: '1px solid var(--border-subtle)', padding: '2px 7px', borderRadius: 4 }}>
              {f}
            </span>
          ))}
          {paper.featuresOrSubheadings.length > 3 && (
            <span style={{ fontSize: 10, color: 'var(--text-dim)', padding: '2px 7px' }}>
              +{paper.featuresOrSubheadings.length - 3}
            </span>
          )}
        </div>
        {scoreBar(result.relevanceScore, maxScore)}
      </div>
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────

const SUGGESTED = [
  'spatial hotspot mapping',
  'GIS crime analysis',
  'transformer attention',
  'gradient descent optimization',
  'anonymous tip encryption',
  'BERT fine-tuning',
  'predictive policing',
  'convolutional neural network',
  'chain of custody',
  'deep residual learning',
];

export const SerpSearchView: React.FC = () => {
  const [query, setQuery]           = useState('');
  const [domain, setDomain]         = useState('ALL');
  const [threads, setThreads]       = useState(4);
  const [loading, setLoading]       = useState(false);
  const [response, setResponse]     = useState<SerpSearchResponse | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const doSearch = useCallback(async (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    setLoading(true);
    setHasSearched(true);
    const r = await serpSearch(trimmed, domain, threads);
    setResponse(r);
    setLoading(false);
  }, [domain, threads]);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); doSearch(query); };
  const handleSuggest = (s: string) => { setQuery(s); doSearch(s); };

  const maxScore = response?.results.length
    ? Math.max(...response.results.map(r => r.relevanceScore))
    : 1;

  return (
    <div style={{ maxWidth: 740, margin: '0 auto' }}>
      {/* ── Landing / pre-search state ── */}
      {!hasSearched && (
        <div style={{ textAlign: 'center', padding: '64px 0 48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', marginBottom: 20 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: 'white', marginBottom: 8, letterSpacing: '-0.02em' }}>SERP Engine</h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 40 }}>
            Search academic papers. Get ranked results, relevance scores, and a semantic summary — not just links.
          </p>
        </div>
      )}

      {/* ── Search bar ── */}
      <form onSubmit={handleSubmit} style={{ marginBottom: hasSearched ? 24 : 32 }}>
        <div style={{
          display: 'flex', gap: 0,
          border: `1px solid ${loading ? '#6366f1' : 'var(--border)'}`,
          borderRadius: 10,
          overflow: 'hidden',
          background: 'var(--surface)',
          transition: 'border-color 0.15s',
          boxShadow: loading ? '0 0 0 3px rgba(99,102,241,0.12)' : 'none',
        }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <svg style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: loading ? '#6366f1' : 'var(--text-dim)', transition: 'color 0.15s' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input
              ref={inputRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search anything — GIS, transformer, hotspot, BERT, evidence…"
              style={{
                width: '100%', padding: '13px 14px 13px 42px',
                background: 'transparent', border: 'none', outline: 'none',
                color: 'white', fontSize: 14, fontFamily: 'Inter, sans-serif',
              }}
              autoFocus
            />
          </div>

          {/* Domain filter */}
          <select
            value={domain}
            onChange={e => setDomain(e.target.value)}
            style={{
              background: 'var(--surface-2)', border: 'none', borderLeft: '1px solid var(--border)',
              color: 'var(--text-muted)', fontSize: 12, padding: '0 12px', outline: 'none', cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <option value="ALL">All papers</option>
            <option value="CRIME_REPORTING">Crime systems</option>
            <option value="DEEP_LEARNING">Deep learning</option>
          </select>

          <button
            type="submit"
            disabled={loading || !query.trim()}
            style={{
              padding: '0 20px', background: '#6366f1', border: 'none',
              color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              fontFamily: 'Inter, sans-serif', transition: 'background 0.15s',
              opacity: !query.trim() ? 0.5 : 1,
            }}
            onMouseEnter={e => { if (query.trim() && !loading) e.currentTarget.style.background = '#4f46e5'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#6366f1'; }}
          >
            {loading ? (
              <svg className="spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            ) : 'Search'}
          </button>
        </div>

        {/* Thread count row — subtle, below search bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, paddingLeft: 4 }}>
          <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>Worker threads:</span>
          <input type="range" min={1} max={16} value={threads} onChange={e => setThreads(+e.target.value)}
            style={{ width: 80, accentColor: '#6366f1', cursor: 'pointer' }} />
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }} className="mono">{threads}</span>
        </div>
      </form>

      {/* ── Suggestions (pre-search) ── */}
      {!hasSearched && (
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Try searching</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {SUGGESTED.map(s => (
              <button
                key={s}
                onClick={() => handleSuggest(s)}
                style={{
                  padding: '6px 14px', fontSize: 12, background: 'var(--surface)',
                  border: '1px solid var(--border)', borderRadius: 99, color: 'var(--text-muted)',
                  cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#6366f1'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Results ── */}
      {hasSearched && response && (
        <div className="fade-in">
          {/* Result meta bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, padding: '0 4px' }}>
            <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              {loading ? 'Searching…' : (
                <>
                  <span style={{ color: 'white', fontWeight: 500 }}>{response.totalResults}</span> result{response.totalResults !== 1 ? 's' : ''} for &ldquo;{response.query}&rdquo;
                  &nbsp;·&nbsp;<span className="mono">{response.executionTimeMs}ms</span>
                  &nbsp;·&nbsp;{threads} thread{threads !== 1 ? 's' : ''}
                </>
              )}
            </p>
            {response.tokens.length > 0 && (
              <div style={{ display: 'flex', gap: 4 }}>
                {response.tokens.slice(0, 4).map((t, i) => (
                  <span key={i} style={{ fontSize: 10, color: '#a5b4fc', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', padding: '2px 7px', borderRadius: 99 }}>{t}</span>
                ))}
              </div>
            )}
          </div>

          {/* Semantic summary */}
          {response.semanticSummary && response.totalResults > 0 && (
            <div style={{
              padding: '14px 18px', marginBottom: 16,
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderLeft: '2px solid #6366f1', borderRadius: '0 8px 8px 0',
            }}>
              <p style={{ fontSize: 11, color: '#a5b4fc', fontWeight: 600, marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Summary</p>
              <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.65 }}>{response.semanticSummary}</p>
            </div>
          )}

          {/* Result list */}
          {response.totalResults === 0 ? (
            <div style={{ padding: '48px 0', textAlign: 'center' }}>
              <p style={{ fontSize: 14, color: 'white', marginBottom: 6 }}>No results found</p>
              <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                Try broader terms like &ldquo;spatial&rdquo;, &ldquo;transformer&rdquo;, or &ldquo;deep learning&rdquo;.
              </p>
            </div>
          ) : (
            <div className="surface" style={{ overflow: 'hidden' }}>
              {response.results.map((r, i) => (
                <ResultCard key={r.paper.id} result={r} maxScore={maxScore} tokens={response.tokens} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
