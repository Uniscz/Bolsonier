import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        subtle: "rgb(var(--subtle) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        panel: "rgb(var(--panel) / <alpha-value>)",
        gold: "rgb(var(--gold) / <alpha-value>)",
        "gold-light": "rgb(var(--gold-light) / <alpha-value>)",
        "gold-dim": "rgb(var(--gold-dim) / <alpha-value>)",
        wine: "rgb(var(--wine) / <alpha-value>)",
        success: "rgb(var(--success) / <alpha-value>)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"]
      },
      boxShadow: {
        panel: "0 0 0 1px rgba(168,138,80,0.06), 0 8px 32px rgba(0,0,0,0.5)",
        glow: "0 0 0 1px rgba(168,138,80,0.1), 0 20px 60px rgba(0,0,0,0.6)"
      }
    }
  },
  plugins: []
};

export default config;
