import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SERP Intelligence Platform - Multithreaded Feature Mining',
  description: 'Multithreaded Search Engine Results Pages (SERP) feature extraction & deep learning journal sub-heading analysis engine.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0B0F17] text-slate-100 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
