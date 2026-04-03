/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        ink: { DEFAULT: '#0a0a0f', 50: '#f5f5ff', 100: '#e8e8ff', 900: '#0a0a0f' },
        acid: { DEFAULT: '#c8ff00', dim: '#9fcc00' },
        ember: { DEFAULT: '#ff4d00', dim: '#cc3d00' },
        slate: { DEFAULT: '#1a1a2e', light: '#252540', border: '#2a2a45' },
        mist: { DEFAULT: '#8888aa', light: '#aaaacc' },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-right': 'slideRight 0.5s ease forwards',
        'pulse-acid': 'pulseAcid 3s ease-in-out infinite',
        'ticker': 'ticker 30s linear infinite',
      },
      keyframes: {
        fadeUp: { from: { opacity: 0, transform: 'translateY(24px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideRight: { from: { opacity: 0, transform: 'translateX(-20px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
        pulseAcid: { '0%,100%': { boxShadow: '0 0 20px rgba(200,255,0,0.2)' }, '50%': { boxShadow: '0 0 40px rgba(200,255,0,0.4)' } },
        ticker: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#aaaacc',
            a: { color: '#c8ff00', '&:hover': { color: '#9fcc00' } },
            h1: { color: '#ffffff', fontFamily: 'Syne' },
            h2: { color: '#ffffff', fontFamily: 'Syne' },
            h3: { color: '#e0e0ff', fontFamily: 'Syne' },
            code: { color: '#c8ff00', background: '#1a1a2e', padding: '2px 6px', borderRadius: '4px' },
            pre: { background: '#0a0a0f', border: '1px solid #2a2a45' },
            blockquote: { borderLeftColor: '#c8ff00', color: '#8888aa' },
            strong: { color: '#ffffff' },
          },
        },
      },
    },
  },
  plugins: [],
}
