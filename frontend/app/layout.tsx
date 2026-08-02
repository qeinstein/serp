import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SERP Engine — Multithreaded Feature Mining',
  description: 'Multithreaded SERP feature extraction & deep learning journal sub-heading analysis.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
