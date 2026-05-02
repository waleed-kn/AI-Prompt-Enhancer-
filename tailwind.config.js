/** @type {import('tailwindcss').Config} */
module.exports = {
  // Tell Tailwind which files to scan for class names
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Custom font families loaded via globals.css
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      // Custom color palette for the app
      colors: {
        ink: {
          50: "#f5f3ef",
          100: "#e8e4dc",
          200: "#d0c9ba",
          300: "#b5aa93",
          400: "#9a8d73",
          500: "#857862",
          600: "#6e6252",
          700: "#574d41",
          800: "#3e3830",
          900: "#28241f",
          950: "#15120e",
        },
        ember: {
          400: "#f97c3c",
          500: "#f5631a",
          600: "#e04e0a",
        },
      },
      // Subtle animation for the gradient background
      animation: {
        "gradient-shift": "gradientShift 8s ease infinite",
        "fade-up": "fadeUp 0.5s ease forwards",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
      },
      keyframes: {
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
    },
  },
  plugins: [],
};
