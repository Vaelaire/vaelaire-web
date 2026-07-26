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
        // Vaelaire Brand Colors
        midnight: "#0B1320",
        champagne: "#D6B98C",
        ivory: "#F6F2EA",
        stone: "#B7B0A5",
        sage: "#66756B",
        charcoal: "#25282D",
        // Semantic aliases
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        editorial: ["var(--font-eb-garamond)", "Georgia", "serif"],
        functional: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Editorial scale
        "display-xl": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-lg": ["3.5rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "display-md": ["2.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "display-sm": ["2rem", { lineHeight: "1.25", letterSpacing: "-0.01em" }],
        // Body scale
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
        "body-md": ["1rem", { lineHeight: "1.7" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
        // UI scale
        "ui-lg": ["1rem", { lineHeight: "1.5", letterSpacing: "0.01em" }],
        "ui-md": ["0.875rem", { lineHeight: "1.5", letterSpacing: "0.01em" }],
        "ui-sm": ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.02em" }],
      },
      spacing: {
        // Custom spacing scale
        "section": "6rem",
        "section-sm": "4rem",
        "section-lg": "8rem",
      },
      maxWidth: {
        "content": "1200px",
        "content-narrow": "800px",
        "content-wide": "1400px",
      },
      borderRadius: {
        "vaelaire": "2px",
      },
      transitionTimingFunction: {
        "vaelaire": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "scale-in": "scaleIn 0.4s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
