/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1C485F",
        subPrimary:"#D1DFE9",
        secondary:"#727272",
        titleBold:'#393939',
        grayColor:"#868686",
        btnBgColor:'#F8F9F9',
        borderColor:"#DDDDDD",
      },
      fontSize: {
        bigSize: "32px",
        secondaryBigSize: "28px",
        primarySize: "24px",
        subPrimary:"22px",
        secondarySize: "20px",
        tertiarySize: "18px",
        mediumSize: "16px",
        quarternarySize: "14px",
        smallSize: "12px",
        formTitleSize:'30px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

