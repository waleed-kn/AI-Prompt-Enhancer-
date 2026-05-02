/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Outfit'", "'Inter'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        // Dark background scale
        night: {
          50:  "#eef0f7",
          100: "#d5d8ee",
          200: "#aab1de",
          300: "#808ace",
          400: "#5663be",
          500: "#3b47ae",
          600: "#2f398b",
          700: "#232b68",
          800: "#171d45",
          900: "#0e1130",
          950: "#080c20",
        },
        // Vivid purple-violet accent
        violet: {
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
        },
        // Cyan accent
        cyan: {
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
        },
        // Pink/rose highlight
        rose: {
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
        },
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(139,92,246,0.35) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 90% 80%, rgba(6,182,212,0.2) 0%, transparent 60%), linear-gradient(180deg, #080c20 0%, #0e1130 100%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
        "btn-gradient":
          "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)",
        "btn-gradient-hover":
          "linear-gradient(135deg, #7c3aed 0%, #0891b2 100%)",
        "text-gradient":
          "linear-gradient(135deg, #a78bfa 0%, #22d3ee 50%, #fb7185 100%)",
      },
      boxShadow: {
        "glow-violet": "0 0 40px rgba(139,92,246,0.35)",
        "glow-cyan":   "0 0 40px rgba(6,182,212,0.25)",
        "card":        "0 4px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
        "card-hover":  "0 8px 48px rgba(0,0,0,0.5), 0 0 60px rgba(139,92,246,0.15), inset 0 1px 0 rgba(255,255,255,0.10)",
        "btn":         "0 4px 24px rgba(139,92,246,0.45)",
        "btn-hover":   "0 8px 32px rgba(139,92,246,0.65)",
      },
      animation: {
        "gradient-shift":  "gradientShift 8s ease infinite",
        "fade-up":         "fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-in":         "fadeIn 0.4s ease forwards",
        "pulse-soft":      "pulseSoft 2.5s ease-in-out infinite",
        "shimmer":         "shimmer 2s linear infinite",
        "float":           "float 6s ease-in-out infinite",
        "spin-slow":       "spin 3s linear infinite",
        "glow-pulse":      "glowPulse 3s ease-in-out infinite",
        "border-spin":     "borderSpin 4s linear infinite",
        "slide-down":      "slideDown 0.5s cubic-bezier(0.16,1,0.3,1) forwards",
      },
      keyframes: {
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.5" },
        },
        shimmer: {
          from: { backgroundPosition: "-200% 0" },
          to:   { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%":      { opacity: "1",   transform: "scale(1.05)" },
        },
        borderSpin: {
          from: { "--angle": "0deg" },
          to:   { "--angle": "360deg" },
        },
        slideDown: {
          from: { opacity: "0", transform: "translateY(-10px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
