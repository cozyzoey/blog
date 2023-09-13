/* eslint-disable */

const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`./src/**/*.{js,jsx,ts,tsx}`],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard Variable', ...defaultTheme.fontFamily.sans],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            ':not(pre) > code.language-text': {
              padding: '0.2em 0.4em !important',
              color: `${theme('colors.slate.700')} !important`,
              background: `${theme('colors.slate.100')} !important`,
            },
          },
        },
      }),
      screens: {
        print: { raw: 'print' },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
  darkMode: 'class',
}
