/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customCoral: '#FBE7E7',
        customBgGreen: '#286161',
        customFontGreen: "#006261",
        customLightGray: '#F2F5F5',
      },
    },
  },
  plugins: [],
};
