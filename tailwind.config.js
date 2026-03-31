/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'ev-black':   '#080808',
        'ev-dark':    '#0f0f0f',
        'ev-dark2':   '#161616',
        'ev-dark3':   '#1e1e1e',
        'ev-grey':    '#2a2a2a',
        'ev-mid':     '#5a5a5a',
        'ev-muted':   '#8a8a8a',
        'ev-light':   '#c8c8c8',
        'ev-white':   '#f0efed',
        'ev-lime':    '#c8ff00',
        'ev-lime2':   '#a3cc00',
        'ev-green':   '#00ff87',
      },
      fontFamily: {
        display: ['"Cabinet Grotesk"', '"DM Sans"', 'sans-serif'],
        body:    ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'hero':  ['clamp(3.5rem,8vw,8rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'h1':    ['clamp(2.5rem,5vw,5rem)',  { lineHeight: '1.0',  letterSpacing: '-0.025em' }],
        'h2':    ['clamp(2rem,3.5vw,3.5rem)',{ lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'h3':    ['clamp(1.4rem,2.5vw,2rem)',{ lineHeight: '1.1',  letterSpacing: '-0.015em' }],
        'label': ['0.65rem',                 { lineHeight: '1',    letterSpacing: '0.2em' }],
      },
      backgroundImage: {
        'gradient-lime': 'linear-gradient(135deg, #c8ff00 0%, #00ff87 100%)',
        'gradient-dark': 'linear-gradient(180deg, #080808 0%, #0f0f0f 100%)',
      },
      animation: {
        'fade-up':     'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in':     'fadeIn 0.5s ease both',
        'slide-right': 'slideRight 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'pulse-slow':  'pulse 3s ease-in-out infinite',
        'spin-slow':   'spin 12s linear infinite',
        'marquee':     'marquee 30s linear infinite',
        'marquee2':    'marquee2 30s linear infinite',
      },
      keyframes: {
        fadeUp:   { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:   { from: { opacity: '0' }, to: { opacity: '1' } },
        slideRight: { from: { opacity: '0', transform: 'translateX(-24px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        marquee:  { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        marquee2: { from: { transform: 'translateX(50%)' }, to: { transform: 'translateX(0)' } },
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
