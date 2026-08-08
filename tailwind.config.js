/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sarpam: {
          bg: '#09090B',
          surface: '#111113',
          surfaceHover: '#1A1A1D',
          primary: '#0F766E', // Emerald / Teal
          primaryLight: '#14B8A6',
          primaryDark: '#0D5C56',
          gold: '#D4AF37', // Accent Gold
          goldLight: '#F3E5AB',
          goldDark: '#997A15',
          text: '#F8FAFC',
          secondary: '#A1A1AA',
          muted: '#71717A',
          border: 'rgba(255,255,255,0.08)',
          borderHover: 'rgba(255,255,255,0.16)',
          success: '#10B981',
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'emerald-glow': '0 0 25px rgba(15, 118, 110, 0.25)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.20)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #997A15 100%)',
        'emerald-gradient': 'linear-gradient(135deg, #14B8A6 0%, #0F766E 50%, #0D5C56 100%)',
        'dark-radial': 'radial-gradient(circle at 50% 0%, rgba(15, 118, 110, 0.15) 0%, rgba(9, 9, 11, 0) 70%)',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 0.3, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.02)' },
        },
        'serpent-subtle': {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        }
      },
      animation: {
        'float': 'float-slow 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'serpent-draw': 'serpent-subtle 3s ease-out forwards',
      }
    },
  },
  plugins: [],
}
