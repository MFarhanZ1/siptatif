/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  safelist: [
    'cursor-pointer',
    'cursor-not-allowed',
  ],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['poppins', 'sans-serif'],
        'poppins-semibold': ['poppins-semibold', 'sans-serif'],
        'ibm-plex-mono-medium': ['ibm-plex-mono-medium', 'sans-serif']        
      },
        spacing: {
          '786px': '786px',
          '277px': '277px',
        },
        keyframes: {
          marquee: {
            '0%': { transform: 'translateX(100%)' },
            '100%': { transform: 'translateX(-100%)' }
          }
        },
        animation: {
          marquee: 'marquee 28s linear infinite'
        }
      
    },
  },
  plugins: [],
}

