# Portfolio — Systems Engineering Showcase

![Build Status](https://img.shields.io/github/actions/workflow/status/aoxska/showcase/deploy.yml?style=flat-square&label=CI%2FCD&color=22d3ee)
![License](https://img.shields.io/github/license/aoxska/showcase?style=flat-square&color=4ade80)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)
![Security Headers](https://img.shields.io/badge/Security_Headers-A%2B-22d3ee?style=flat-square)

> Personal portfolio engineered as a production-grade system — not a template.<br>
> Built with Next.js 14, TypeScript, and Tailwind CSS. Containerized, hardened, and CI/CD-automated.

---

## Architecture Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Framework | Next.js 14 (App Router) | Static generation, built-in security headers, Edge-compatible |
| Styling | Tailwind CSS | Utility-first, zero runtime overhead, consistent design tokens |
| Language | TypeScript (strict) | Type safety eliminates a class of runtime errors at compile time |
| Deployment | GitHub + Cloudflare Edge | Global CDN, automatic HTTPS, zero-downtime deploys |
| Container | Docker multi-stage build | Minimal runtime image, non-root user, dumb-init signal handling |
| CI/CD | GitHub Actions | Security audit → lint → build → deploy pipeline on every push to `main` |

---

## Security Features

This repository is itself a security demonstration:

- **Content Security Policy (CSP)** — Enforced via `next.config.js`. Restricts script sources, frame ancestors, and object sources.
- **HSTS** — `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- **Anti-clickjacking** — `X-Frame-Options: SAMEORIGIN`
- **MIME sniffing prevention** — `X-Content-Type-Options: nosniff`
- **Referrer control** — `Referrer-Policy: strict-origin-when-cross-origin`
- **No secrets in source** — All credentials loaded via environment variables. `.env.example` provided; `.env.local` gitignored.
- **Dependency scanning** — Dependabot configured for weekly npm and GitHub Actions audits.
- **Secret scanning** — TruffleHog runs on every pull request to detect leaked credentials.
- **npm audit gate** — CI pipeline fails on `HIGH` or `CRITICAL` vulnerabilities before build.
- **Non-root Docker user** — Container runs as UID 1001, not root.
- **No `poweredByHeader`** — `X-Powered-By: Next.js` removed to reduce fingerprinting surface.

---

## Stack

```
Frontend    Next.js 14 · React 18 · TypeScript 5
Styling     Tailwind CSS 3 · JetBrains Mono (typography)
Build       npm · Next.js compiler (SWC)
Container   Docker 20+ · multi-stage · Alpine Linux
CI/CD       GitHub Actions · Vercel deployment
Security    CSP · HSTS · TruffleHog · Dependabot · npm audit
```

---

## Running Locally

### Prerequisites

- Node.js 20+
- npm 10+
- Docker (optional, for container mode)

### Standard development server

```bash
git clone https://github.com/aoxska/showcase.git
cd showcase

# Copy environment template
cp .env.example .env.local
# Edit .env.local with your values

npm install
npm run dev
# → http://localhost:3000
```

### Docker (containerized)

```bash
# Build the production image (multi-stage)
docker build -t portfolio:latest .

# Run the container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SITE_URL=http://localhost:3000 \
  portfolio:latest
```

### Type check & lint

```bash
npx tsc --noEmit
npm run lint
```

---

## Project Structure

```
├── .github/
│   ├── workflows/
│   │   └── deploy.yml          # CI: audit → lint → build → Vercel deploy
│   └── dependabot.yml          # Automated dependency + Actions updates
│
├── app/
│   ├── layout.tsx              # Root layout: metadata, fonts, body
│   ├── page.tsx                # Page composition
│   └── globals.css             # Tailwind base + custom animations
│
├── components/
│   ├── Navigation.tsx          # Sticky nav with scroll-aware background
│   ├── Hero.tsx                # Headline + animated terminal + metrics
│   ├── SystemArchitecture.tsx  # Three-layer skill matrix with progress bars
│   ├── FeaturedSystems.tsx     # TEO case study (STAR) + code + metrics tabs
│   ├── TheVault.tsx            # Cybersecurity capabilities (expandable)
│   └── Footer.tsx
│
├── .env.example                # Environment variable template (no secrets)
├── .dockerignore
├── Dockerfile                  # Multi-stage production container
├── next.config.js              # Security headers + Next.js config
├── tailwind.config.ts          # Custom design tokens
└── tsconfig.json               # Strict TypeScript config
```

---

## CI/CD Pipeline

```
push to main
     │
     ├── security-audit    npm audit (HIGH/CRITICAL = fail) + TruffleHog secret scan
     ├── quality           ESLint + TypeScript strict check
     ├── build             Next.js static export → ./out/
     └── deploy            GitHub Pages (main branch only, no external tokens needed)
```

Only one optional GitHub secret:

```
NEXT_PUBLIC_SITE_URL    # Your production domain, e.g. https://yourdomain.com
```

GitHub Pages permissions are granted via the workflow's `permissions` block — no third-party tokens required.

---


```
NEXT_PUBLIC_SITE_URL = https://yourdomain.com
```

---

## Featured Project: TEO

**The Execution Operator** — autonomous trading agent for Bybit (Python).

- Execution latency: avg **47ms** (target: < 100ms)
- Credential security: **AES-256-GCM** — keys never plaintext at rest
- Uptime: **99.94%** over 90-day continuous operation
- Fault tolerance: circuit breaker prevents capital exposure on API anomalies

Full STAR case study available in the portfolio under **Featured Systems**.

---

## License

MIT — see [LICENSE](./LICENSE).

*Built by [AoXSka](https://github.com/aoxska) — Reliable Systems Architect.*
