'use client';

import { useEffect, useState } from 'react';

const terminalLines = [
  { prompt: '$', text: 'whoami', color: 'text-cyan-400' },
  { prompt: '>', text: 'David Castillo — Full-Stack · DevOps · Security Engineer', color: 'text-green-400' },
  { prompt: '$', text: 'cat ./company.conf', color: 'text-cyan-400' },
  { prompt: '>', text: 'Celestial Current Solutions · Venezuela (Remote)', color: 'text-slate-300' },
  { prompt: '$', text: 'ls ./stack/', color: 'text-cyan-400' },
  { prompt: '>', text: 'node.js  python  fastapi  react  docker  linux  github-actions', color: 'text-slate-300' },
  { prompt: '$', text: 'tail -n 2 ./projects/TEO/exec.log', color: 'text-cyan-400' },
  { prompt: '>', text: '[OK] ORDER_EXECUTED  latency=47ms  keys=AES-256  incidents=0', color: 'text-green-400' },
];

const metrics = [
  { label: 'UPTIME SLA', value: '99.97%', color: 'text-green-400' },
  { label: 'EXEC LATENCY', value: '< 50ms', color: 'text-cyan-400' },
  { label: 'ENCRYPTION', value: 'AES-256-GCM', color: 'text-cyan-400' },
  { label: 'API INCIDENTS', value: '0', color: 'text-green-400' },
];

export default function Hero() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const delays = [800, 1400, 2200, 2900, 3600, 4200, 5100, 5900];
    const timers = delays.map((delay, i) =>
      setTimeout(() => setVisibleLines(i + 1), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden grid-bg pt-16">
      {/* Radial glow backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-cyan-400/3 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        {/* ── Left: Headline ── */}
        <div className="space-y-8">
          {/* Status badge */}
          <div className="fade-up fade-up-delay-1 inline-flex items-center gap-2 px-3 py-1.5 rounded border border-cyan-500/20 bg-cyan-500/5 font-mono text-xs text-cyan-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 status-dot"></span>
            SYSTEM OPERATIONAL · VENEZUELA
          </div>

          {/* Main headline */}
          <div className="fade-up fade-up-delay-2 space-y-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Systems That{' '}
              <span className="text-cyan-400 text-glow-cyan">Don&apos;t Fail.</span>
            </h1>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Code That{' '}
              <span className="text-green-400 text-glow-green">Doesn&apos;t Leak.</span>
            </h1>
          </div>

          {/* Name + Role */}
          <div className="fade-up fade-up-delay-3 space-y-1">
            <p className="text-xl font-semibold text-slate-200">David Castillo</p>
            <p className="font-mono text-sm text-slate-400 tracking-widest uppercase">
              Full-Stack Engineer &nbsp;·&nbsp; DevOps Architect &nbsp;·&nbsp; Security-First Designer
            </p>
          </div>

          {/* Description */}
          <p className="fade-up fade-up-delay-4 text-slate-400 text-base leading-relaxed max-w-lg">
            Building high-availability infrastructure, autonomous AI trading agents, and
            penetration-tested security architectures. Mechatronics engineering background
            applied to systems that are precise, resilient, and zero-trust by default.
          </p>

          {/* CTAs */}
          <div className="fade-up fade-up-delay-5 flex flex-wrap gap-4">
            <a
              href="#systems"
              className="px-6 py-3 bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 font-mono text-sm rounded hover:bg-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all duration-300"
            >
              View Architecture →
            </a>
            <a
              href="#vault"
              className="px-6 py-3 border border-slate-700 text-slate-400 font-mono text-sm rounded hover:border-slate-500 hover:text-slate-200 transition-all duration-300"
            >
              The Vault
            </a>
          </div>

          {/* Metrics bar */}
          <div className="fade-up fade-up-delay-5 pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-800">
            {metrics.map((m) => (
              <div key={m.label} className="space-y-1">
                <p className="font-mono text-[10px] text-slate-600 tracking-widest">{m.label}</p>
                <p className={`font-mono text-sm font-semibold ${m.color}`}>{m.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Terminal ── */}
        <div className="fade-up fade-up-delay-3">
          <div className="card-border rounded-xl overflow-hidden font-mono text-sm glow-cyan">
            {/* Terminal chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-cyan-500/10">
              <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
              <span className="ml-3 text-xs text-slate-500">bash — david@celestial-sec-node</span>
              <div className="ml-auto flex items-center gap-1.5 text-xs text-slate-600">
                <span className="w-1 h-1 rounded-full bg-green-500 status-dot"></span>
                LIVE
              </div>
            </div>

            {/* Terminal body */}
            <div className="bg-[#0d1117] p-5 space-y-1.5 min-h-[340px]">
              {terminalLines.map((line, i) => (
                <div
                  key={i}
                  className={`flex gap-2 transition-opacity duration-200 ${
                    i < visibleLines ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <span
                    className={
                      line.prompt === '$' ? 'text-cyan-500 select-none' : 'text-slate-600 select-none'
                    }
                  >
                    {line.prompt}
                  </span>
                  <span className={line.color}>{line.text}</span>
                </div>
              ))}

              {/* Active cursor line */}
              {visibleLines >= terminalLines.length && (
                <div className="flex gap-2 mt-2">
                  <span className="text-cyan-500 select-none">$</span>
                  <span
                    className="inline-block w-2 h-4 bg-cyan-400 translate-y-0.5"
                    style={{ opacity: showCursor ? 1 : 0, transition: 'opacity 0.1s' }}
                  ></span>
                </div>
              )}
            </div>

            {/* Terminal footer */}
            <div className="flex items-center justify-between px-5 py-2.5 bg-[#161b22] border-t border-cyan-500/10">
              <span className="text-[11px] text-slate-600 font-mono">
                session: encrypted · tls1.3
              </span>
              <span className="text-[11px] text-green-500 font-mono">
                ● SECURE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600">
        <span className="font-mono text-[10px] tracking-widest">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent"></div>
      </div>
    </section>
  );
}
