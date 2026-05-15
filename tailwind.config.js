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
      // ─── Custom max-width breakpoints ───────────────────────────────────
      // These were EMPTY before, which is why every mq450:/mq800:/mq1125:/mq1350:
      // class in page.tsx was silently ignored on all screen sizes.
      screens: {
        mq1350: { max: "1350px" },
        mq1125: { max: "1125px" },
        mq800:  { max: "800px"  },
        mq450:  { max: "450px"  },
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};