/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      Poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      screens: {
        mobileS: "320px",
        mobileM: "375px",
        mobileL: "425px",
      },
    },
  },
  plugins: [],
};
