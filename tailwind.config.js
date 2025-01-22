/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'cta': 'url(./src/assets/images/cta.jpg)'
      },
      animation: {
        "rotate-fade": "rotateFade 1.5s ease-in-out",
      },
      keyframes: {
        rotateFade: {
          "0%": { opacity: 0, transform: "rotate(-10deg) scale(1.1)" },
          "100%": { opacity: 1, transform: "rotate(0deg) scale(1)" },
        },
      },
    },
  },
  plugins: [],
}