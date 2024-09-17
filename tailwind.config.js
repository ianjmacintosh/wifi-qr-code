/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      industrial:
        "Bahnschrift, 'DIN\\ Alternate', 'Franklin\\ Gothic\\ Medium', 'Nimbus\\ Sans\\ Narrow', sans-serif-condensed, sans-serif",
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
