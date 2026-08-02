'use client';

import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CrimeFeaturesTab } from '../components/CrimeFeaturesTab';
import { DlSubheadingsTab } from '../components/DlSubheadingsTab';
import { MultithreadBenchmarkTab } from '../components/MultithreadBenchmarkTab';
import { ArchitectureDiagram } from '../components/ArchitectureDiagram';

type Tab = 'crime' | 'dl' | 'benchmark' | 'arch';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('crime');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main style={{ flex: 1, maxWidth: 1100, width: '100%', margin: '0 auto', padding: '32px 24px' }}>
        {activeTab === 'crime'     && <CrimeFeaturesTab />}
        {activeTab === 'dl'        && <DlSubheadingsTab />}
        {activeTab === 'benchmark' && <MultithreadBenchmarkTab />}
        {activeTab === 'arch'      && <ArchitectureDiagram />}
      </main>
      <Footer />
    </div>
  );
}
