/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          50: '#EFF4FF',
          100: '#DBE6FE',
          400: '#5B8DF6',
          500: '#2563EB',
          600: '#1D4FC4',
          700: '#173E99',
        },
        secondary: {
          DEFAULT: '#0F172A',
          50: '#1B2537',
          100: '#141D2E',
        },
        accent: {
          DEFAULT: '#38BDF8',
          400: '#38BDF8',
          500: '#0EA5E9',
        },
        surface: {
          0: '#060B16',
          1: '#0B1220',
          2: '#111A2C',
          3: '#182338',
        },
        ink: {
          0: '#F5F8FF',
          1: '#C7D2E4',
          2: '#8B99B6',
          3: '#5A6785',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'grid-fade': 'linear-gradient(180deg, rgba(37,99,235,0.08) 0%, rgba(6,11,22,0) 60%)',
        'hero-glow': 'radial-gradient(60% 50% at 50% 0%, rgba(56,189,248,0.18) 0%, rgba(6,11,22,0) 70%)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(56,189,248,0.15)',
        'glow-primary': '0 0 40px rgba(37,99,235,0.25)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        blink: 'blink 1s steps(2, start) infinite',
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
      },
    },
  },
  plugins: [],
}
