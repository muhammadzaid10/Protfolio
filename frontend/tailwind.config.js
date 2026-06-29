/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#05060d',
          deep: '#02030a',
        },
        neon: {
          cyan: '#00e5ff',
          magenta: '#b829ff',
          pink: '#ff2e63',
          lime: '#b6ff3c',
        },
        ink: {
          DEFAULT: '#ececf5',
          muted: '#8a8aa8',
          dim: '#5a5a78',
        },
      },
      fontFamily: {
        display: ['Unbounded', 'system-ui', 'sans-serif'],
        body: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'grad-1': 'linear-gradient(135deg, #00e5ff 0%, #b829ff 100%)',
        'grad-2': 'linear-gradient(135deg, #ff2e63 0%, #b829ff 100%)',
        'grad-3': 'linear-gradient(135deg, #b6ff3c 0%, #00e5ff 100%)',
      },
      animation: {
        'blob-float': 'blobFloat 20s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'blink-caret': 'blinkCaret 0.8s steps(1) infinite',
        'fade-up': 'fadeUp 0.8s ease forwards',
        'gradient-shift': 'gradientShift 6s ease infinite',
      },
      keyframes: {
        blobFloat: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(80px, -60px) scale(1.1)' },
          '66%': { transform: 'translate(-60px, 80px) scale(0.9)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 229, 255, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 229, 255, 0.7)' },
        },
        blinkCaret: {
          '50%': { borderColor: 'transparent' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      boxShadow: {
        glow: '0 0 30px rgba(0, 229, 255, 0.35)',
        'glow-magenta': '0 0 30px rgba(184, 41, 255, 0.4)',
        'glow-pink': '0 0 30px rgba(255, 46, 99, 0.4)',
      },
    },
  },
  plugins: [],
}
