/* Icon set — lucide stroke icons at the sizes the design calls for.
   Each component file is wrapped in an IIFE and publishes onto `window`,
   the convention every component follows (see "One shared global scope"
   in the README). */
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

  function Star(props) {
    return (
      <Icon {...props}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </Icon>
    );
  }

  function Search(props) {
    return (
      <Icon {...props}>
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </Icon>
    );
  }

  function Target(props) {
    return (
      <Icon {...props}>
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </Icon>
    );
  }

  function Lightbulb(props) {
    return (
      <Icon {...props}>
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5A5.6 5.6 0 0 0 18 8a6 6 0 0 0-12 0c0 1 .2 2.2 1.5 3.5.7.8 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
      </Icon>
    );
  }

  function Layers(props) {
    return (
      <Icon {...props}>
        <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
        <path d="m6.08 10.37-3.48 1.58a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59" />
        <path d="m6.08 14.37-3.48 1.58a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59" />
      </Icon>
    );
  }

  function CircleCheck(props) {
    return (
      <Icon {...props}>
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </Icon>
    );
  }

  function ArrowRight(props) {
    return (
      <Icon {...props}>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </Icon>
    );
  }

  function ArrowDown(props) {
    return (
      <Icon {...props}>
        <path d="M12 5v14" />
        <path d="m19 12-7 7-7-7" />
      </Icon>
    );
  }

  function CaretLeft(props) {
    return (
      <Icon {...props}>
        <path d="m15 18-6-6 6-6" />
      </Icon>
    );
  }

  function CaretRight(props) {
    return (
      <Icon {...props}>
        <path d="m9 18 6-6-6-6" />
      </Icon>
    );
  }

  function X(props) {
    return (
      <Icon {...props}>
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </Icon>
    );
  }

  function Globe(props) {
    return (
      <Icon {...props}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </Icon>
    );
  }

  /* lucide's flask-conical. The line across the base is the liquid: it is
     what reads as an experiment rather than as a funnel. */
  function Flask(props) {
    return (
      <Icon {...props}>
        <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
        <path d="M8.5 2h7" />
        <path d="M7 16h10" />
      </Icon>
    );
  }

  function Dribbble(props) {
    return (
      <Icon {...props}>
        <circle cx="12" cy="12" r="10" />
        <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
        <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
        <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
      </Icon>
    );
  }

  /* lucide's graduation-cap. The bar beneath the cap is the tassel cord;
     read together they are the one shape people recognise on sight
     without a label. */
  function GraduationCap(props) {
    return (
      <Icon {...props}>
        <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
        <path d="M22 10v6" />
        <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
      </Icon>
    );
  }

  function Palette(props) {
    return (
      <Icon {...props}>
        <path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8Z" />
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      </Icon>
    );
  }

  window.ArrowUpRight = ArrowUpRight;
  window.Play = Play;
  window.Home = Home;
  window.Star = Star;
  window.Search = Search;
  window.Target = Target;
  window.Lightbulb = Lightbulb;
  window.Layers = Layers;
  window.CircleCheck = CircleCheck;
  window.ArrowRight = ArrowRight;
  window.ArrowDown = ArrowDown;
  window.CaretLeft = CaretLeft;
  window.CaretRight = CaretRight;
  window.X = X;
  window.Palette = Palette;
  window.Globe = Globe;
  window.Flask = Flask;
  window.Dribbble = Dribbble;
  window.GraduationCap = GraduationCap;
})();
