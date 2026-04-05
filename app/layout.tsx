import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'David Castillo — Full-Stack Engineer · DevOps · Security',
  description:
    'Full-Stack Engineer, DevOps Architect & Security-First Systems Designer based in Venezuela. Builder of high-availability infrastructure, autonomous AI agents, and penetration-tested architectures.',
  keywords: [
    'David Castillo',
    'Full-Stack Engineer',
    'DevOps Engineer',
    'Cybersecurity',
    'Penetration Testing',
    'Node.js',
    'Python',
    'FastAPI',
    'React',
    'Docker',
    'GitHub Actions',
    'AES-256',
    'OWASP',
    'Burp Suite',
    'Linux Hardening',
    'AI Agents',
    'TEO',
    'Venezuela',
  ],
  authors: [{ name: 'David Castillo', url: 'https://david-system.lat' }],
  openGraph: {
    type: 'website',
    url: 'https://david-system.lat',
    title: 'David Castillo — Full-Stack · DevOps · Security Engineer',
    description:
      'High-availability systems, zero-trust architecture, and autonomous AI trading agents. Security-first. Engineered for precision.',
    siteName: 'david-system.lat',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'David Castillo — Full-Stack · DevOps · Security Engineer',
    description:
      'High-availability systems, zero-trust architecture, and autonomous AI trading agents.',
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
