/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mystic & Classic Palette matching main web app
        'votive-bg': 'hsl(var(--votive-bg) / <alpha-value>)',
        'votive-surface': 'hsl(var(--votive-surface) / <alpha-value>)',
        'votive-border': 'hsl(var(--votive-border) / <alpha-value>)',
        'votive-sand': 'hsl(var(--votive-sand) / <alpha-value>)',
        'votive-text': 'hsl(var(--votive-text) / <alpha-value>)',
        'votive-muted': 'hsl(var(--votive-muted) / <alpha-value>)',
        'votive-red': 'hsl(var(--votive-red) / <alpha-value>)',
        'votive-terra': 'hsl(var(--votive-terra) / <alpha-value>)',

        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
        gold: {
          50: '#fdf9ef',
          100: '#f9efd3',
          200: '#f2dca3',
          300: '#e8c46e',
          400: '#deb040',
          500: '#d9a030',
          600: '#c98a24',
          700: '#a76d20',
          800: '#87581f',
          900: '#6e491c',
          950: '#3f2509',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(161, 18, 17, 0.05)',
        'elevated': '0 20px 40px -15px rgba(50, 38, 31, 0.08)',
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
