'use client';

import { useEffect, useState } from 'react';

// Elements where right-click blocking is skipped (usability)
const ALLOWED_TAGS = ['A', 'INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'];

export default function SecurityProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState(false);

  useEffect(() => {
    // ── Console security message ─────────────────────────────────────────
    // Shown to developers who open DevTools — a professional signal
    const styles = {
      title:  'color:#22d3ee;font-size:14px;font-weight:bold;font-family:monospace',
      body:   'color:#94a3b8;font-size:11px;font-family:monospace',
      warn:   'color:#f87171;font-size:11px;font-weight:bold;font-family:monospace',
      green:  'color:#4ade80;font-size:11px;font-family:monospace',
    };

    console.log('%c╔══════════════════════════════════════════════╗', styles.title);
    console.log('%c║        david-system.lat  ·  SECURITY ON      ║', styles.title);
    console.log('%c╚══════════════════════════════════════════════╝', styles.title);
    console.log('%c  Built by David Castillo — Celestial Current Solutions', styles.body);
    console.log('%c  Full-Stack · DevOps · Security-First Engineer', styles.body);
    console.log(' ');
    console.log('%c⚠  STOP — Authorized personnel only', styles.warn);
    console.log('%c  Scraping, automated access, and content theft are logged.', styles.body);
    console.log('%c  Interested in working together?', styles.body);
    console.log('%c  → david.j.castillo.g97@gmail.com', styles.green);
    console.log('%c  → linkedin.com/in/david-castillo-b87626163', styles.green);
    console.log(' ');

    // ── Right-click: block on non-interactive elements ───────────────────
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const tag = target.tagName;
      const isInteractive = ALLOWED_TAGS.includes(tag) || target.closest('a, button, input');

      if (!isInteractive) {
        e.preventDefault();
        showToast();
      }
    };

    // ── Keyboard shortcuts: deter view-source and devtools ───────────────
    const handleKeyDown = (e: KeyboardEvent) => {
      const ctrl = e.ctrlKey || e.metaKey;

      // F12 — DevTools
      if (e.key === 'F12') {
        e.preventDefault();
        return;
      }

      // Ctrl+Shift+I / Ctrl+Shift+J — DevTools panels
      if (ctrl && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j')) {
        e.preventDefault();
        return;
      }

      // Ctrl+U — View Source
      if (ctrl && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
        return;
      }

      // Ctrl+S — Save Page
      if (ctrl && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        return;
      }

      // Ctrl+Shift+C — Inspect Element (Chrome)
      if (ctrl && e.shiftKey && (e.key === 'C' || e.key === 'c')) {
        e.preventDefault();
      }
    };

    // ── Drag: block dragging of all elements ─────────────────────────────
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'IMG' || target.tagName === 'A') {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  const showToast = () => {
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  };

  return (
    <>
      {children}

      {/* Right-click toast notification */}
      <div
        className={`fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-4 py-3 rounded-lg border border-cyan-500/30 bg-[#0d1117]/95 backdrop-blur-md font-mono text-xs text-slate-300 shadow-lg transition-all duration-300 ${
          toast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
        role="status"
        aria-live="polite"
      >
        <span className="text-cyan-400">◉</span>
        <span>
          Content protected &nbsp;·&nbsp;
          <a
            href="mailto:david.j.castillo.g97@gmail.com"
            className="text-cyan-400 hover:underline"
          >
            Contact for inquiries
          </a>
        </span>
      </div>
    </>
  );
}
