'use client';

import React from 'react';

type Tab = 'crime' | 'dl' | 'benchmark' | 'arch';

interface HeaderProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string }[] = [
  { id: 'crime', label: 'Crime Systems' },
  { id: 'dl', label: 'Deep Learning Papers' },
  { id: 'benchmark', label: 'Benchmark' },
  { id: 'arch', label: 'Architecture' },
];

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header style={{ borderBottom: '1px solid var(--border)' }} className="bg-[var(--surface)] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-indigo-500 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="1" y="1" width="4" height="4" rx="1" fill="white" />
              <rect x="7" y="1" width="4" height="4" rx="1" fill="white" opacity="0.6" />
              <rect x="1" y="7" width="4" height="4" rx="1" fill="white" opacity="0.6" />
              <rect x="7" y="7" width="4" height="4" rx="1" fill="white" opacity="0.3" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-white tracking-tight">SERP Engine</span>
          <span className="tag tag-accent">Assignment 1</span>
        </div>

        <nav className="flex items-center gap-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="btn btn-ghost"
              style={{
                color: activeTab === tab.id ? 'white' : 'var(--text-muted)',
                background: activeTab === tab.id ? 'var(--surface-2)' : 'transparent',
                borderColor: activeTab === tab.id ? 'var(--border)' : 'transparent',
                fontSize: '13px',
                padding: '6px 12px',
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};
