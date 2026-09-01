import type { Config } from "tailwindcss";

// ProCabin's visual language is drawn from modern vehicle interiors:
// graphite surfaces, warm upholstery neutrals, muted ambient light and
// restrained metallic details. CSS variables keep the same palette usable
// from Tailwind utilities and the small amount of handcrafted global CSS.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "rgb(var(--color-ivory) / <alpha-value>)",
        cabin: "rgb(var(--color-cabin) / <alpha-value>)",
        graphite: {
          DEFAULT: "rgb(var(--color-graphite) / <alpha-value>)",
          soft: "rgb(var(--color-graphite-soft) / <alpha-value>)",
        },
        plum: {
          DEFAULT: "rgb(var(--color-plum) / <alpha-value>)",
          dark: "rgb(var(--color-plum-dark) / <alpha-value>)",
          light: "rgb(var(--color-plum-light) / <alpha-value>)",
        },
        lavender: "rgb(var(--color-lavender) / <alpha-value>)",
        mist: "rgb(var(--color-mist) / <alpha-value>)",
        metal: "rgb(var(--color-metal) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",

        // Compatibility aliases for commerce and policy components that are
        // outside the Phase 1 redesign surface. They inherit ProCabin colors
        // now and can be renamed incrementally without visual drift.
        paper: "rgb(var(--color-ivory) / <alpha-value>)",
        ink: "rgb(var(--color-cabin) / <alpha-value>)",
        "ink-soft": "rgb(var(--color-graphite-soft) / <alpha-value>)",
        forest: {
          DEFAULT: "rgb(var(--color-plum) / <alpha-value>)",
          dark: "rgb(var(--color-plum-dark) / <alpha-value>)",
          light: "rgb(var(--color-plum-light) / <alpha-value>)",
        },
        sand: {
          DEFAULT: "rgb(var(--color-mist) / <alpha-value>)",
          dark: "rgb(var(--color-lavender) / <alpha-value>)",
        },
        clay: {
          DEFAULT: "#825B69",
          dark: "#684451",
        },
        gold: "#9B9187",
      },
      fontFamily: {
        display: ["var(--font-manrope)", "system-ui", "sans-serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        card: "18px",
        pill: "999px",
      },
      boxShadow: {
        soft: "0 22px 55px -34px rgba(20, 18, 24, 0.42)",
        lift: "0 12px 30px -20px rgba(20, 18, 24, 0.48)",
        cabin: "0 34px 80px -38px rgba(10, 8, 13, 0.72)",
      },
      maxWidth: {
        container: "1200px",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        rise: "rise 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
