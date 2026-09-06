/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#090a0f',
        'obsidian-light': '#0b0d14',
        'midnight-slate': '#11131f',
        'card-slate': '#0f111a',
        'card-border': '#1a1d2e',
        'electric-cyan': '#00f2fe',
        'groq-orange': '#f97316',
        'gemini-purple': '#7928ca',
        'indigo-deep': '#4338ca',
        'text-primary': '#f3f4f6',
        'text-secondary': '#9ca3af',
        'text-muted': '#6b7280',
        'success-green': '#22c55e',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Consolas', 'monospace'],
      },
      backgroundImage: {
        'dot-grid':
          'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
        'glow-cyan':
          'radial-gradient(ellipse at 50% 50%, rgba(0,242,254,0.15) 0%, transparent 70%)',
        'glow-purple':
          'radial-gradient(ellipse at 50% 50%, rgba(121,40,202,0.15) 0%, transparent 70%)',
        'gradient-hero':
          'linear-gradient(135deg, #090a0f 0%, #11131f 50%, #0f111a 100%)',
        'gradient-gemini':
          'linear-gradient(135deg, #7928ca, #4338ca)',
        'gradient-cyber':
          'linear-gradient(135deg, #00f2fe, #7928ca)',
      },
      backgroundSize: {
        'dot-lg': '32px 32px',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'cursor-blink': 'cursor-blink 1s step-end infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'cursor-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0,242,254,0.3)',
        'glow-purple': '0 0 20px rgba(121,40,202,0.3)',
        'glow-cyan-lg': '0 0 40px rgba(0,242,254,0.4)',
        'glow-purple-lg': '0 0 40px rgba(121,40,202,0.4)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
};
