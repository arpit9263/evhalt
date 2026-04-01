/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'ev-black':  '#0A0B0A',
        'ev-card':   '#111412',
        'ev-card2':  '#161A14',
        'ev-card3':  '#1C211A',
        'ev-mid':    '#4A5445',
        'ev-muted':  '#7A8A72',
        'ev-light':  '#C8D4C0',
        'ev-white':  '#F2F5EE',
        'ev-lime':   '#C8FF00',
        'ev-lime2':  '#A8D400',
        'ev-yellow': '#F0FF00',
        'ev-green':  '#00FF87',
      },
      boxShadow: {
        'lime':    '0 0 30px rgba(200,255,0,0.25), 0 0 60px rgba(200,255,0,0.10)',
        'lime-sm': '0 0 12px rgba(200,255,0,0.20)',
        'card':    '0 20px 60px rgba(0,0,0,0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        glowPulse: {
          '0%,100%': { boxShadow: '0 0 10px rgba(200,255,0,0.2)' },
          '50%':     { boxShadow: '0 0 30px rgba(200,255,0,0.5)' },
        },
      },
    },
  },
  plugins: [],
}
