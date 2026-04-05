'use client';

import { useEffect, useRef, useState } from 'react';

type Skill = {
  name: string;
  level: number; // 0-100
  tag?: string;
};

type Layer = {
  id: string;
  label: string;
  sublabel: string;
  icon: string;
  accent: string;
  borderColor: string;
  description: string;
  skills: Skill[];
};

const layers: Layer[] = [
  {
    id: 'core',
    label: 'CORE',
    sublabel: 'Logic Layer',
    icon: '⬡',
    accent: 'text-cyan-400',
    borderColor: 'border-cyan-500/20 hover:border-cyan-400/50',
    description: 'Application logic, data modeling, and API design. Where business requirements become executable systems.',
    skills: [
      { name: 'Node.js', level: 92, tag: 'runtime' },
      { name: 'React / Next.js', level: 90, tag: 'frontend' },
      { name: 'Python', level: 88, tag: 'automation·ai' },
      { name: 'Express.js', level: 91, tag: 'backend' },
      { name: 'SQL / PostgreSQL', level: 85, tag: 'data' },
      { name: 'REST / WebSocket', level: 93, tag: 'protocol' },
      { name: 'TypeScript', level: 82, tag: 'typing' },
    ],
  },
  {
    id: 'ops',
    label: 'OPS',
    sublabel: 'Infrastructure Layer',
    icon: '◈',
    accent: 'text-orange-400',
    borderColor: 'border-orange-500/20 hover:border-orange-400/50',
    description: 'Container orchestration, automated deployments, and infrastructure hardening. Zero-downtime is the baseline.',
    skills: [
      { name: 'Docker', level: 90, tag: 'containers' },
      { name: 'Linux / Bash', level: 88, tag: 'systems' },
      { name: 'CI/CD (GitHub Actions)', level: 87, tag: 'automation' },
      { name: 'Nginx', level: 84, tag: 'proxy' },
      { name: 'Cloudflare', level: 83, tag: 'edge·cdn' },
      { name: 'Vercel', level: 89, tag: 'deploy' },
      { name: 'Process Monitoring', level: 85, tag: 'observability' },
    ],
  },
  {
    id: 'shield',
    label: 'SHIELD',
    sublabel: 'Security Layer',
    icon: '◉',
    accent: 'text-green-400',
    borderColor: 'border-green-500/20 hover:border-green-400/50',
    description: 'Defensive security, encryption standards, and hardened configurations. Security is not a feature—it is the foundation.',
    skills: [
      { name: 'AES-256-GCM', level: 90, tag: 'encryption' },
      { name: 'OWASP Top 10', level: 88, tag: 'compliance' },
      { name: 'Linux Hardening', level: 86, tag: 'baseline' },
      { name: 'Content Security Policy', level: 87, tag: 'headers' },
      { name: 'JWT / API Auth', level: 91, tag: 'zero-trust' },
      { name: 'DevSecOps', level: 84, tag: 'pipeline' },
      { name: 'Dependency Auditing', level: 85, tag: 'supply-chain' },
    ],
  },
];

function SkillRow({ skill, accent, delay }: { skill: Skill; accent: string; delay: number }) {
  const [filled, setFilled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setFilled(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);

  const barColor =
    accent === 'text-cyan-400'
      ? 'bg-cyan-500'
      : accent === 'text-orange-400'
      ? 'bg-orange-500'
      : 'bg-green-500';

  const barGlow =
    accent === 'text-cyan-400'
      ? 'shadow-[0_0_8px_rgba(34,211,238,0.6)]'
      : accent === 'text-orange-400'
      ? 'shadow-[0_0_8px_rgba(251,146,60,0.6)]'
      : 'shadow-[0_0_8px_rgba(74,222,128,0.6)]';

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-slate-300">{skill.name}</span>
          {skill.tag && (
            <span className="font-mono text-[10px] text-slate-600 bg-slate-800/50 px-1.5 py-0.5 rounded">
              {skill.tag}
            </span>
          )}
        </div>
        <span className={`font-mono text-[11px] ${accent}`}>{skill.level}%</span>
      </div>
      <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${barColor} ${barGlow} transition-all duration-1000 ease-out`}
          style={{ width: filled ? `${skill.level}%` : '0%' }}
        ></div>
      </div>
    </div>
  );
}

export default function SystemArchitecture() {
  return (
    <section id="architecture" className="relative py-32 px-6">
      {/* Section header */}
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-cyan-500/50"></div>
            <span className="font-mono text-xs text-cyan-500 tracking-widest uppercase">
              System Architecture
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100">
            Stack Organized by Layer
          </h2>
          <p className="text-slate-500 text-sm max-w-2xl font-mono">
            Three-tier architecture: Logic drives functionality. Infrastructure ensures availability. Security protects everything.
          </p>
        </div>

        {/* Three layer cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {layers.map((layer, li) => (
            <div
              key={layer.id}
              className={`card-border rounded-xl p-6 space-y-6 transition-all duration-300 border ${layer.borderColor}`}
            >
              {/* Card header */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`text-xl ${layer.accent}`}>{layer.icon}</span>
                    <div>
                      <p className={`font-mono text-lg font-bold ${layer.accent}`}>{layer.label}</p>
                      <p className="font-mono text-[11px] text-slate-600 tracking-wider">{layer.sublabel}</p>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-slate-700 border border-slate-800 px-2 py-0.5 rounded">
                    {String(li + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed pt-1">{layer.description}</p>
              </div>

              <div className="h-px bg-slate-800/80"></div>

              {/* Skills list */}
              <div className="space-y-4">
                {layer.skills.map((skill, si) => (
                  <SkillRow
                    key={skill.name}
                    skill={skill}
                    accent={layer.accent}
                    delay={si * 80}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Architecture summary */}
        <div className="mt-10 p-5 rounded-xl border border-slate-800 bg-[#0d1117] font-mono text-xs">
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-slate-500">
            <span>
              <span className="text-slate-700">{'// '}</span>
              Design Pattern:{' '}
              <span className="text-cyan-400">Security-by-default · Fail-safe · Least-privilege</span>
            </span>
            <span>
              <span className="text-slate-700">{'// '}</span>
              Availability Target:{' '}
              <span className="text-green-400">99.9%+ SLA</span>
            </span>
            <span>
              <span className="text-slate-700">{'// '}</span>
              Deployment:{' '}
              <span className="text-orange-400">Containerized · Edge-distributed</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
