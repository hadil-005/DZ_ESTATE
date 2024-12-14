/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: "#0067FF",
        yellowColor: "#FEB60D",
        purpleColor: "#9771FF",
        irisBlueColor: "#01B5C5",
        headingColor: "#181A1E",
        textColor: "#4E545F",
        customBlue: "#5784BA",
        whi: "#F7F7F7",
        blu: "#9AC8EB",
        colorOne: "#aeabab",
        colorTwo: "#f2f2f2",
        colorThree: "#aaa",
        calendarBody: "#414141",
        ColorFour: "#6332c5",
        colorFive: "#e4e1e1",
      },
      margin: {
        20: "50px", // 13 * 0.25rem = 3.25rem
      },
    },
    boxShadow: {
      panelShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;",
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      x: "35px 15px 45px 0px #00000017",
    },
  },
  plugins: [],
  colors: {},
};
