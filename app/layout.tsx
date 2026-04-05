import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Portfolio — Full-Stack Engineer · DevOps Architect · Security Systems',
  description:
    'Reliable Systems Architect specializing in Full-Stack Engineering, DevOps automation, and Security-First system design. Builder of high-availability infrastructure and autonomous AI systems.',
  keywords: [
    'Full-Stack Engineer',
    'DevOps Architect',
    'Cybersecurity',
    'Node.js',
    'React',
    'Python',
    'Docker',
    'CI/CD',
    'AES-256',
    'OWASP',
    'Linux Hardening',
    'AI Agents',
  ],
  authors: [{ name: 'AoXSka' }],
  openGraph: {
    type: 'website',
    title: 'Portfolio — Systems Engineer · DevOps · Security',
    description:
      'High-availability systems, zero-trust architecture, and autonomous AI agents. Engineered for precision.',
    siteName: 'Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio — Systems Engineer · DevOps · Security',
    description:
      'High-availability systems, zero-trust architecture, and autonomous AI agents.',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-[#030712] text-slate-200 antialiased scanline-overlay">
        {children}
      </body>
    </html>
  );
}
