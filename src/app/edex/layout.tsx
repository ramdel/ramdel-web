import type { ReactNode } from 'react';
import { JetBrains_Mono } from 'next/font/google';
import '../globals.css';
import './edex.css';

const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata = {
  title: 'RAMDEL.DEV — EDEX-UI Design',
  description: 'Mario de Jesus – DevSecOps Engineer | Security Dashboard',
};

export default function EdexLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${mono.variable} dark`}>
      <body className="edex-body">
        {/* Scanline overlay */}
        <div className="edex-scanlines" aria-hidden="true" />
        {/* Grid overlay */}
        <div className="edex-grid-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
