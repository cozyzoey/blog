const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
    `./src/templates/**/*.{js,jsx,ts,tsx}`,
    `./public/**/*.{html,js}`,
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Gothic A1", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
