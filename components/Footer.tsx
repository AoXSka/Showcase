export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800/60 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded border border-cyan-500/40 flex items-center justify-center">
                <span className="font-mono text-xs font-semibold text-cyan-400">AX</span>
              </div>
              <span className="font-mono text-sm text-slate-400">
                aoxska<span className="text-cyan-500">.dev</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 font-mono leading-relaxed">
              Reliable Systems Architect.<br />
              Venezuela — distributed infrastructure.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <p className="font-mono text-[11px] text-slate-600 tracking-widest uppercase">Navigate</p>
            <div className="space-y-2">
              {[
                ['Architecture', '#architecture'],
                ['Featured Systems', '#systems'],
                ['The Vault', '#vault'],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  className="block font-mono text-xs text-slate-500 hover:text-cyan-400 transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <p className="font-mono text-[11px] text-slate-600 tracking-widest uppercase">Contact</p>
            <div className="space-y-2">
              <a
                href="mailto:contact@aoxska.dev"
                className="block font-mono text-xs text-slate-500 hover:text-cyan-400 transition-colors"
              >
                contact@aoxska.dev
              </a>
              <a
                href="https://github.com/aoxska"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-mono text-xs text-slate-500 hover:text-cyan-400 transition-colors"
              >
                github.com/aoxska
              </a>
            </div>
          </div>
        </div>

        <div className="section-divider mb-6"></div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-mono text-[11px] text-slate-700">
            © {year} AoXSka. MIT License. Build with Next.js + Tailwind CSS.
          </p>
          <div className="flex items-center gap-4 font-mono text-[11px] text-slate-700">
            <span>CSP · HSTS · AES-256</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-green-500 status-dot"></span>
              Secure connection
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
