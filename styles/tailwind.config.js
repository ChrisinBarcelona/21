/* Tailwind configuration, read by `npm run build` (scripts/build.mjs),
   which compiles one static stylesheet shared by every page.

   `content` is every file a class name can be written in. Tailwind reads
   them as plain text and keeps only the utilities it finds, so a class
   has to appear whole somewhere in the source — `"text-" + size` would
   compile to nothing. */
module.exports = {
  content: ["./components/**/*.js", "./src/*.html"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["'Instrument Serif'", "serif"],
        body: ["'Barlow'", "sans-serif"]
      },
      colors: {
        /* color/text/* from the Figma variable set */
        ink: {
          primary: "#ffffff",
          secondary: "rgba(255, 255, 255, 0.9)",
          tertiary: "rgba(255, 255, 255, 0.8)"
        }
      },
      /* Breakpoints are viewport px and so do NOT follow the root font
         size. Scaled by the same 1.125 as everything else, otherwise a
         multi-column layout would engage before there is room for the
         larger type — 3 cards would fire at 1024px while each column is
         an eighth wider than it used to be. */
      screens: {
        sm: "720px",
        md: "864px",
        lg: "1152px",
        xl: "1440px",
        "2xl": "1728px"
      },
      borderRadius: {
        DEFAULT: "9999px"
      }
    }
  }
};
