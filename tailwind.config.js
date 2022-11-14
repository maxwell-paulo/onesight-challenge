/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto Condensed", "sans-serif"],
      },
      colors: {
        grayrgba: "rgba(248, 248, 248, 0.904)",
      },
    },
  },
  plugins: [],
};
