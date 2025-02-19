/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-color": "#1e6593",
        "orange-color": "#fa8232",
      },
      boxShadow: {
        inputShadow: "rgba(0, 0, 0, 0.11) 0px 0px 0px 4px",
      },
      screens: {
        sm: "400px",
        md:"768px",
        lg:"1024px",
        xl:"1280px",
        "2xl":"1536px"
      },
    },
  },
  plugins: [],
};
