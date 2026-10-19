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
        foundation: {
          bg: 'var(--color-bg)',
          surface: 'var(--color-surface)',
          text: 'var(--color-text)',
          muted: 'var(--color-muted)',
          primary: 'var(--color-primary)',
          primaryHover: 'var(--color-primary-hover)',
          onPrimary: 'var(--color-on-primary)',
          accent: 'var(--color-accent)',
          border: 'var(--color-border)',
          warn: 'var(--color-warn)',
          warnBg: 'var(--color-warn-bg)',
          cardBg: 'var(--color-card-bg)',
        }
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      screens: {
        'xs': '475px',
      }
    },
  },
  plugins: [],
}
