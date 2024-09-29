/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        raleway: ["Raleway-Regular", "sans-serif"],
        ralewayBold: ["Raleway-Bold", "sans-serif"],
        ralewayExtraBold: ["Raleway-ExtraBold", "sans-serif"],
        ralewayExtraLight: ["Raleway-ExtraLight", "sans-serif"],
        ralewayLight: ["Raleway-Light", "sans-serif"],
        ralewaySemiBold: ["Raleway-SemiBold", "sans-serif"],
        ralewayThin: ["Raleway-Thin", "sans-serif"],
      },
      colors: { 
        blueEPN: {
          100: "#E6EAF0",  
          200: "#B8C0D0",  
          300: "#8A97AF",  
          400: "#5C6E8F",  
          500: "#0F172A",  
          600: "#0F1A2C",  
          700: "#0C1523",  
          800: "#080F1A",  
          900: "#050B12",  
        },
        eOrange: {
          100: "#FFEDE6",  
          200: "#FFCEB8",  
          300: "#FFAF89",  
          400: "#FF905B",  
          500: "#FF5722",  
          600: "#E04B1B",  
          700: "#C04016",  
          800: "#A03411",  
          900: "#80280C",  
        },
        eBlue: {
          100: "#CCE0FF",  
          200: "#99C2FF",   
          300: "#66A3FF",   
          400: "#3385FF",   
          500: "#0059FF",   
          600: "#004ECC",   
          700: "#004299",   
          800: "#003666",  
          900: "#002933",
        },
        redEPN: {
          100: "#FDECEC",  
          200: "#F7AAAA",  
          300: "#F16969",  
          400: "#EB2828",  
          500: "#E11F1C",  
          600: "#B11A18", 
          700: "#821412", 
          800: "#520E0D",  
          900: "#220807",  
        },
        ePurple: {
          100: "#E5CCFF",  
          200: "#D1A6FF",  
          300: "#BD80FF",  
          400: "#A859FF",  
          500: "#9320FF",  
          600: "#7F00E6",  
          800: "#560099",  
          700: "#6B00BF",  
          900: "#420073",
        },
        darkGray: {
          100: "#F2F2F2",  
          200: "#D9D9D9",   
          300: "#BFBFBF",  
          400: "#A6A6A6",  
          500: "#1C1C1C",  
          600: "#171717",  
          700: "#121212",  
          800: "#0D0D0D",  
          900: "#080808",  
        },
        lightGreen: "#77FFaa"
      },
    },
  },
  plugins: [],
};
