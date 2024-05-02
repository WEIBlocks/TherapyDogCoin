/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gap:{
        0.5: "0.5rem",
        0.75: "0.75rem",

        
        1: "1rem",
        1.5: "1.5rem",
        2: "2rem",
        3: "3rem",
        4: "4rem",
        5: "5rem",

      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["20px", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["4rem", { lineHeight: "1" }],
        "7xl": ["5rem", { lineHeight: "1" }],
        "8xl": ["6rem", { lineHeight: "1" }],
      },
      padding: {
        0.5: "5px",
        0.75: "8px",
        0.10: "10px",
        1: "12px",
        2: "16px",
        3: "20px",
        4: "24px",
        5: "28px",
      },
      colors: {
        
        "primary-transparent": "rgba(232, 108, 46, 0.7)",

        "primary": "#e86c2e",
        "dark-primary": "#608cf7",
        "light-primary": "#BCE1F3",
        "secondary":"#608cf7",
        "dark-secondary": "#FF0808",
        "light-secondary": "#FFB3B3",
      },
      boxShadow: {
        primary: "0 12px 24px 0 rgba(15,8,35,.3)",
      },
      backgroundImage: {
        "custom-gradiant":
          "linear-gradient(114deg, #608cf7, #B3DBED 55%, #FF0808 )",
          'hero-pattern': 'url("/src/assests/hero-bg.jpg")',
      },
    },
  },
  plugins: [],
};
