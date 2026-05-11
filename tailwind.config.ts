import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0A0A0B",
          elevated: "#0E0E10",
          subtle: "#121215",
        },
        surface: {
          DEFAULT: "#15151A",
          raised: "#1C1C22",
          inset: "#0E0E10",
        },
        line: {
          DEFAULT: "#1F1F25",
          bright: "#2A2A32",
          dim: "#181820",
        },
        ink: {
          DEFAULT: "#F4F4F5",
          muted: "#A1A1AA",
          dim: "#71717A",
          subtle: "#52525B",
          faint: "#3F3F46",
        },
        pearl: {
          DEFAULT: "#E8E1D2",
          bright: "#F4EFE4",
          deep: "#C9C1AE",
        },
        glow: {
          violet: "rgba(132, 124, 220, 0.12)",
          blue: "rgba(124, 156, 220, 0.10)",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        "tight-2": "-0.02em",
        "tight-3": "-0.03em",
        "tight-4": "-0.04em",
      },
      backgroundImage: {
        "mesh-carbon":
          "radial-gradient(at 18% 12%, rgba(132,124,220,0.10), transparent 45%), radial-gradient(at 82% 78%, rgba(124,156,220,0.06), transparent 50%), radial-gradient(at 50% 50%, rgba(255,255,255,0.015), transparent 60%)",
        "pearl-gradient":
          "linear-gradient(180deg, #F4EFE4 0%, #E8E1D2 55%, #C9C1AE 100%)",
      },
      boxShadow: {
        elevated:
          "0 1px 0 0 rgba(255,255,255,0.05) inset, 0 0 0 1px rgba(255,255,255,0.04), 0 30px 60px -30px rgba(0,0,0,0.8)",
        "pearl-glow": "0 0 0 1px rgba(244,239,228,0.10), 0 20px 60px -20px rgba(244,239,228,0.18)",
        "card-inner": "inset 0 1px 0 0 rgba(255,255,255,0.04)",
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out",
        "fade-up": "fade-up 0.9s cubic-bezier(0.16,1,0.3,1) both",
        "fade-down": "fade-down 0.9s cubic-bezier(0.16,1,0.3,1) both",
        marquee: "marquee 28s linear infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
      },
      keyframes: {
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-down": {
          "0%": { opacity: "0", transform: "translateY(-24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-soft": {
          "0%,100%": { opacity: "0.45" },
          "50%": { opacity: "0.85" },
        },
      },
    },
  },
  plugins: [animate],
};

export default config;
