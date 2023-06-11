/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/views/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        custom: {
          white: {
            primary: '#FFFFFF',
            secondary: '#F7F7F7',
          },
          black: {
            primary: '#000000',
          },
          dark: {
            primary: '#101C3D',
            secondary: '#192B5E',
          },
          green: {
            primary: '#2EB086',
          },
          red: {
            primary: '#B8405E',
            secondary: '#D94C6F',
          },
          cream: {
            primary: '#EEE6CE',
            secondary: '#FAF2D9',
          },
          gray: {
            primary: '#B4B4B4',
          },
        },
      },
    },
  },
  plugins: [],
};
