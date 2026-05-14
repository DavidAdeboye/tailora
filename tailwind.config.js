/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "foundation-secondary-light-active": "#fefcf9",
        "foundation-primary-normal": "#121212",
        "foundation-gray-darker": "#28292d",
        "foundation-secondary-normal": "#fdf6ec",
        "foundation-secondary-light": "#fffefd",
        "foundation-gray-dark": "#555960",
        "foundation-primary-light": "#e7e7e7",
        "foundation-secondary-dark": "#beb9b1",
      },
    },
    screens: {},
  },
  corePlugins: {
    preflight: false,
  },
};
