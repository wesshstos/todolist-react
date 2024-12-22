/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn : "fadeIn 0.3s ease-in-out",
        fadeOut: "fadeOut 0.3s ease-in-out",
      },
      keyframes: {
        fadeIn:{
          "0%" : {opacity : 0},
          "100%" : {opacity : 1}
        },
        fadeOut: {
          "0%" : {opacity: 1},
          "100%" : {opacity: 0}
        }
      }
    },
  },
  plugins: [],
}