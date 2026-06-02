/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
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
    },
  },
  plugins: [],
}
