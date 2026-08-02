'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CrimeFeatureResult } from '../lib/types';
import { fetchCrimeFeatures } from '../lib/api';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

const COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#3b82f6', '#14b8a6', '#f97316', '#a855f7', '#64748b', '#0ea5e9'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="surface" style={{ padding: '10px 14px', minWidth: 160 }}>
      <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>{payload[0]?.payload?.fullName || label}</p>
      <p style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>{payload[0]?.value} systems</p>
    </div>
  );
};

export const CrimeFeaturesTab: React.FC = () => {
  const [features, setFeatures] = useState<CrimeFeatureResult[]>([]);
  const [filtered, setFiltered] = useState<CrimeFeatureResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [threadCount, setThreadCount] = useState(4);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<CrimeFeatureResult | null>(null);
  const [view, setView] = useState<'table' | 'chart'>('table');
  const inputRef = useRef<HTMLInputElement>(null);

  const load = async (threads: number) => {
    setLoading(true);
    const data = await fetchCrimeFeatures(threads);
    setFeatures(data);
    setFiltered(data);
    if (data.length > 0) setSelected(data[0]);
    setLoading(false);
  };

  useEffect(() => { load(threadCount); }, []);

  useEffect(() => {
    const q = search.trim().toLowerCase();
    if (!q) { setFiltered(features); return; }
    setFiltered(features.filter(f =>
      f.featureName.toLowerCase().includes(q) ||
      f.category.toLowerCase().includes(q) ||
      f.description.toLowerCase().includes(q) ||
      f.adoptingSystems.some(s => s.toLowerCase().includes(q))
    ));
  }, [search, features]);

  const chartData = filtered.map(f => ({
    name: f.featureName.length > 28 ? f.featureName.slice(0, 26) + '…' : f.featureName,
    fullName: f.featureName,
    systems: f.systemCount,
  }));

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Page header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span className="tag tag-green">Task 1</span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Crime-Reporting Papers</span>
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: 'white', margin: 0 }}>Distinctive Features of Crime-Reporting Systems</h2>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
          Ranked by number of systems that implement each feature — descending.
        </p>
      </div>

      {/* Controls bar */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: '1 1 260px' }}>
          <svg style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input
            ref={inputRef}
            className="input"
            style={{ paddingLeft: 34 }}
            placeholder="Search features, categories, or systems…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Thread count */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <span style={{ fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>Threads</span>
          <input
            type="range" min={1} max={16} value={threadCount}
            onChange={e => setThreadCount(+e.target.value)}
            style={{ width: 80, accentColor: '#6366f1', cursor: 'pointer' }}
          />
          <span className="mono" style={{ fontSize: 12, color: 'white', width: 16 }}>{threadCount}</span>
        </div>

        <button
          className="btn btn-primary"
          style={{ flexShrink: 0 }}
          onClick={() => load(threadCount)}
          disabled={loading}
        >
          {loading ? (
            <svg className="spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/></svg>
          )}
          Run
        </button>

        {/* View toggle */}
        <div style={{ display: 'flex', gap: 4, background: 'var(--surface-2)', borderRadius: 8, padding: 3, border: '1px solid var(--border-subtle)' }}>
          {(['table', 'chart'] as const).map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                padding: '4px 10px', fontSize: 12, fontWeight: 500, borderRadius: 6, border: 'none',
                background: view === v ? 'var(--surface)' : 'transparent',
                color: view === v ? 'white' : 'var(--text-muted)',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              {v === 'table' ? 'Table' : 'Chart'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {[
          { label: 'Features Found', value: filtered.length, sub: `of ${features.length} total` },
          { label: 'Papers Analyzed', value: 10, sub: 'Crime-reporting systems' },
          { label: 'Thread Workers', value: threadCount, sub: `${loading ? 'Running…' : 'Completed'}` },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>{s.label}</p>
            <p style={{ fontSize: 22, fontWeight: 700, color: 'white', lineHeight: 1 }}>{s.value}</p>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Main content */}
      {view === 'table' ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16 }}>
          {/* Table */}
          <div className="surface" style={{ overflow: 'hidden' }}>
            {filtered.length === 0 ? (
              <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
                No features match <em>"{search}"</em>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Feature</th>
                      <th>Category</th>
                      <th style={{ textAlign: 'right' }}>Systems</th>
                      <th style={{ textAlign: 'right' }}>Coverage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(f => (
                      <tr
                        key={f.rank}
                        className={selected?.rank === f.rank ? 'active' : ''}
                        style={{ cursor: 'pointer' }}
                        onClick={() => setSelected(f)}
                      >
                        <td><span className="rank-badge">{f.rank}</span></td>
                        <td style={{ fontWeight: 500, color: 'white' }}>{f.featureName}</td>
                        <td>
                          <span style={{ fontSize: 11, color: 'var(--text-muted)', background: 'var(--surface-2)', padding: '2px 7px', borderRadius: 4, border: '1px solid var(--border-subtle)' }}>
                            {f.category}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right', fontWeight: 600, color: 'white', fontFamily: 'JetBrains Mono, monospace' }}>{f.systemCount}</td>
                        <td style={{ textAlign: 'right', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>{f.percentageOfSystems}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Detail panel */}
          <div className="surface" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {selected ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="rank-badge">#{selected.rank}</span>
                  <span className="tag tag-green">{selected.percentageOfSystems}% adoption</span>
                </div>

                <div>
                  <p style={{ fontSize: 15, fontWeight: 600, color: 'white', lineHeight: 1.4 }}>{selected.featureName}</p>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{selected.category}</p>
                </div>

                <div className="divider" />

                <div>
                  <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Description</p>
                  <p style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.6 }}>{selected.description}</p>
                </div>

                <div>
                  <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Impact</p>
                  <p style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.6, padding: '8px 12px', background: 'var(--surface-2)', borderRadius: 6, borderLeft: '2px solid #10b981' }}>{selected.technicalImpact}</p>
                </div>

                <div>
                  <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                    Adopting Systems ({selected.adoptingSystems.length})
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxHeight: 160, overflowY: 'auto' }}>
                    {selected.adoptingSystems.map((s, i) => (
                      <div key={i} style={{ fontSize: 12, color: 'var(--text)', padding: '5px 8px', background: 'var(--surface-2)', borderRadius: 5, border: '1px solid var(--border-subtle)' }}>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 13, padding: 32 }}>
                Select a feature to see details
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="surface" style={{ padding: 24 }}>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>Feature frequency — number of systems implementing each feature</p>
          <div style={{ height: 380 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 16, left: 8, bottom: 0 }}>
                <XAxis type="number" stroke="var(--border)" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
                <YAxis dataKey="name" type="category" stroke="var(--border)" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} width={190} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Bar dataKey="systems" radius={[0, 4, 4, 0]}>
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};
