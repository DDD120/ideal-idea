/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./assets/**/*.{js,ts,jsx,tsx, cursor}",
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
      cursor: {
        canvas: "url(../assets/canvas.cur) 8 8, pointer",
      },
    },
  },
  plugins: [],
};
