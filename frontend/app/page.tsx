'use client';

import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CrimeFeaturesTab } from '../components/CrimeFeaturesTab';
import { DlSubheadingsTab } from '../components/DlSubheadingsTab';
import { MultithreadBenchmarkTab } from '../components/MultithreadBenchmarkTab';
import { ArchitectureDiagram } from '../components/ArchitectureDiagram';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'crime' | 'dl' | 'benchmark' | 'arch'>('crime');

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0B0F17] text-slate-100">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-7xl mx-auto px-6 py-8 flex-1 w-full">
        {activeTab === 'crime' && <CrimeFeaturesTab />}
        {activeTab === 'dl' && <DlSubheadingsTab />}
        {activeTab === 'benchmark' && <MultithreadBenchmarkTab />}
        {activeTab === 'arch' && <ArchitectureDiagram />}
      </main>

      <Footer />
    </div>
  );
}
