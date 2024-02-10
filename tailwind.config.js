/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito Sans', 'sans - serif'],
      },
      colors: {
        'dark-blue': 'hsl(209, 23%, 22%)',
        'v-dark-blue': 'hsl(207, 26%, 17%)',
        't-dark-blue': 'hsl(200, 15%, 8%)',
        'dark-gray': 'hsl(0, 0%, 52%)',
        'light-gray': 'hsl(0, 0%, 98%)',
      },
    },
  },
  plugins: [],
};
