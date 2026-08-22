/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        agri: {
          50: '#f2f9f4',
          100: '#e1f2e6',
          200: '#c5e5ce',
          300: '#9ad2ab',
          400: '#67b781',
          500: '#419c5f',
          600: '#2f7e4a',
          700: '#27643d',
          800: '#225033',
          900: '#1d422c',
          950: '#0c2417',
        },
        dark: {
          bg: '#0F1713',
          card: '#16231D',
          elevated: '#1D2F27',
          border: '#273E34',
          text: '#E5EFEA',
          muted: '#8CA397'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 12px -2px rgba(0, 0, 0, 0.05)',
        'soft-lg': '0 8px 24px -4px rgba(0, 0, 0, 0.08)',
        'dark-soft': '0 4px 20px 0 rgba(0, 0, 0, 0.35)',
      }
    },
  },
  plugins: [],
};