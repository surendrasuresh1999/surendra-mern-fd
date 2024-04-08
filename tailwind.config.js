/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4774fc",
        subPrimary: "#6ca8d9",
        secondary: "#f7bc94",
        grayColor: "#b3b4b5",
        btnBgColor: "#F8F9F9",
        borderColor: "#DDDDDD",
      },
      fontSize: {
        "30size": "30px",
        "28size": "28px",
        "26size": "26px",
        "24size": "24px",
        "22size": "22px",
        "20size": "20px",
        "18size": "18px",
        "16size": "16px",
        "14size": "14px",
        "12size": "12px",
        "10size": "10px",
      },
      fontWeight: {
        700: 700,
        600: 600,
        500: 500,
        400: 400,
        300: 300,
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
