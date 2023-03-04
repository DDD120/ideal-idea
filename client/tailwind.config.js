/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: "#f76597",
        navy: {
          700: "#595B83",
          800: "#333456",
          900: "#060930",
        },
      },
      fontFamily: {
        "maple-light": ["NexonMaplestoryLight"],
      },
    },
  },
  plugins: [],
};
