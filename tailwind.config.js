/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
    flowbite.content(),
  ],
  theme: {
    screens: {
      sm: "576px",
      // => @media (min-width: 576px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1200px",
      // => @media (min-width: 1200px) { ... }

      xl: "1440px",
      // => @media (min-width: 1440px) { ... }

      "2xl": "1920px",
      // => @media (min-width: 1920px) { ... }
    },
    extend: {
      colors: {
        bg: "#f6f6f6",
        black: "#000",
        white: "#FFF",
        
        primary: "#6806b0",
        textColor: "#e5e5e5",
        cardColor: "#FFC197",
        cardBg: "#380c41",
        bodyBg: "#0e0828",

        grey: "#fbfbfb",
        grey100: "#f2f2f2",
        grey150: "#edeff0",
        grey200: "#e8e8e8",
        grey300: "#f7f8f8",
        royalBlue: "#004cb5",
        successGreen: "#4cc800",
        SecondaryOrange50: "#FFF4E8",
        SecondaryOrange200: "#FFE9C0",
        SecondaryOrange900: "#D96800",
        SecondaryRed50: "#FEE4E8",
        SecondaryRed200: "#F08F8F",
        SecondaryRed900: "#9E000D",
        pressedMenuItem: "#e4f3fe",
        primaryAdditional100: "#BEE2FD",
        primarySupportBluePressed: "#023780",
        secondaryGreen50: "#F3FAE7",
        secondaryGreen100: "#E1F3C5",
        secondaryGreen900: "#0A6104",
        neutralsAdditional400: "#C6C6C6",
        neutralsAdditional500: "#A7A7A7",
        neutralsAdditional800: "#4A4A4A",
        neutralsProductInkNormal900: "#202020",
        neutralsProductInkNormal600: "#7E7E7E",
        ErrorBorder: "#DA0000",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
