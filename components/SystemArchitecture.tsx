'use client';

import { useEffect, useRef, useState } from 'react';

type Skill = {
  name: string;
  level: number;
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
    description: 'Application logic, API design, and data modeling. Mechatronics engineering background applied to precision-first system architecture.',
    skills: [
      { name: 'Node.js', level: 92, tag: 'runtime' },
      { name: 'Python / FastAPI', level: 90, tag: 'backend·ai' },
      { name: 'React / Next.js', level: 88, tag: 'frontend' },
      { name: 'Express.js', level: 91, tag: 'backend' },
      { name: 'SQL / PostgreSQL', level: 85, tag: 'data' },
      { name: 'REST / WebSocket', level: 93, tag: 'protocol' },
      { name: 'TypeScript', level: 83, tag: 'typing' },
    ],
  },
  {
    id: 'ops',
    label: 'OPS',
    sublabel: 'Infrastructure Layer',
    icon: '◈',
    accent: 'text-orange-400',
    borderColor: 'border-orange-500/20 hover:border-orange-400/50',
    description: 'Container orchestration, CI/CD automation, and hardened infrastructure. Zero-downtime deployments with encrypted persistence and VPC architecture.',
    skills: [
      { name: 'Docker', level: 90, tag: 'containers' },
      { name: 'Linux / Bash', level: 89, tag: 'systems' },
      { name: 'GitHub Actions', level: 88, tag: 'ci·cd' },
      { name: 'VPC Architecture', level: 84, tag: 'networking' },
      { name: 'Nginx', level: 83, tag: 'proxy' },
      { name: 'Cloudflare', level: 82, tag: 'edge·cdn' },
      { name: 'Process Monitoring', level: 86, tag: 'observability' },
    ],
  },
  {
    id: 'shield',
    label: 'SHIELD',
    sublabel: 'Security Layer',
    icon: '◉',
    accent: 'text-green-400',
    borderColor: 'border-green-500/20 hover:border-green-400/50',
    description: 'Offensive assessment tooling combined with defensive hardening. SAST/DAST pipelines, penetration testing, and encrypted-by-default architectures.',
    skills: [
      { name: 'AES-256-GCM', level: 91, tag: 'encryption' },
      { name: 'Burp Suite / OWASP ZAP', level: 87, tag: 'pentest' },
      { name: 'Nmap', level: 85, tag: 'recon' },
      { name: 'OWASP Top 10', level: 89, tag: 'compliance' },
      { name: 'DevSecOps / SAST·DAST', level: 86, tag: 'pipeline' },
      { name: 'OAuth2 / JWT', level: 90, tag: 'auth' },
      { name: 'Linux Hardening', level: 88, tag: 'baseline' },
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

        <div className="grid md:grid-cols-3 gap-6">
          {layers.map((layer, li) => (
            <div
              key={layer.id}
              className={`card-border rounded-xl p-6 space-y-6 transition-all duration-300 border ${layer.borderColor}`}
            >
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

        <div className="mt-10 p-5 rounded-xl border border-slate-800 bg-[#0d1117] font-mono text-xs">
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-slate-500">
            <span>
              <span className="text-slate-700">{'// '}</span>
              Background:{' '}
              <span className="text-cyan-400">Mechatronics Engineering · Systems-level precision</span>
            </span>
            <span>
              <span className="text-slate-700">{'// '}</span>
              Availability Target:{' '}
              <span className="text-green-400">99.9%+ SLA</span>
            </span>
            <span>
              <span className="text-slate-700">{'// '}</span>
              Deployment:{' '}
              <span className="text-orange-400">Containerized · VPC-isolated · Edge-distributed</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
