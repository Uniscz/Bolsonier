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
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        panel: "rgb(var(--panel) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        accent2: "rgb(var(--accent-2) / <alpha-value>)",
        success: "rgb(var(--success) / <alpha-value>)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Space Grotesk", "sans-serif"]
      },
      boxShadow: {
        panel: "0 0 0 1px rgba(255,255,255,0.05), 0 10px 30px rgba(0,0,0,0.28)",
        glow: "0 0 0 1px rgba(255,255,255,0.08), 0 18px 50px rgba(30,30,36,0.38)"
      },
      backgroundImage: {
        "studio-grid":
          "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
