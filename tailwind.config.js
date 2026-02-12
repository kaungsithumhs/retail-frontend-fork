/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  prefix: "rt-",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  plugins: [require("tailwindcss-animate")],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "20rem",
        sm: "2rem",
      },
      screens: {
        xs: "390px",
      },
    },
    extend: {
      fontFamily: {
        noto: ["var(--font-noto)", "system-ui", "sans-serif"],
        pyi: ["var(--font-pyidaungsu)", "system-ui", "sans-serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        xs: [
          "var(--text-11px)",
          {
            lineHeight: "var(--lh-11px)",
          },
        ],
        "11px": [
          "var(--text-11px)",
          {
            lineHeight: "var(--lh-11px)",
          },
        ],
        "12px": [
          "var(--text-12px)",
          {
            lineHeight: "var(--lh-12px)",
          },
        ],
        "13px": [
          "var(--text-13px)",
          {
            lineHeight: "var(--lh-13px)",
          },
        ],
        "14px": [
          "var(--text-14px)",
          {
            lineHeight: "var(--lh-14px)",
          },
        ],
        "15px": [
          "var(--text-15px)",
          {
            lineHeight: "var(--lh-15px)",
          },
        ],
        "16px": [
          "var(--text-16px)",
          {
            lineHeight: "var(--lh-16px)",
          },
        ],
        "17px": [
          "var(--text-17px)",
          {
            lineHeight: "var(--lh-17px)",
          },
        ],
        "21px": [
          "var(--text-21px)",
          {
            lineHeight: "var(--lh-21px)",
          },
        ],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
};
