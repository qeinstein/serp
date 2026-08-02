'use client';

import React from 'react';

type Tab = 'search' | 'crime' | 'dl' | 'benchmark' | 'arch';

interface HeaderProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string }[] = [
  { id: 'search',    label: 'Search' },
  { id: 'crime',     label: 'Crime Features' },
  { id: 'dl',        label: 'DL Sub-Headings' },
  { id: 'benchmark', label: 'Benchmark' },
  { id: 'arch',      label: 'Architecture' },
];

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }} className="sticky top-0 z-50">
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'white', letterSpacing: '-0.01em' }}>SERP Engine</span>
        </div>

        {/* Nav */}
        <nav style={{ display: 'flex', gap: 2 }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '5px 12px',
                fontSize: 13,
                fontWeight: 500,
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                background: activeTab === tab.id ? 'var(--surface-2)' : 'transparent',
                color: activeTab === tab.id ? 'white' : 'var(--text-muted)',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { if (activeTab !== tab.id) e.currentTarget.style.color = 'var(--text)'; }}
              onMouseLeave={e => { if (activeTab !== tab.id) e.currentTarget.style.color = 'var(--text-muted)'; }}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};
