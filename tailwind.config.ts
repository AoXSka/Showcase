import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#030712',
        'bg-card': '#0d1117',
        'bg-surface': '#161b22',
        'border-subtle': '#21262d',
        'border-accent': 'rgba(34, 211, 238, 0.2)',
        'cyber-cyan': '#22d3ee',
        'cyber-green': '#4ade80',
        'cyber-orange': '#fb923c',
        'cyber-red': '#f87171',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'scan': 'scan 8s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'type-1': 'typing 0.5s steps(20) 0.5s forwards',
        'type-2': 'typing 0.8s steps(30) 1.5s forwards',
        'type-3': 'typing 0.6s steps(25) 2.8s forwards',
        'type-4': 'typing 1s steps(40) 4s forwards',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(34, 211, 238, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(34, 211, 238, 0.7), 0 0 40px rgba(34, 211, 238, 0.3)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        typing: {
          from: { width: '0' },
          to: { width: '100%' },
        },
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(34, 211, 238, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(34, 211, 238, 0.03) 1px, transparent 1px)`,
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
    },
  },
  plugins: [],
};

export default config;
