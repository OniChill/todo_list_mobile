/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {colors: {
      primary: "#2c2d32",
      secondary: "#40454b",
      success: "#39c36d",
      hoverSuccess: "#60cf8a",
      danger: "#be3b3a",
      hoverDanger: "#cb6261",
      submit: "#5441d1",
      hoverSubmit: "#7667da",
  },},
  },
  plugins: [],
}

