'use client';

import React from 'react';

export const ArchitectureDiagram: React.FC = () => (
  <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <span className="tag tag-accent">Architecture</span>
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>System topology</span>
      </div>
      <h2 style={{ fontSize: 20, fontWeight: 600, color: 'white', margin: 0 }}>Full-Stack Concurrency Architecture</h2>
      <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
        Spring Boot 3 multithreaded JVM on <strong style={{ color: 'var(--text)' }}>Render</strong> · Next.js 14 on <strong style={{ color: 'var(--text)' }}>Vercel</strong>
      </p>
    </div>

    {/* Flow diagram */}
    <div className="surface" style={{ padding: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr', alignItems: 'center', gap: 8 }}>
        {/* Client */}
        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 10, padding: 18 }}>
          <p style={{ fontSize: 10, color: '#a5b4fc', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Client Tier · Vercel</p>
          <p style={{ fontSize: 14, fontWeight: 600, color: 'white', marginBottom: 8 }}>Next.js 14</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {['React 18 + TypeScript', 'Tailwind CSS', 'Recharts Visualization', 'Live Keyword Search', 'Thread Slider Controls'].map(f => (
              <p key={f} style={{ fontSize: 11, color: 'var(--text-muted)' }}>· {f}</p>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }} className="mono">HTTP/REST</span>
          <svg width="48" height="16" viewBox="0 0 48 16" fill="none">
            <path d="M0 8h44m-8-6 8 6-8 6" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }} className="mono">JSON · CORS</span>
        </div>

        {/* Backend */}
        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 10, padding: 18 }}>
          <p style={{ fontSize: 10, color: '#c4b5fd', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Application Tier · Render</p>
          <p style={{ fontSize: 14, fontWeight: 600, color: 'white', marginBottom: 8 }}>Spring Boot 3.3.4</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {['Java 17 OpenJDK', 'ExecutorService Thread Pool', 'CompletableFuture Pipelines', 'REST API + CORS', 'Self-Ping Scheduler'].map(f => (
              <p key={f} style={{ fontSize: 11, color: 'var(--text-muted)' }}>· {f}</p>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }} className="mono">in-memory</span>
          <svg width="48" height="16" viewBox="0 0 48 16" fill="none">
            <path d="M0 8h44m-8-6 8 6-8 6" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }} className="mono">JVM heap</span>
        </div>

        {/* Data */}
        <div style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 10, padding: 18 }}>
          <p style={{ fontSize: 10, color: '#6ee7b7', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Data Tier · In-Memory</p>
          <p style={{ fontSize: 14, fontWeight: 600, color: 'white', marginBottom: 8 }}>Paper Dataset</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {['10 Crime-Reporting Systems', '8 Deep Learning Papers', 'ConcurrentHashMap Store', 'Feature Taxonomy (12)', 'Subheading Taxonomy (14)'].map(f => (
              <p key={f} style={{ fontSize: 11, color: 'var(--text-muted)' }}>· {f}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Endpoints */}
      <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border-subtle)' }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>REST Endpoints</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 8 }}>
          {[
            { method: 'GET', path: '/api/v1/health', desc: 'Health check' },
            { method: 'GET', path: '/api/v1/serp/crime-features', desc: 'Task 1 features' },
            { method: 'GET', path: '/api/v1/serp/dl-subheadings', desc: 'Task 2 sub-headings' },
            { method: 'GET', path: '/api/v1/serp/benchmark', desc: 'Thread benchmark' },
            { method: 'POST', path: '/api/v1/serp/summarize', desc: 'SERP summarizer' },
          ].map(ep => (
            <div key={ep.path} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '8px 10px', background: 'var(--surface)', borderRadius: 6, border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: ep.method === 'GET' ? '#6ee7b7' : '#fcd34d', flexShrink: 0, marginTop: 1 }} className="mono">{ep.method}</span>
              <div>
                <p style={{ fontSize: 11, color: 'white', fontFamily: 'JetBrains Mono, monospace', marginBottom: 2 }}>{ep.path}</p>
                <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>{ep.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Concurrency model */}
    <div className="surface" style={{ padding: 20 }}>
      <p style={{ fontSize: 13, fontWeight: 600, color: 'white', marginBottom: 12 }}>Concurrency Primitives</p>
      <div style={{ background: 'var(--surface-2)', borderRadius: 8, padding: 16, fontFamily: 'JetBrains Mono, monospace', fontSize: 12, lineHeight: 1.7, color: '#94a3b8', overflowX: 'auto' }}>
        <span style={{ color: '#6366f1' }}>ExecutorService</span> executor = Executors.<span style={{ color: '#10b981' }}>newFixedThreadPool</span>(threadCount);<br />
        <br />
        papers.stream()<br />
        {'  '}.<span style={{ color: '#10b981' }}>map</span>(paper {'→'} CompletableFuture.<span style={{ color: '#10b981' }}>runAsync</span>(() {'→'} {'{'}<br />
        {'    '}<span style={{ color: '#6b7280' }}>// Parse paper, extract features concurrently</span><br />
        {'    '}featureMap.<span style={{ color: '#10b981' }}>computeIfAbsent</span>(feature, k {'→'} <span style={{ color: '#6366f1' }}>synchronizedList</span>());<br />
        {'  '}{'}'}, executor))<br />
        {'  '}.<span style={{ color: '#10b981' }}>collect</span>(<span style={{ color: '#f59e0b' }}>Collectors</span>.toList());<br />
        <br />
        CompletableFuture.<span style={{ color: '#10b981' }}>allOf</span>(futures).<span style={{ color: '#10b981' }}>join</span>(); <span style={{ color: '#6b7280' }}>// barrier sync</span>
      </div>
    </div>
  </div>
);
