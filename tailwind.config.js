/** @type {import('tailwindcss').Config} */
const { DESIGN_SYSTEM, generateDesignTokens } = require('./src/styles/design-system');

module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: DESIGN_SYSTEM.typography.fontFamily,
    fontSize: DESIGN_SYSTEM.typography.fontSize,
    fontWeight: DESIGN_SYSTEM.typography.fontWeight,
    lineHeight: DESIGN_SYSTEM.typography.lineHeight,
    extend: {
      animation: {
        marquee: "marquee var(--duration) infinite linear",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        "fade-in": "fadeIn 300ms ease-out",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      colors: {
        ...DESIGN_SYSTEM.colors,
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: DESIGN_SYSTEM.colors.background,
        foreground: DESIGN_SYSTEM.colors.text.dark,
        primary: {
          DEFAULT: DESIGN_SYSTEM.colors.primary[400],
          foreground: DESIGN_SYSTEM.colors.text.dark,
        },
        secondary: {
          DEFAULT: DESIGN_SYSTEM.colors.secondary[400],
          foreground: DESIGN_SYSTEM.colors.text.light,
        },
      },
      borderRadius: DESIGN_SYSTEM.borderRadius,
      boxShadow: DESIGN_SYSTEM.boxShadow,
      spacing: DESIGN_SYSTEM.spacing,
      transitionDuration: DESIGN_SYSTEM.transition.duration,
      transitionTimingFunction: DESIGN_SYSTEM.transition.easing,
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    function({ addBase }) {
      addBase({
        ':root': generateDesignTokens(),
      });
    },
  ],
};
