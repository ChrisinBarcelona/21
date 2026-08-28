/* Tailwind Play CDN configuration. Loaded after the CDN script on every
   page, so the theme extension is identical across them. */
tailwind.config = {
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
         size. Scaled by the same 1.5 as everything else, otherwise a
         multi-column layout would engage before there is room for the
         larger type — 3 cards would fire at 1024px while each column is
         half again as wide as it used to be. */
      screens: {
        sm: "960px",
        md: "1152px",
        lg: "1536px",
        xl: "1920px",
        "2xl": "2304px"
      },
      borderRadius: {
        DEFAULT: "9999px"
      }
    }
  }
};
