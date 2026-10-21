/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: { 50: "#fff7ed", 100: "#ffedd5", 400: "#fb923c", 500: "#f97316", 600: "#ea580c", 700: "#c2410c" }
      },
      boxShadow: { soft: "0 12px 35px rgba(15, 23, 42, 0.08)" }
    },
  },
  plugins: [],
};
