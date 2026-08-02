'use client';

import React from 'react';

export const Footer: React.FC = () => (
  <footer style={{ borderTop: '1px solid var(--border-subtle)' }} className="py-5">
    <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
      <span className="text-xs text-[var(--text-muted)] mono">serp-engine v1.0</span>
      <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
        <span>Backend: Render / Spring Boot 3</span>
        <span style={{ color: 'var(--border)' }}>·</span>
        <span>Frontend: Vercel / Next.js 14</span>
      </div>
    </div>
  </footer>
);
