'use client';

import React, { useState, useEffect } from 'react';
import { SubHeadingResult } from '../lib/types';
import { fetchDlSubheadings } from '../lib/api';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { BookOpen, Sliders, FileText, Layout, ExternalLink, RefreshCw } from 'lucide-react';

const COLORS = ['#06B6D4', '#6366F1', '#8B5CF6', '#10B981', '#F59E0B', '#EC4899', '#3B82F6', '#14B8A6'];

export const DlSubheadingsTab: React.FC = () => {
  const [subheadings, setSubheadings] = useState<SubHeadingResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [threadCount, setThreadCount] = useState(4);
  const [selectedItem, setSelectedItem] = useState<SubHeadingResult | null>(null);

  const loadData = async (threads: number) => {
    setLoading(true);
    const data = await fetchDlSubheadings(threads);
    setSubheadings(data);
    if (data.length > 0 && !selectedItem) {
      setSelectedItem(data[0]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData(threadCount);
  }, []);

  const chartData = subheadings.map(sh => ({
    name: sh.title.length > 25 ? sh.title.substring(0, 22) + '...' : sh.title,
    fullName: sh.title,
    papers: sh.paperCount,
    percentage: sh.occurrencePercentage
  }));

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-cyan-500/20">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Task 2 Specification</span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            Distinct Sub-Headings in Deep Learning Journal Papers
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Multithreaded structural analysis extracting recurring section sub-headings across deep learning model publications (Transformers, ResNet, BERT, GANs, AlphaGo, Quantization).
          </p>
        </div>

        {/* Worker Threads Slider */}
        <div className="flex items-center gap-4 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-slate-300 font-medium">Worker Threads:</span>
            <span className="text-sm font-bold text-cyan-400 font-mono">{threadCount}</span>
          </div>
          <input
            type="range"
            min="1"
            max="16"
            value={threadCount}
            onChange={(e) => setThreadCount(parseInt(e.target.value))}
            className="w-24 accent-cyan-500 cursor-pointer"
          />
          <button
            onClick={() => loadData(threadCount)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Run
          </button>
        </div>
      </div>

      {/* Chart Section */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center justify-between">
          <span>Sub-Heading Frequency in Journal Literature</span>
          <span className="text-xs text-slate-400 font-mono">Paper Occurrence Count</span>
        </h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 40 }}>
              <XAxis
                dataKey="name"
                stroke="#94A3B8"
                fontSize={11}
                angle={-25}
                textAnchor="end"
                interval={0}
              />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', color: '#FFF' }}
                formatter={(val: any) => [`${val} Journal Papers`, 'Frequency']}
                labelFormatter={(label, payload) => payload[0]?.payload?.fullName || label}
              />
              <Bar dataKey="papers" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-dl-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Structural Hierarchy Grid & Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sub-headings List */}
        <div className="lg:col-span-2 glass-panel rounded-2xl border border-slate-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="font-semibold text-white">Extracted Structural Sub-Headings</h3>
            <span className="text-xs text-cyan-400 font-mono">Ordered by Frequency</span>
          </div>

          <div className="divide-y divide-slate-800">
            {subheadings.map((sh) => (
              <div
                key={sh.rank}
                onClick={() => setSelectedItem(sh)}
                className={`p-4 cursor-pointer transition-colors hover:bg-slate-800/60 flex items-center justify-between gap-4 ${
                  selectedItem?.rank === sh.rank ? 'bg-cyan-950/30 border-l-4 border-cyan-400' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-xs font-bold font-mono text-cyan-400 border border-slate-800 shrink-0 mt-0.5">
                    #{sh.rank}
                  </div>
                  <div>
                    <h4 className="font-medium text-white text-sm">{sh.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        {sh.category}
                      </span>
                      <span className="text-xs text-indigo-300 font-mono">
                        {sh.standardSectionHeader}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-sm font-bold font-mono text-cyan-400">{sh.paperCount} Papers</div>
                  <div className="text-xs text-slate-500">{sh.occurrencePercentage}% Frequency</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail Panel */}
        <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30 flex flex-col justify-between">
          {selectedItem ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 rounded-full text-xs font-mono font-semibold">
                  {selectedItem.standardSectionHeader}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {selectedItem.occurrencePercentage}% of DL Papers
                </span>
              </div>

              <h4 className="text-xl font-bold text-white leading-tight">
                {selectedItem.title}
              </h4>

              <div className="text-xs text-cyan-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                <strong className="text-slate-200">Category: </strong>{selectedItem.category}
              </div>

              <div>
                <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Section Overview</h5>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/40 p-3 rounded-lg">
                  {selectedItem.description}
                </p>
              </div>

              <div>
                <h5 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" /> Sample Publications Including Sub-Heading
                </h5>
                <ul className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {selectedItem.samplePaperTitles.map((paper, idx) => (
                    <li key={idx} className="text-xs text-slate-300 bg-slate-900 p-2 rounded border border-slate-800 flex items-start gap-2">
                      <Layout className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{paper}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
              Select a sub-heading to inspect publication breakdown.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
