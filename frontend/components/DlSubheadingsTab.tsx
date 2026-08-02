'use client';

import React, { useState, useEffect } from 'react';
import { SubHeadingResult } from '../lib/types';
import { fetchDlSubheadings } from '../lib/api';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

const COLORS = ['#06b6d4', '#6366f1', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899', '#3b82f6', '#14b8a6'];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="surface" style={{ padding: '10px 14px', minWidth: 160 }}>
      <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>{payload[0]?.payload?.fullName}</p>
      <p style={{ fontSize: 14, fontWeight: 600, color: 'white' }}>{payload[0]?.value} papers</p>
    </div>
  );
};

export const DlSubheadingsTab: React.FC = () => {
  const [items, setItems] = useState<SubHeadingResult[]>([]);
  const [filtered, setFiltered] = useState<SubHeadingResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [threadCount, setThreadCount] = useState(4);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<SubHeadingResult | null>(null);
  const [view, setView] = useState<'table' | 'chart'>('table');

  const load = async (threads: number) => {
    setLoading(true);
    const data = await fetchDlSubheadings(threads);
    setItems(data);
    setFiltered(data);
    if (data.length > 0) setSelected(data[0]);
    setLoading(false);
  };

  useEffect(() => { load(threadCount); }, []);

  useEffect(() => {
    const q = search.trim().toLowerCase();
    if (!q) { setFiltered(items); return; }
    setFiltered(items.filter(sh =>
      sh.title.toLowerCase().includes(q) ||
      sh.category.toLowerCase().includes(q) ||
      sh.description.toLowerCase().includes(q) ||
      sh.standardSectionHeader.toLowerCase().includes(q) ||
      sh.samplePaperTitles.some(p => p.toLowerCase().includes(q))
    ));
  }, [search, items]);

  const chartData = filtered.map(sh => ({
    name: sh.title.length > 28 ? sh.title.slice(0, 26) + '…' : sh.title,
    fullName: sh.title,
    papers: sh.paperCount,
  }));

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Page header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span className="tag tag-cyan">Task 2</span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Deep Learning Journal Papers</span>
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: 'white', margin: 0 }}>Distinct Sub-Headings in Deep Learning Papers</h2>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
          Structural section taxonomy extracted concurrently across DL model publications.
        </p>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '1 1 260px' }}>
          <svg style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input
            className="input"
            style={{ paddingLeft: 34 }}
            placeholder="Search sub-headings, sections, or paper titles…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <span style={{ fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>Threads</span>
          <input type="range" min={1} max={16} value={threadCount}
            onChange={e => setThreadCount(+e.target.value)}
            style={{ width: 80, accentColor: '#06b6d4', cursor: 'pointer' }} />
          <span className="mono" style={{ fontSize: 12, color: 'white', width: 16 }}>{threadCount}</span>
        </div>

        <button className="btn btn-primary" style={{ flexShrink: 0, background: '#0e7490' }} onClick={() => load(threadCount)} disabled={loading}>
          {loading ? (
            <svg className="spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/></svg>
          )}
          Run
        </button>

        <div style={{ display: 'flex', gap: 4, background: 'var(--surface-2)', borderRadius: 8, padding: 3, border: '1px solid var(--border-subtle)' }}>
          {(['table', 'chart'] as const).map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              padding: '4px 10px', fontSize: 12, fontWeight: 500, borderRadius: 6, border: 'none',
              background: view === v ? 'var(--surface)' : 'transparent',
              color: view === v ? 'white' : 'var(--text-muted)', cursor: 'pointer', transition: 'all 0.15s',
            }}>{v === 'table' ? 'Table' : 'Chart'}</button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {[
          { label: 'Sub-headings Found', value: filtered.length, sub: `of ${items.length} distinct sections` },
          { label: 'Papers Analyzed', value: 8, sub: 'Deep learning publications' },
          { label: 'Thread Workers', value: threadCount, sub: loading ? 'Running…' : 'Completed' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>{s.label}</p>
            <p style={{ fontSize: 22, fontWeight: 700, color: 'white', lineHeight: 1 }}>{s.value}</p>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Content */}
      {view === 'table' ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16 }}>
          <div className="surface" style={{ overflow: 'hidden' }}>
            {filtered.length === 0 ? (
              <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
                No sub-headings match <em>"{search}"</em>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Sub-Heading Title</th>
                      <th>Category</th>
                      <th>Section</th>
                      <th style={{ textAlign: 'right' }}>Papers</th>
                      <th style={{ textAlign: 'right' }}>Freq.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(sh => (
                      <tr key={sh.rank} className={selected?.rank === sh.rank ? 'active' : ''} style={{ cursor: 'pointer' }} onClick={() => setSelected(sh)}>
                        <td><span className="rank-badge">{sh.rank}</span></td>
                        <td style={{ fontWeight: 500, color: 'white' }}>{sh.title}</td>
                        <td><span style={{ fontSize: 11, color: 'var(--text-muted)', background: 'var(--surface-2)', padding: '2px 7px', borderRadius: 4, border: '1px solid var(--border-subtle)', whiteSpace: 'nowrap' }}>{sh.category}</span></td>
                        <td style={{ fontSize: 11, color: '#67e8f9', fontFamily: 'JetBrains Mono, monospace' }}>{sh.standardSectionHeader}</td>
                        <td style={{ textAlign: 'right', fontWeight: 600, color: 'white', fontFamily: 'JetBrains Mono, monospace' }}>{sh.paperCount}</td>
                        <td style={{ textAlign: 'right', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}>{sh.occurrencePercentage}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Detail */}
          <div className="surface" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {selected ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="rank-badge">#{selected.rank}</span>
                  <span className="tag tag-cyan">{selected.occurrencePercentage}% of papers</span>
                </div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 600, color: 'white', lineHeight: 1.4 }}>{selected.title}</p>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{selected.category}</p>
                </div>
                <div className="divider" />
                <div>
                  <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Standard Header</p>
                  <p style={{ fontSize: 12, color: '#67e8f9', fontFamily: 'JetBrains Mono, monospace', padding: '6px 10px', background: 'var(--surface-2)', borderRadius: 5 }}>{selected.standardSectionHeader}</p>
                </div>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Description</p>
                  <p style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.6 }}>{selected.description}</p>
                </div>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Papers Using This Section</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxHeight: 160, overflowY: 'auto' }}>
                    {selected.samplePaperTitles.map((p, i) => (
                      <div key={i} style={{ fontSize: 12, color: 'var(--text)', padding: '5px 8px', background: 'var(--surface-2)', borderRadius: 5, border: '1px solid var(--border-subtle)' }}>{p}</div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: 13, padding: 32 }}>Select a sub-heading to inspect</div>
            )}
          </div>
        </div>
      ) : (
        <div className="surface" style={{ padding: 24 }}>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>Sub-heading frequency across deep learning journal papers</p>
          <div style={{ height: 360 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 0, right: 16, left: 8, bottom: 32 }}>
                <XAxis dataKey="name" stroke="var(--border)" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} angle={-30} textAnchor="end" interval={0} />
                <YAxis stroke="var(--border)" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                <Bar dataKey="papers" radius={[4, 4, 0, 0]}>
                  {chartData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};
