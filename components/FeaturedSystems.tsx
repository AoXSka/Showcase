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

const starItems = [
  {
    id: 'S',
    label: 'Situation',
    color: 'text-slate-400',
    borderColor: 'border-slate-700/50',
    bgColor: 'bg-slate-800/20',
    content: `Cryptocurrency markets operate 24/7 with zero tolerance for execution latency. Manual trading exposes capital to timing failures, API credential vulnerabilities, and human reaction delays measured in seconds. Existing open-source bots offered no meaningful security guarantees for API key management—credentials were stored in plaintext config files.`,
  },
  {
    id: 'T',
    label: 'Task',
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/20',
    bgColor: 'bg-cyan-500/3',
    content: `Design and deploy a fully autonomous trading agent on Bybit with sub-100ms order execution, hardware-grade credential encryption, real-time risk controls, and 99%+ uptime on a hardened Linux VPS. The system had to be self-healing, audit-logged, and operationally independent—zero manual intervention after deployment.`,
  },
  {
    id: 'A',
    label: 'Action',
    color: 'text-orange-400',
    borderColor: 'border-orange-500/20',
    bgColor: 'bg-orange-500/3',
    content: `Built the execution engine in Python with async WebSocket connections for persistent low-latency order streams. Implemented AES-256-GCM authenticated encryption for all API key storage—keys are decrypted in-memory only at runtime and immediately zeroed post-use. Engineered a state machine for position lifecycle management with configurable risk parameters, automatic circuit breakers on consecutive failures, and a structured audit trail. Deployed on a hardened Debian VPS with process isolation, fail2ban, UFW firewall rules, and systemd watchdog for automatic recovery.`,
  },
  {
    id: 'R',
    label: 'Result',
    color: 'text-green-400',
    borderColor: 'border-green-500/20',
    bgColor: 'bg-green-500/3',
    content: `System exceeded all performance targets over a 90-day continuous operation window. Zero unauthorized access events and zero API key exposure incidents. Circuit breaker prevented capital loss on three detected anomalous market conditions. The encryption architecture set the baseline for all subsequent projects in this portfolio.`,
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

const tags = ['Python 3.11', 'Bybit API v5', 'AES-256-GCM', 'asyncio', 'WebSocket', 'Systemd', 'Debian Linux', 'Circuit Breaker'];

export default function FeaturedSystems() {
  const [activeTab, setActiveTab] = useState<'star' | 'code' | 'metrics'>('star');

  return (
    <section id="systems" className="relative py-32 px-6 bg-[#0a0e18]">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-16 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-orange-500/50"></div>
            <span className="font-mono text-xs text-orange-400 tracking-widest uppercase">
              Featured Systems
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100">
            Production-Grade Deployments
          </h2>
          <p className="text-slate-500 text-sm max-w-2xl font-mono">
            Case studies written with metrics, not marketing. Each system was designed, deployed, and monitored in production.
          </p>
        </div>

        {/* TEO Project card */}
        <div className="card-border rounded-2xl overflow-hidden border border-cyan-500/15">
          {/* Project header */}
          <div className="bg-[#0d1117] border-b border-cyan-500/10 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 status-dot"></div>
                  <span className="font-mono text-xs text-slate-500 tracking-widest">ACTIVE DEPLOYMENT</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-100">
                    TEO{' '}
                    <span className="text-slate-500 font-mono text-base font-normal">
                      — The Execution Operator
                    </span>
                  </h3>
                  <p className="text-sm text-slate-500 mt-1 font-mono">
                    Autonomous trading agent · Bybit · Python · AES-256
                  </p>
                </div>
              </div>

              {/* Tag cloud */}
              <div className="flex flex-wrap gap-2 md:max-w-sm">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[11px] text-slate-400 bg-slate-800/60 border border-slate-700/50 px-2.5 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Tab nav */}
          <div className="flex border-b border-cyan-500/10 bg-[#0d1117]">
            {(['star', 'code', 'metrics'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3.5 font-mono text-xs tracking-widest uppercase transition-all duration-200 border-b-2 ${
                  activeTab === tab
                    ? 'text-cyan-400 border-cyan-400 bg-cyan-500/5'
                    : 'text-slate-600 border-transparent hover:text-slate-400 hover:bg-slate-800/30'
                }`}
              >
                {tab === 'star' ? 'Case Study' : tab === 'code' ? 'Architecture' : 'Metrics'}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-6 md:p-8">
            {/* STAR case study */}
            {activeTab === 'star' && (
              <div className="space-y-4">
                {starItems.map((item) => (
                  <div
                    key={item.id}
                    className={`rounded-xl border ${item.borderColor} ${item.bgColor} p-5 space-y-2`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-xs font-bold ${item.color} border border-current px-2 py-0.5 rounded`}>
                        {item.id}
                      </span>
                      <span className={`font-mono text-xs tracking-widest uppercase ${item.color}`}>
                        {item.label}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed pl-10">{item.content}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Code view */}
            {activeTab === 'code' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
                  <span className="text-orange-400">⬡</span>
                  <span>Execution engine — simplified core architecture</span>
                </div>
                <div className="relative rounded-xl overflow-hidden border border-slate-800">
                  <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-slate-800">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/60"></div>
                    <span className="ml-3 font-mono text-xs text-slate-500">teo/core/execution_operator.py</span>
                  </div>
                  <pre className="p-5 text-xs text-slate-300 font-mono leading-relaxed overflow-x-auto bg-[#0d1117]">
                    <code>{teoCodeSnippet}</code>
                  </pre>
                </div>
                <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/15 font-mono text-xs text-slate-400 space-y-1">
                  <p>
                    <span className="text-green-400">Security note: </span>
                    AES-256-GCM provides both confidentiality (encryption) and integrity (authentication tag).
                    The 12-byte nonce is prepended to ciphertext. Keys are derived via PBKDF2-HMAC-SHA256.
                  </p>
                </div>
              </div>
            )}

            {/* Metrics view */}
            {activeTab === 'metrics' && (
              <div className="space-y-4">
                <div className="font-mono text-xs text-slate-500 mb-6">
                  Performance data · 90-day continuous operation window
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {teoMetrics.map((m) => (
                    <div
                      key={m.label}
                      className="p-4 rounded-xl border border-slate-800 bg-[#0d1117] space-y-2"
                    >
                      <p className="font-mono text-[10px] text-slate-600 tracking-widest uppercase">{m.label}</p>
                      <p className={`font-mono text-2xl font-bold ${
                        m.status === 'PASS' ? 'text-green-400' : 'text-cyan-400'
                      }`}>
                        {m.value}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] text-slate-600">Target: {m.target}</span>
                        <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded border ${
                          m.status === 'PASS'
                            ? 'text-green-400 border-green-500/30 bg-green-500/5'
                            : 'text-cyan-400 border-cyan-500/30 bg-cyan-500/5'
                        }`}>
                          {m.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* "More coming soon" placeholder */}
        <div className="mt-6 p-5 rounded-xl border border-dashed border-slate-800 flex items-center justify-between">
          <div className="font-mono text-xs text-slate-600">
            <span className="text-slate-700">// </span>
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
