module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['"Open Sans"', "sans-serif"],
    },
    extend: {
      colors: {
        brand: "#0088cc",
      },
      animation: {
        "spin-slow-once": "spin 2s linear forwards",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
