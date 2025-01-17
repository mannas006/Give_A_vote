/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',  // Enable class-based dark mode
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
      darkBg: "#1F2937",       // Dark background
      darkCard: "#374151",     // Dark card background
      darkText: "#D1D5DB",     // Light text in dark mode
      highlight: "#FBBF24",    // Yellow highlight
    },
  },
  },
  plugins: [],
};