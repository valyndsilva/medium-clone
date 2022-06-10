module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        medium: '#FEC016',
      },

      gridColumn: {
        'span-16': 'span 16 / span 16',
      },
    },
  },
  plugins: [],
};
