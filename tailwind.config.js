/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#02010A',
        secondary: '#120F26',
        danger: '#ff5555',
        alert: '#DBF227',
        success: '#50fa7b',
        title: '#8625df',
        text: '#c392ef',
        coolgrey: '#8690B3',
        lavender: '#E6F0FF',
      },
      fontFamily: {
        default: ['Raleway', 'sans-serif'],
        code: 'Fira Code',
      },
      extend: {
        spacing: {
          'navbar-h': '3.25rem',
        },
      },
    },
  },
  plugins: [],
}

