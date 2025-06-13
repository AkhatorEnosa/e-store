/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}", // Adjust based on your project structure
  ],
  theme: {
    extend: {
      screens: {
        'xs': '200px',
        'sm': '430px',  // Extra small devices
      },
      colors: {
        // Primary Color Palette (Blue for trust and brand consistency)
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb', // Main primary color (#1e40af used as base inspiration)
          700: '#1e40af',
          800: '#1e3a8a',
          900: '#1e2a7a',
        },
        // Secondary Color Palette (Green for balance and approachability)
        secondary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981', // Main secondary color
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        // Accent Color Palette (Red #fe4343 for CTAs and highlights)
        accent: {
          50: '#fff1f1',
          100: '#ffe3e3',
          200: '#ffcccc',
          300: '#ffa8a8',
          400: '#ff7f7f',
          500: '#fe4343', // Main accent color
          600: '#e52222',
          700: '#c21818',
          800: '#a11212',
          900: '#881212',
        },
      },
    },
  },
  plugins: [],
};