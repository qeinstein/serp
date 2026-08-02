'use client';

import React from 'react';
import { Layers, Server, Globe, Cpu, Database, ArrowRight, ShieldCheck } from 'lucide-react';

export const ArchitectureDiagram: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-purple-500/20">
        <div className="flex items-center gap-2 text-purple-400 text-sm font-semibold mb-1">
          <Layers className="w-4 h-4" />
          <span>System Topology</span>
        </div>
        <h2 className="text-2xl font-bold text-white">
          Full-Stack Concurrency Architecture
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Visual overview of the distributed web app deployment: Spring Boot 3 multi-threaded JVM backend deployed on <strong className="text-purple-300">Render</strong> and Next.js 14 frontend hosted on <strong className="text-purple-300">Vercel</strong>.
        </p>
      </div>

      {/* Schematic Container */}
      <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Client Tier */}
          <div className="bg-slate-900/90 border border-indigo-500/40 p-6 rounded-xl space-y-3 relative">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <Globe className="w-5 h-5" />
              <span>1. CLIENT TIER (Vercel)</span>
            </div>
            <p className="text-xs text-slate-300">
              Next.js 14 App Router (React 18, TypeScript, Tailwind CSS, Recharts)
            </p>
            <ul className="text-xs text-slate-400 space-y-1 font-mono">
              <li>&bull; Interactive Visualizations</li>
              <li>&bull; Worker Thread Sliders</li>
              <li>&bull; SERP Summarizer UI</li>
              <li>&bull; Dynamic API Hydration</li>
            </ul>
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 hidden md:block">
              <ArrowRight className="w-6 h-6 text-indigo-500" />
            </div>
          </div>

          {/* Application Tier */}
          <div className="bg-slate-900/90 border border-purple-500/40 p-6 rounded-xl space-y-3 relative">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
              <Server className="w-5 h-5" />
              <span>2. BACKEND TIER (Render)</span>
            </div>
            <p className="text-xs text-slate-300">
              Spring Boot 3.3.4 (Java 17 OpenJDK, Dockerized Container)
            </p>
            <ul className="text-xs text-slate-400 space-y-1 font-mono">
              <li>&bull; REST Endpoints (CORS enabled)</li>
              <li>&bull; ExecutorService Workers</li>
              <li>&bull; CompletableFuture Pipelines</li>
              <li>&bull; PingScheduler (Keep-Alive)</li>
            </ul>
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 hidden md:block">
              <ArrowRight className="w-6 h-6 text-purple-500" />
            </div>
          </div>

          {/* Core Engine & Data Tier */}
          <div className="bg-slate-900/90 border border-cyan-500/40 p-6 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <Cpu className="w-5 h-5" />
              <span>3. CONCURRENCY &amp; DATA TIER</span>
            </div>
            <p className="text-xs text-slate-300">
              In-Memory Thread Pool Engine &amp; Academic Datasets
            </p>
            <ul className="text-xs text-slate-400 space-y-1 font-mono">
              <li>&bull; Task 1: Crime-Reporting (12 Features)</li>
              <li>&bull; Task 2: DL Subheadings (12 Sections)</li>
              <li>&bull; Parallel Speedup Benchmarking</li>
              <li>&bull; Zero Race Condition Guarantee</li>
            </ul>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <div className="text-xs text-indigo-400 font-mono font-bold mb-1">Deployment Engine</div>
            <div className="text-sm font-semibold text-white">Docker &amp; Vercel</div>
            <div className="text-xs text-slate-400 mt-1">Multi-stage Docker build for Render + Vercel static/dynamic web host.</div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <div className="text-xs text-emerald-400 font-mono font-bold mb-1">Concurrency Primitives</div>
            <div className="text-sm font-semibold text-white">ExecutorService</div>
            <div className="text-xs text-slate-400 mt-1">Thread-safe aggregators using Java thread pools and atomic synchronization.</div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <div className="text-xs text-amber-400 font-mono font-bold mb-1">SERP Summarizer</div>
            <div className="text-sm font-semibold text-white">Semantic Synthesis</div>
            <div className="text-xs text-slate-400 mt-1">Summarizes paper abstracts and features directly for queries.</div>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <div className="text-xs text-cyan-400 font-mono font-bold mb-1">Data Visualizer</div>
            <div className="text-sm font-semibold text-white">Recharts Engine</div>
            <div className="text-xs text-slate-400 mt-1">Responsive bar charts, pie charts, and speedup trend lines.</div>
          </div>
        </div>
      </div>
    </div>
  );
};
