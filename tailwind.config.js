module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
    extend: {
      colors: {
        brand: "#0088cc",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
