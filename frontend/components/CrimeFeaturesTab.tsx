'use client';

import React, { useState, useEffect } from 'react';
import { CrimeFeatureResult } from '../lib/types';
import { fetchCrimeFeatures } from '../lib/api';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend
} from 'recharts';
import { Shield, Sliders, CheckCircle2, Info, ChevronRight, RefreshCw } from 'lucide-react';

const COLORS = ['#6366F1', '#06B6D4', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#3B82F6', '#14B8A6', '#F97316', '#A855F7', '#64748B', '#0284C7'];

export const CrimeFeaturesTab: React.FC = () => {
  const [features, setFeatures] = useState<CrimeFeatureResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [threadCount, setThreadCount] = useState(4);
  const [selectedFeature, setSelectedFeature] = useState<CrimeFeatureResult | null>(null);

  const loadData = async (threads: number) => {
    setLoading(true);
    const data = await fetchCrimeFeatures(threads);
    setFeatures(data);
    if (data.length > 0 && !selectedFeature) {
      setSelectedFeature(data[0]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData(threadCount);
  }, []);

  const chartData = features.map(f => ({
    name: f.featureName.length > 25 ? f.featureName.substring(0, 22) + '...' : f.featureName,
    fullName: f.featureName,
    systems: f.systemCount,
    percentage: f.percentageOfSystems
  }));

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-indigo-500/20">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold mb-1">
            <Shield className="w-4 h-4" />
            <span>Task 1 Specification</span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            Distinctive Features of Crime-Reporting Papers/Systems
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Multithreaded analysis extracting <span className="text-indigo-400 font-semibold">12 distinct features</span> from SERP datasets, ranked strictly in descending order of systems embodying each feature.
          </p>
        </div>

        {/* Multithread Executor Control */}
        <div className="flex items-center gap-4 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-400" />
            <span className="text-xs text-slate-300 font-medium">Worker Threads:</span>
            <span className="text-sm font-bold text-indigo-400 font-mono">{threadCount}</span>
          </div>
          <input
            type="range"
            min="1"
            max="16"
            value={threadCount}
            onChange={(e) => setThreadCount(parseInt(e.target.value))}
            className="w-24 accent-indigo-500 cursor-pointer"
          />
          <button
            onClick={() => loadData(threadCount)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Run
          </button>
        </div>
      </div>

      {/* Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ranked Bar Chart */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center justify-between">
            <span>Features Categorized by System Frequency</span>
            <span className="text-xs text-slate-400 font-mono">Ordered: Highest &rarr; Lowest</span>
          </h3>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                <XAxis type="number" stroke="#64748B" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="#94A3B8" fontSize={11} width={170} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', color: '#FFF' }}
                  formatter={(value: any) => [`${value} Systems`, 'System Count']}
                  labelFormatter={(label, payload) => payload[0]?.payload?.fullName || label}
                />
                <Bar dataKey="systems" radius={[0, 4, 4, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Feature Category Distribution Pie */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <h3 className="text-lg font-semibold text-white mb-2">Category Breakdown</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData.slice(0, 6)}
                  dataKey="systems"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={75}
                  innerRadius={45}
                  paddingAngle={4}
                >
                  {chartData.slice(0, 6).map((entry, index) => (
                    <Cell key={`pie-cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center text-xs text-slate-400">
            Top feature domains categorized by system adoption density
          </div>
        </div>
      </div>

      {/* Feature Ranking Table & Selected Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table List */}
        <div className="lg:col-span-2 glass-panel rounded-2xl border border-slate-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <h3 className="font-semibold text-white">Ranked Feature Inventory ({features.length} Features)</h3>
            <span className="text-xs text-indigo-400 font-mono">Rank 1 to {features.length}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900/80 text-xs uppercase text-slate-400 font-mono">
                <tr>
                  <th className="py-3 px-4">Rank</th>
                  <th className="py-3 px-4">Feature Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4 text-center">Systems</th>
                  <th className="py-3 px-4 text-center">Coverage</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {features.map((item) => (
                  <tr
                    key={item.rank}
                    onClick={() => setSelectedFeature(item)}
                    className={`cursor-pointer transition-colors hover:bg-slate-800/60 ${
                      selectedFeature?.rank === item.rank ? 'bg-indigo-950/40 border-l-4 border-indigo-500' : ''
                    }`}
                  >
                    <td className="py-3 px-4 font-mono font-bold text-indigo-400">#{item.rank}</td>
                    <td className="py-3 px-4 font-medium text-white">{item.featureName}</td>
                    <td className="py-3 px-4 text-xs text-slate-400">
                      <span className="px-2 py-1 bg-slate-800 rounded-md border border-slate-700">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center font-bold font-mono text-cyan-400">{item.systemCount}</td>
                    <td className="py-3 px-4 text-center font-mono text-xs">{item.percentageOfSystems}%</td>
                    <td className="py-3 px-4 text-right">
                      <ChevronRight className="w-4 h-4 inline-block text-slate-500" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Feature Detail Card */}
        <div className="glass-panel p-6 rounded-2xl border border-indigo-500/30 flex flex-col justify-between">
          {selectedFeature ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 rounded-full text-xs font-mono font-semibold">
                  Rank #{selectedFeature.rank} Feature
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {selectedFeature.systemCount} Systems ({selectedFeature.percentageOfSystems}%)
                </span>
              </div>

              <h4 className="text-xl font-bold text-white leading-tight">
                {selectedFeature.featureName}
              </h4>

              <div className="text-xs text-indigo-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                <strong className="text-slate-200">Category: </strong>{selectedFeature.category}
              </div>

              <div>
                <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Description</h5>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/40 p-3 rounded-lg">
                  {selectedFeature.description}
                </p>
              </div>

              <div>
                <h5 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5" /> Technical Impact
                </h5>
                <p className="text-xs text-slate-300 bg-emerald-950/20 border border-emerald-900/50 p-3 rounded-lg">
                  {selectedFeature.technicalImpact}
                </p>
              </div>

              <div>
                <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Adopting Systems / Papers</h5>
                <ul className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {selectedFeature.adoptingSystems.map((sys, idx) => (
                    <li key={idx} className="text-xs text-slate-300 bg-slate-900 p-2 rounded border border-slate-800 flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{sys}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
              Select a feature from the table to view details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
