'use client';

import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Architecture', href: '#architecture' },
  { label: 'Systems', href: '#systems' },
  { label: 'The Vault', href: '#vault' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#030712]/90 backdrop-blur-md border-b border-cyan-500/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo / identity */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded border border-cyan-500/40 flex items-center justify-center group-hover:border-cyan-400 group-hover:shadow-[0_0_12px_rgba(34,211,238,0.3)] transition-all duration-300">
            <span className="font-mono text-xs font-semibold text-cyan-400">DC</span>
          </div>
          <span className="font-mono text-sm text-slate-400 group-hover:text-slate-200 transition-colors">
            david-system<span className="text-cyan-500">.lat</span>
          </span>
        </a>

        {/* System status indicator */}
        <div className="hidden md:flex items-center gap-2 font-mono text-xs text-slate-500">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 status-dot"></span>
          <span>SYSTEM ONLINE</span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 font-mono text-xs text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/5 rounded transition-all duration-200 border border-transparent hover:border-cyan-500/20"
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:david.j.castillo.g97@gmail.com"
            className="ml-4 px-4 py-2 font-mono text-xs text-cyan-400 border border-cyan-500/40 rounded hover:bg-cyan-500/10 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-200"
          >
            Contact
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-cyan-400 transition-colors"
          aria-label="Toggle menu"
        >
          <div className="w-5 space-y-1.5">
            <span className={`block h-px bg-current transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block h-px bg-current transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-px bg-current transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0d1117]/95 backdrop-blur-md border-b border-cyan-500/10">
          <div className="px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 font-mono text-sm text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/5 rounded transition-all"
              >
                {link.label}
              </a>
            ))}
            <a
              href="mailto:david.j.castillo.g97@gmail.com"
              className="block mt-3 px-4 py-3 font-mono text-sm text-cyan-400 border border-cyan-500/30 rounded text-center hover:bg-cyan-500/10 transition-all"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
