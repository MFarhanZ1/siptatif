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
        'poppins': ['Poppins', 'sans-serif'],
        'poppins-semibold': ['Poppins-semibold', 'sans-serif']
        
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

