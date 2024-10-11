/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          300: 'rgb(184 194 204)',
          400: 'rgb(135 149 161)',
          500: 'rgb(43 52 59)',
          600: 'rgb(61 72 82)',
          700: 'rgb(43 52 59)',
          800: 'rgb(34 41 47)',
          900: 'rgb(17 20 23)',
        },
      },
      textColor: {
        gray: {
          300: 'rgb(184 194 204)',
          400: 'rgb(135 149 161)',
          500: 'rgb(96 111 123)',
          600: 'rgb(61 72 82)',
          700: 'rgb(43 52 59)',
          800: 'rgb(34 41 47)',
          900: 'rgb(17 20 23)',
        },
      },
    },
  },
  plugins: [],
};
