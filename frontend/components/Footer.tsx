'use client';

import React from 'react';
import { Terminal, Server, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-6 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-indigo-400" />
          <span>SERP Multithreaded Engine &bull; Spring Boot 3 &amp; Next.js 14</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5">
            <Server className="w-3.5 h-3.5 text-emerald-400" />
            <span>Backend: Render (Java 17)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>Frontend: Vercel (Edge App Router)</span>
          </div>
        </div>

        <div className="text-slate-500">
          Assignment 1 Implementation &copy; {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
};
