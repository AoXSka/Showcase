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
    id: 'devsecops',
    category: '01 · DevSecOps',
    title: 'Security-Integrated CI/CD',
    description:
      'Security gates embedded into every pipeline stage. Vulnerabilities are caught at commit time, not post-deployment. Shift-left security means fixing a CVE takes minutes, not incident response cycles.',
    terminalOutput: [
      '$ npm audit --audit-level=high',
      '> found 0 vulnerabilities',
      '$ trivy image portfolio:latest',
      '> Total: 0 (HIGH: 0, CRITICAL: 0)',
      '$ semgrep --config=p/owasp-top-ten .',
      '> Ran 143 rules on 28 files: 0 findings',
    ],
    capabilities: [
      'Dependency vulnerability scanning (npm audit, Dependabot)',
      'Container image scanning with Trivy',
      'SAST via Semgrep OWASP ruleset',
      'Secret leak detection in git history',
      'Automated security regression testing',
    ],
    accent: 'text-cyan-400',
    borderColor: 'border-cyan-500/20',
  },
  {
    id: 'owasp',
    category: '02 · OWASP Compliance',
    title: 'Top 10 Vulnerability Mitigation',
    description:
      'Every system built against the OWASP Top 10 framework. Input validation, output encoding, authentication hardening, and access control implemented at the architecture level—not patched in afterward.',
    terminalOutput: [
      '$ curl -I https://aoxska.dev',
      '> Strict-Transport-Security: max-age=63072000',
      '> Content-Security-Policy: default-src self',
      '> X-Frame-Options: SAMEORIGIN',
      '> X-Content-Type-Options: nosniff',
      '> Referrer-Policy: strict-origin-when-cross-origin',
    ],
    capabilities: [
      'A01: Broken Access Control → RBAC + least-privilege enforcement',
      'A02: Crypto Failures → AES-256-GCM, TLS 1.3 only',
      'A03: Injection → Parameterized queries, input sanitization',
      'A07: Auth Failures → JWT rotation, session hardening',
      'A09: Logging Failures → Structured audit logs, anomaly alerting',
    ],
    accent: 'text-green-400',
    borderColor: 'border-green-500/20',
  },
  {
    id: 'hardening',
    category: '03 · Linux Hardening',
    title: 'Server Security Baseline',
    description:
      'Hardened Linux servers following CIS Benchmark guidelines. Attack surface minimized through principle of least privilege, network isolation, and automated intrusion response.',
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
      'UFW firewall · allowlist-only ingress',
      'Fail2ban · automated IP blocking on bruteforce',
      'Unattended security upgrades via apt',
      'Process isolation · systemd sandboxing',
    ],
    accent: 'text-orange-400',
    borderColor: 'border-orange-500/20',
  },
  {
    id: 'api-security',
    category: '04 · API Security',
    title: 'Zero-Trust API Design',
    description:
      'APIs designed with zero-trust principles. Every request is authenticated, every payload validated, every response sanitized. Rate limiting and anomaly detection run at the edge before logic is ever reached.',
    terminalOutput: [
      '$ cat ./middleware/security.ts',
      '> rateLimiter(100req/15min per IP)',
      '> validateJWT() → 401 on tamper',
      '> sanitizeInput() → strip XSS vectors',
      '> auditLog(req, res, latency_ms)',
      '> helmet() → 12 security headers',
    ],
    capabilities: [
      'JWT RS256 signing · short-lived tokens',
      'Rate limiting per IP and per user',
      'Request payload validation (schema-strict)',
      'Response sanitization · no data leakage',
      'Structured audit logging · tamper-evident',
    ],
    accent: 'text-purple-400',
    borderColor: 'border-purple-500/20',
  },
];

function VaultCard({ item, isExpanded, onToggle }: {
  item: VaultItem;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const terminalAccentColor =
    item.accent === 'text-cyan-400' ? 'text-cyan-400' :
    item.accent === 'text-green-400' ? 'text-green-400' :
    item.accent === 'text-orange-400' ? 'text-orange-400' :
    'text-purple-400';

  return (
    <div
      className={`card-border rounded-xl border overflow-hidden transition-all duration-300 ${item.borderColor}`}
    >
      {/* Card header — always visible */}
      <button
        onClick={onToggle}
        className="w-full text-left p-6 flex items-start justify-between gap-4 hover:bg-white/[0.02] transition-colors"
      >
        <div className="space-y-1.5">
          <span className={`font-mono text-[11px] tracking-widest ${item.accent}`}>
            {item.category}
          </span>
          <h3 className="text-lg font-semibold text-slate-100">{item.title}</h3>
          <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">{item.description}</p>
        </div>
        <div className={`mt-1 shrink-0 w-6 h-6 rounded border ${item.borderColor} flex items-center justify-center font-mono text-xs ${item.accent} transition-transform duration-300 ${isExpanded ? 'rotate-45' : ''}`}>
          +
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-6 pb-6 space-y-5 border-t border-slate-800/60">
          <div className="grid md:grid-cols-2 gap-5 pt-5">
            {/* Terminal output */}
            <div className="rounded-lg overflow-hidden border border-slate-800">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-[#161b22] border-b border-slate-800">
                <div className="w-2 h-2 rounded-full bg-red-500/60"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500/60"></div>
                <div className="w-2 h-2 rounded-full bg-green-500/60"></div>
                <span className="ml-2 font-mono text-[11px] text-slate-600">audit output</span>
              </div>
              <div className="bg-[#0d1117] p-4 space-y-1.5 font-mono text-xs">
                {item.terminalOutput.map((line, i) => (
                  <div key={i} className={line.startsWith('$') ? terminalAccentColor : 'text-slate-400'}>
                    {line}
                  </div>
                ))}
              </div>
            </div>

            {/* Capabilities list */}
            <div className="space-y-2">
              <p className={`font-mono text-[11px] tracking-widest ${item.accent}`}>CAPABILITIES</p>
              <ul className="space-y-2">
                {item.capabilities.map((cap, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                    <span className={`mt-1 shrink-0 w-1.5 h-1.5 rounded-full ${
                      item.accent === 'text-cyan-400' ? 'bg-cyan-500' :
                      item.accent === 'text-green-400' ? 'bg-green-500' :
                      item.accent === 'text-orange-400' ? 'bg-orange-500' :
                      'bg-purple-500'
                    }`}></span>
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

  const toggle = (id: string) =>
    setExpandedId((prev) => (prev === id ? null : id));

  return (
    <section id="vault" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-16 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-green-500/50"></div>
            <span className="font-mono text-xs text-green-400 tracking-widest uppercase">
              The Vault
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100">
            Cybersecurity Capabilities
          </h2>
          <p className="text-slate-500 text-sm max-w-2xl font-mono">
            Defensive security, compliance engineering, and hardened infrastructure.
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
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-1.5 font-mono text-[11px]">
                <span className="text-slate-600">{badge.label}:</span>
                <span className="text-green-400">{badge.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Vault items */}
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

        {/* Disclaimer */}
        <div className="mt-8 p-4 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-600">
          <span className="text-slate-700">// </span>
          All security capabilities listed are defensive in nature. Tooling and techniques are applied
          exclusively to authorized systems. Penetration testing activities are scoped and contracted.
        </div>
      </div>
    </section>
  );
}
