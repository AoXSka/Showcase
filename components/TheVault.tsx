'use client';

import { useState } from 'react';

type VaultItem = {
  id: string;
  category: string;
  title: string;
  description: string;
  terminalOutput: string[];
  capabilities: string[];
  accent: string;
  borderColor: string;
};

const vaultItems: VaultItem[] = [
  {
    id: 'pentest',
    category: '01 · Vulnerability Assessment',
    title: 'Penetration Testing & Offensive Tools',
    description:
      'Active security assessment using industry-standard tooling. Identifying attack surfaces before adversaries do — with structured reporting and remediation guidance. All activities scoped and authorized.',
    terminalOutput: [
      '$ nmap -sV -sC --script vuln target.local',
      '> PORT 22/tcp  open  ssh  OpenSSH 8.9',
      '> PORT 443/tcp open  https nginx/1.24',
      '> [+] No critical CVEs detected on exposed ports',
      '$ burpsuite --project pentest_2026.burp',
      '> Scan completed: 0 high · 2 medium · 4 info',
    ],
    capabilities: [
      'Burp Suite Pro — web application vulnerability scanning',
      'Nmap — network reconnaissance and service enumeration',
      'OWASP ZAP — automated DAST scanning integrated into CI/CD',
      'Manual injection testing (SQLi, XSS, SSRF, IDOR)',
      'Structured pentest reports with CVSS scoring',
    ],
    accent: 'text-red-400',
    borderColor: 'border-red-500/20',
  },
  {
    id: 'devsecops',
    category: '02 · DevSecOps',
    title: 'Security-Integrated CI/CD Pipelines',
    description:
      'Security gates embedded at every pipeline stage. SAST catches logic flaws at commit time; DAST scans running services post-deploy. Vulnerabilities are fixed in minutes, not during incident response.',
    terminalOutput: [
      '$ semgrep --config=p/owasp-top-ten .',
      '> Ran 143 rules on 28 files: 0 findings',
      '$ npm audit --audit-level=critical --omit=dev',
      '> found 0 critical vulnerabilities',
      '$ trivy image portfolio:latest',
      '> Total: 0 (HIGH: 0, CRITICAL: 0)',
    ],
    capabilities: [
      'SAST via Semgrep OWASP ruleset on every PR',
      'Dependency scanning — npm audit + Dependabot weekly',
      'Container image scanning with Trivy',
      'Secret leak detection — .env file gates in CI',
      'Automated regression testing for security baselines',
    ],
    accent: 'text-cyan-400',
    borderColor: 'border-cyan-500/20',
  },
  {
    id: 'owasp',
    category: '03 · OWASP Compliance',
    title: 'Top 10 Vulnerability Mitigation',
    description:
      'Every system built against the OWASP Top 10 framework. Input validation, output encoding, authentication hardening, and access control implemented at architecture level — not patched in afterward.',
    terminalOutput: [
      '$ curl -I https://david-system.lat',
      '> Strict-Transport-Security: max-age=63072000',
      '> Content-Security-Policy: default-src self',
      '> X-Frame-Options: SAMEORIGIN',
      '> X-Content-Type-Options: nosniff',
      '> Referrer-Policy: strict-origin-when-cross-origin',
    ],
    capabilities: [
      'A01: Broken Access Control → RBAC + least-privilege',
      'A02: Crypto Failures → AES-256-GCM, TLS 1.3 only',
      'A03: Injection → parameterized queries, schema validation',
      'A07: Auth Failures → OAuth2/JWT with rotation',
      'A09: Logging Failures → structured audit logs + alerting',
    ],
    accent: 'text-green-400',
    borderColor: 'border-green-500/20',
  },
  {
    id: 'hardening',
    category: '04 · Linux Hardening',
    title: 'Server Security Baseline',
    description:
      'Hardened Linux servers following CIS Benchmark guidelines. Attack surface minimized through principle of least privilege, VPC network isolation, and automated intrusion response.',
    terminalOutput: [
      '$ lynis audit system',
      '> Hardening index: 82 [ ############ ]',
      '$ ss -tlnp | grep LISTEN',
      '> 0.0.0.0:443  nginx (only port exposed)',
      '$ fail2ban-client status sshd',
      '> Currently banned: 0 | Total banned: 47',
    ],
    capabilities: [
      'SSH key-only auth · password login disabled',
      'UFW firewall · allowlist-only ingress rules',
      'Fail2ban · automated IP blocking on bruteforce',
      'Unattended security upgrades via apt',
      'Process isolation · systemd sandboxing + watchdog',
    ],
    accent: 'text-orange-400',
    borderColor: 'border-orange-500/20',
  },
];

function VaultCard({ item, isExpanded, onToggle }: {
  item: VaultItem;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const promptColor =
    item.accent === 'text-red-400' ? 'text-red-400' :
    item.accent === 'text-cyan-400' ? 'text-cyan-400' :
    item.accent === 'text-green-400' ? 'text-green-400' :
    'text-orange-400';

  const dotColor =
    item.accent === 'text-red-400' ? 'bg-red-500' :
    item.accent === 'text-cyan-400' ? 'bg-cyan-500' :
    item.accent === 'text-green-400' ? 'bg-green-500' :
    'bg-orange-500';

  return (
    <div className={`card-border rounded-xl border overflow-hidden transition-all duration-300 ${item.borderColor}`}>
      <button
        onClick={onToggle}
        className="w-full text-left p-6 flex items-start justify-between gap-4 hover:bg-white/[0.02] transition-colors"
      >
        <div className="space-y-1.5">
          <span className={`font-mono text-[11px] tracking-widest ${item.accent}`}>{item.category}</span>
          <h3 className="text-lg font-semibold text-slate-100">{item.title}</h3>
          <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">{item.description}</p>
        </div>
        <div className={`mt-1 shrink-0 w-6 h-6 rounded border ${item.borderColor} flex items-center justify-center font-mono text-xs ${item.accent} transition-transform duration-300 ${isExpanded ? 'rotate-45' : ''}`}>
          +
        </div>
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 space-y-5 border-t border-slate-800/60">
          <div className="grid md:grid-cols-2 gap-5 pt-5">
            <div className="rounded-lg overflow-hidden border border-slate-800">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-[#161b22] border-b border-slate-800">
                <div className="w-2 h-2 rounded-full bg-red-500/60"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500/60"></div>
                <div className="w-2 h-2 rounded-full bg-green-500/60"></div>
                <span className="ml-2 font-mono text-[11px] text-slate-600">audit output</span>
              </div>
              <div className="bg-[#0d1117] p-4 space-y-1.5 font-mono text-xs">
                {item.terminalOutput.map((line, i) => (
                  <div key={i} className={line.startsWith('$') ? promptColor : 'text-slate-400'}>
                    {line}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className={`font-mono text-[11px] tracking-widest ${item.accent}`}>CAPABILITIES</p>
              <ul className="space-y-2">
                {item.capabilities.map((cap, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                    <span className={`mt-1 shrink-0 w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TheVault() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const toggle = (id: string) => setExpandedId((prev) => (prev === id ? null : id));

  return (
    <section id="vault" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-green-500/50"></div>
            <span className="font-mono text-xs text-green-400 tracking-widest uppercase">The Vault</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100">Cybersecurity Capabilities</h2>
          <p className="text-slate-500 text-sm max-w-2xl font-mono">
            Offensive assessment tooling and defensive hardening. Both sides of the attack surface.
            Click any domain to inspect the implementation detail.
          </p>
        </div>

        {/* Security score banner */}
        <div className="mb-8 p-4 rounded-xl border border-green-500/15 bg-green-500/3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-green-400 text-2xl font-bold font-mono">82</div>
            <div>
              <p className="font-mono text-xs text-green-400">HARDENING INDEX</p>
              <p className="font-mono text-[11px] text-slate-600">Lynis audit · CIS Benchmark baseline</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'CSP', status: 'ENFORCED' },
              { label: 'HSTS', status: 'ENABLED' },
              { label: 'TLS', status: '1.3 ONLY' },
              { label: 'SSH', status: 'KEY-ONLY' },
              { label: 'PENTEST', status: 'AUTHORIZED' },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-1.5 font-mono text-[11px]">
                <span className="text-slate-600">{badge.label}:</span>
                <span className="text-green-400">{badge.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {vaultItems.map((item) => (
            <VaultCard
              key={item.id}
              item={item}
              isExpanded={expandedId === item.id}
              onToggle={() => toggle(item.id)}
            />
          ))}
        </div>

        <div className="mt-8 p-4 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-600">
          <span className="text-slate-700">{'// '}</span>
          All security capabilities listed are defensive or authorized-assessment in nature.
          Penetration testing activities are scoped, contracted, and legally authorized.
        </div>
      </div>
    </section>
  );
}
