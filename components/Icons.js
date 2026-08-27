/* Icon set — lucide stroke icons at the sizes the design calls for.
   Each component file is wrapped in an IIFE so top-level bindings don't
   collide in the shared global scope Babel-standalone scripts run in. */
(function () {
  /* Every icon is a 24x24 lucide glyph, strokeWidth 2, round caps. The
     rendered box is set by the caller via `className`, matching the
     size/icon/* tokens: 20px for CTAs, 24px for bottom-nav items. */
  function Icon({ className = "h-5 w-5", fill = "none", children }) {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill={fill}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {children}
      </svg>
    );
  }

  function ArrowUpRight(props) {
    return (
      <Icon {...props}>
        <path d="M7 17L17 7" />
        <path d="M7 7h10v10" />
      </Icon>
    );
  }

  function Play(props) {
    return (
      <Icon fill="currentColor" {...props}>
        <polygon points="6 4 20 12 6 20 6 4" />
      </Icon>
    );
  }

  function Home(props) {
    return (
      <Icon {...props}>
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <path d="M9 22V12h6v10" />
      </Icon>
    );
  }

  function Navigation(props) {
    return (
      <Icon {...props}>
        <polygon points="3 11 22 2 13 21 11 13 3 11" />
      </Icon>
    );
  }

  function Star(props) {
    return (
      <Icon {...props}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </Icon>
    );
  }

  window.ArrowUpRight = ArrowUpRight;
  window.Play = Play;
  window.Home = Home;
  window.Navigation = Navigation;
  window.Star = Star;
})();
