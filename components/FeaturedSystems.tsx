'use client';

import { useState } from 'react';

const teoCodeSnippet = `# TEO — Execution Engine (simplified)
import asyncio
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from bybit_client import BybitWebSocket

class ExecutionOperator:
    def __init__(self, encrypted_keys: bytes):
        # Keys never exist in plaintext at rest
        self._keys = self._decrypt_vault(encrypted_keys)
        self.ws = BybitWebSocket(self._keys)
        self.circuit_breaker = CircuitBreaker(threshold=3)

    async def execute_order(self, signal: TradingSignal):
        if self.circuit_breaker.is_open():
            return OrderResult.BLOCKED

        async with self.ws.connection() as conn:
            order = await conn.place_order(
                symbol=signal.symbol,
                side=signal.direction,
                qty=signal.position_size,
                reduce_only=signal.is_reduce
            )

        latency_ms = order.latency_microseconds / 1000
        await self._audit_log(order, latency_ms)
        return order

    def _decrypt_vault(self, ciphertext: bytes) -> APIKeys:
        # AES-256-GCM: authenticated encryption
        aesgcm = AESGCM(self._derive_key())
        plaintext = aesgcm.decrypt(ciphertext[:12], ciphertext[12:], None)
        return APIKeys.from_bytes(plaintext)`;

const secAutoCodeSnippet = `# Security Automation — Integrity Monitor (simplified)
import subprocess, hashlib, json
from pathlib import Path
from datetime import datetime

class SystemIntegrityMonitor:
    def __init__(self, watch_paths: list[str]):
        self.watch_paths = watch_paths
        self.baseline = self._build_baseline()

    def _build_baseline(self) -> dict:
        return {
            str(f): self._hash_file(f)
            for p in self.watch_paths
            for f in Path(p).rglob('*') if f.is_file()
        }

    def scan(self) -> list[dict]:
        findings = []
        for path, original_hash in self.baseline.items():
            current_hash = self._hash_file(Path(path))
            if current_hash != original_hash:
                findings.append({
                    "path": path, "severity": "HIGH",
                    "event": "FILE_MODIFIED",
                    "timestamp": datetime.utcnow().isoformat()
                })
        return findings

    def _hash_file(self, path: Path) -> str:
        return hashlib.sha256(path.read_bytes()).hexdigest()`;

const teoStarItems = [
  {
    id: 'S', label: 'Situation', color: 'text-slate-400',
    borderColor: 'border-slate-700/50', bgColor: 'bg-slate-800/20',
    content: `Cryptocurrency markets operate 24/7 with zero tolerance for execution latency. Manual trading exposes capital to timing failures, API credential vulnerabilities, and human reaction delays measured in seconds. Existing open-source bots offered no meaningful security guarantees — credentials were stored in plaintext config files.`,
  },
  {
    id: 'T', label: 'Task', color: 'text-cyan-400',
    borderColor: 'border-cyan-500/20', bgColor: 'bg-cyan-500/3',
    content: `Design and deploy a fully autonomous trading agent on Bybit with sub-100ms order execution, hardware-grade credential encryption, real-time risk controls, and 99%+ uptime on a hardened Linux VPS. Self-healing, audit-logged, and operationally independent after deployment.`,
  },
  {
    id: 'A', label: 'Action', color: 'text-orange-400',
    borderColor: 'border-orange-500/20', bgColor: 'bg-orange-500/3',
    content: `Built the execution engine in Python with async WebSocket connections for persistent low-latency order streams. Implemented AES-256-GCM authenticated encryption for all API key storage — keys decrypted in-memory only at runtime and zeroed post-use. Engineered a circuit-breaker state machine for position management with configurable risk parameters. Deployed on hardened Debian VPS with process isolation, fail2ban, UFW rules, and systemd watchdog for automatic recovery.`,
  },
  {
    id: 'R', label: 'Result', color: 'text-green-400',
    borderColor: 'border-green-500/20', bgColor: 'bg-green-500/3',
    content: `System exceeded all performance targets over 90 days of continuous operation. Zero unauthorized access events and zero API key exposure incidents. Circuit breaker prevented capital exposure on three detected anomalous market conditions.`,
  },
];

const teoMetrics = [
  { label: 'Avg Execution Latency', value: '47ms', target: '< 100ms', status: 'PASS' },
  { label: 'System Uptime', value: '99.94%', target: '≥ 99%', status: 'PASS' },
  { label: 'API Key Incidents', value: '0', target: '= 0', status: 'PASS' },
  { label: 'Unauthorized Access', value: '0', target: '= 0', status: 'PASS' },
  { label: 'Circuit Breaks Triggered', value: '3', target: 'auto', status: 'INFO' },
  { label: 'Operation Window', value: '90 days', target: 'continuous', status: 'PASS' },
];

const teoTags = ['Python 3.11', 'Bybit API v5', 'AES-256-GCM', 'asyncio', 'WebSocket', 'Systemd', 'Debian Linux', 'Circuit Breaker'];
const secAutoTags = ['Python 3.11', 'SHA-256', 'SAST Integration', 'GitHub Actions', 'Real-time Monitoring', 'Audit Logging'];

type ProjectTab = 'star' | 'code' | 'metrics';

function ProjectCard({
  title,
  subtitle,
  status,
  tags,
  starItems,
  metrics,
  codeSnippet,
  codeFile,
  securityNote,
}: {
  title: string;
  subtitle: string;
  status: string;
  tags: string[];
  starItems: typeof teoStarItems;
  metrics?: typeof teoMetrics;
  codeSnippet: string;
  codeFile: string;
  securityNote: string;
}) {
  const [activeTab, setActiveTab] = useState<ProjectTab>('star');

  const tabs: { id: ProjectTab; label: string }[] = [
    { id: 'star', label: 'Case Study' },
    { id: 'code', label: 'Architecture' },
    ...(metrics ? [{ id: 'metrics' as ProjectTab, label: 'Metrics' }] : []),
  ];

  return (
    <div className="card-border rounded-2xl overflow-hidden border border-cyan-500/15">
      {/* Header */}
      <div className="bg-[#0d1117] border-b border-cyan-500/10 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 status-dot"></div>
              <span className="font-mono text-xs text-slate-500 tracking-widest">{status}</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-100">{title}</h3>
              <p className="text-sm text-slate-500 mt-1 font-mono">{subtitle}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 md:max-w-sm">
            {tags.map((tag) => (
              <span key={tag} className="font-mono text-[11px] text-slate-400 bg-slate-800/60 border border-slate-700/50 px-2.5 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tab nav */}
      <div className="flex border-b border-cyan-500/10 bg-[#0d1117]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3.5 font-mono text-xs tracking-widest uppercase transition-all duration-200 border-b-2 ${
              activeTab === tab.id
                ? 'text-cyan-400 border-cyan-400 bg-cyan-500/5'
                : 'text-slate-600 border-transparent hover:text-slate-400 hover:bg-slate-800/30'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-6 md:p-8">
        {activeTab === 'star' && (
          <div className="space-y-4">
            {starItems.map((item) => (
              <div key={item.id} className={`rounded-xl border ${item.borderColor} ${item.bgColor} p-5 space-y-2`}>
                <div className="flex items-center gap-3">
                  <span className={`font-mono text-xs font-bold ${item.color} border border-current px-2 py-0.5 rounded`}>{item.id}</span>
                  <span className={`font-mono text-xs tracking-widest uppercase ${item.color}`}>{item.label}</span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed pl-10">{item.content}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'code' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
              <span className="text-orange-400">⬡</span>
              <span>Core architecture — simplified implementation</span>
            </div>
            <div className="relative rounded-xl overflow-hidden border border-slate-800">
              <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-slate-800">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60"></div>
                <span className="ml-3 font-mono text-xs text-slate-500">{codeFile}</span>
              </div>
              <pre className="p-5 text-xs text-slate-300 font-mono leading-relaxed overflow-x-auto bg-[#0d1117]">
                <code>{codeSnippet}</code>
              </pre>
            </div>
            <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/15 font-mono text-xs text-slate-400">
              <span className="text-green-400">Security note: </span>
              {securityNote}
            </div>
          </div>
        )}

        {activeTab === 'metrics' && metrics && (
          <div className="space-y-4">
            <div className="font-mono text-xs text-slate-500 mb-6">Performance data · 90-day continuous operation window</div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {metrics.map((m) => (
                <div key={m.label} className="p-4 rounded-xl border border-slate-800 bg-[#0d1117] space-y-2">
                  <p className="font-mono text-[10px] text-slate-600 tracking-widest uppercase">{m.label}</p>
                  <p className={`font-mono text-2xl font-bold ${m.status === 'PASS' ? 'text-green-400' : 'text-cyan-400'}`}>{m.value}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-slate-600">Target: {m.target}</span>
                    <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded border ${
                      m.status === 'PASS'
                        ? 'text-green-400 border-green-500/30 bg-green-500/5'
                        : 'text-cyan-400 border-cyan-500/30 bg-cyan-500/5'
                    }`}>{m.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const secAutoStarItems = [
  {
    id: 'S', label: 'Situation', color: 'text-slate-400',
    borderColor: 'border-slate-700/50', bgColor: 'bg-slate-800/20',
    content: `Production systems lack real-time awareness of unauthorized file modifications, configuration drift, and integrity violations. Traditional log review is reactive — by the time an analyst investigates, persistence mechanisms may already be established.`,
  },
  {
    id: 'T', label: 'Task', color: 'text-cyan-400',
    borderColor: 'border-cyan-500/20', bgColor: 'bg-cyan-500/3',
    content: `Build a Python-based security automation framework that provides real-time system integrity monitoring, automated vulnerability scanning integration, and a SAST/DAST pipeline for CI/CD workflows — reducing mean time to detection (MTTD) below 60 seconds.`,
  },
  {
    id: 'A', label: 'Action', color: 'text-orange-400',
    borderColor: 'border-orange-500/20', bgColor: 'bg-orange-500/3',
    content: `Implemented SHA-256 baseline hashing for watched file paths with inotify-based real-time change detection. Integrated automated OWASP ZAP scans triggered on deployment events. Built a structured audit log pipeline with severity classification and alerting. Embedded SAST scanning (Semgrep OWASP ruleset) as a GitHub Actions gate.`,
  },
  {
    id: 'R', label: 'Result', color: 'text-green-400',
    borderColor: 'border-green-500/20', bgColor: 'bg-green-500/3',
    content: `MTTD for file integrity violations reduced to under 30 seconds. SAST pipeline caught 3 injection-class findings pre-production that would have reached the main branch. Zero post-deployment security regressions since framework adoption.`,
  },
];

export default function FeaturedSystems() {
  return (
    <section id="systems" className="relative py-32 px-6 bg-[#0a0e18]">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-16 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-orange-500/50"></div>
            <span className="font-mono text-xs text-orange-400 tracking-widest uppercase">Featured Systems</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100">Production-Grade Deployments</h2>
          <p className="text-slate-500 text-sm max-w-2xl font-mono">
            Case studies written with metrics, not marketing. Each system was designed, deployed, and monitored in production.
          </p>
        </div>

        <div className="space-y-8">
          {/* TEO */}
          <ProjectCard
            title="TEO"
            subtitle="The Execution Operator — Autonomous trading agent · Bybit · Python · AES-256"
            status="ACTIVE DEPLOYMENT"
            tags={teoTags}
            starItems={teoStarItems}
            metrics={teoMetrics}
            codeSnippet={teoCodeSnippet}
            codeFile="teo/core/execution_operator.py"
            securityNote="AES-256-GCM provides both confidentiality (encryption) and integrity (authentication tag). The 12-byte nonce is prepended to ciphertext. Keys are derived via PBKDF2-HMAC-SHA256 with a per-deployment salt."
          />

          {/* Security Automation */}
          <ProjectCard
            title="Security Automation Framework"
            subtitle="Real-time integrity monitoring · SAST/DAST pipeline · Python · GitHub Actions"
            status="ACTIVE — CELESTIAL CURRENT SOLUTIONS"
            tags={secAutoTags}
            starItems={secAutoStarItems}
            codeSnippet={secAutoCodeSnippet}
            codeFile="sec_automation/monitor/integrity.py"
            securityNote="SHA-256 baseline hashing provides tamper-evident file tracking. Each scan compares the current digest against an immutable baseline stored outside the monitored path. Findings are structured as JSON for SIEM ingestion."
          />
        </div>

        <div className="mt-6 p-5 rounded-xl border border-dashed border-slate-800 flex items-center justify-between">
          <div className="font-mono text-xs text-slate-600">
            <span className="text-slate-700">{'// '}</span>
            Additional systems in active development — ETA: classified
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700 status-dot"></span>
            BUILDING
          </div>
        </div>
      </div>
    </section>
  );
}
