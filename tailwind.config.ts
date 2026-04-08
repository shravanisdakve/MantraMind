import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#0F0F0F",
          secondary: "#1A1A1A",
        },
        primary: {
          DEFAULT: "#1E3A8A", // Calm / Wisdom
        },
        secondary: {
          DEFAULT: "#F59E0B", // Energy / Gita
        },
        accent: {
          DEFAULT: "#D4AF37", // Highlights / Premium Touch
        },
        text: {
          primary: "#F5F5F5",
          secondary: "#A1A1AA",
        },
        border: {
          DEFAULT: "#2A2A2A",
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        outfit: ['var(--font-outfit)', 'sans-serif'],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "draw-line": "draw-line 2s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "draw-line": {
          "0%": { strokeDasharray: "0 100" },
          "100%": { strokeDasharray: "100 100" },
        }
      },
    },
  },
  plugins: [],
};
export default config;
