/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Sora", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        // Core surfaces / text — driven by CSS variables so light/dark
        // transitions are smooth and defined in one place (index.css).
        agri: {
          bg: "var(--color-bg)",
          surface: "var(--color-surface)",
          "surface-alt": "var(--color-surface-alt)",
          border: "var(--color-border)",
          text: "var(--color-text)",
          "text-muted": "var(--color-text-muted)",
          primary: "var(--color-primary)",
          "primary-dark": "var(--color-primary-dark)",
          "primary-light": "var(--color-primary-light)",
          "primary-soft": "var(--color-primary-soft)",
        },
        // Dashboard card accent families — each stays visually distinct
        // in both light and dark mode.
        soil: {
          bg: "var(--color-soil-bg)",
          accent: "var(--color-soil-accent)",
        },
        weather: {
          bg: "var(--color-weather-bg)",
          accent: "var(--color-weather-accent)",
        },
        best: {
          bg: "var(--color-best-bg)",
          accent: "var(--color-best-accent)",
        },
        worst: {
          bg: "var(--color-worst-bg)",
          accent: "var(--color-worst-accent)",
        },
      },
      borderRadius: {
        xl2: "1.25rem",
        card: "1rem",
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgb(0 0 0 / 0.04), 0 1px 3px 0 rgb(0 0 0 / 0.06)",
        card: "0 2px 8px -2px rgb(16 24 18 / 0.08), 0 1px 2px -1px rgb(16 24 18 / 0.04)",
        panel: "0 4px 24px -4px rgb(16 24 18 / 0.10)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "panel-in": {
          "0%": { opacity: "0", transform: "translateX(12px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.25s ease-out",
        "panel-in": "panel-in 0.2s ease-out",
        "pulse-soft": "pulse-soft 1.6s ease-in-out infinite",
      },
      transitionProperty: {
        theme: "background-color, border-color, color, box-shadow",
      },
    },
  },
  plugins: [],
};
