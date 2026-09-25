/* BlurText — reveals a headline word by word, each word blurring in from
   below and overshooting slightly. Triggers once the element is 10% visible.

   Under reduced motion the split is skipped entirely: the headline renders
   as one run of text that simply fades in.

   `immediate` is for a headline on the first screen. It plays the same
   keyframes on page load from CSS (`.entrance-word` in system.css)
   instead of from Framer Motion, so the headline draws from the
   pre-rendered HTML without waiting for any JavaScript — it is what the
   visitor sees first, and what page-speed tools time. The stylesheet
   handles reduced motion for it, so the split stays: under reduced motion
   the words simply appear. */
(function () {
  const { useEffect, useRef, useState } = React;
  const motion = window.Motion.motion;
  const useReducedMotion = window.useReducedMotion;

  const FROM = { filter: "blur(10px)", opacity: 0, y: 50 };
  const STEPS = [
    { filter: "blur(5px)", opacity: 0.5, y: -5 },
    { filter: "blur(0px)", opacity: 1, y: 0 }
  ];
  const STEP_DURATION = 0.35;

  const KEYFRAMES = {
    filter: [FROM.filter, STEPS[0].filter, STEPS[1].filter],
    opacity: [FROM.opacity, STEPS[0].opacity, STEPS[1].opacity],
    y: [FROM.y, STEPS[0].y, STEPS[1].y]
  };

  /* `variant` names which element `ref` is on. The reduced-motion
     preference arrives just after hydration and swaps the split headline
     for a single run of text — a new element — so the observer has to
     move to it, or a headline not yet scrolled to would never appear. */
  function useInView(ref, variant) {
    const [inView, setInView] = useState(false);

    useEffect(() => {
      const el = ref.current;
      if (!el || inView) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setInView(true);
              observer.unobserve(el);
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(el);
      return () => observer.disconnect();
    }, [variant]);

    return inView;
  }

  function BlurText({ text = "", delay = 100, className = "", align = "center", as = "p", id, immediate = false }) {
    const ref = useRef(null);
    const reduced = useReducedMotion();
    const inView = useInView(ref, reduced);

    const layout = {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: align === "left" ? "flex-start" : "center",
      rowGap: "0.1em",
      /* A flex container swallows the whitespace between the word spans,
         so the gap has to be drawn explicitly. columnGap rather than a
         per-word margin: it only applies *between* words, so a centred
         line stays centred and the measure matches the design frame. */
      columnGap: "0.18em"
    };

    if (immediate) {
      return React.createElement(
        as,
        { id, className, style: layout },
        text.split(" ").map((word, i) => (
          <React.Fragment key={word + i}>
            {i > 0 ? " " : null}
            <span className="entrance-word" style={{ animationDelay: (i * delay) / 1000 + "s" }}>
              {word}
            </span>
          </React.Fragment>
        ))
      );
    }

    if (reduced) {
      return React.createElement(
        motion[as] || motion.p,
        {
          ref,
          id,
          className,
          initial: { opacity: 0 },
          animate: inView ? { opacity: 1 } : { opacity: 0 },
          transition: { duration: 0.3, ease: "easeOut" }
        },
        text
      );
    }

    return React.createElement(
      as,
      { ref, id, className, style: layout },
      text.split(" ").map((word, i) => (
        <React.Fragment key={word + i}>
          {/* A real space between the words, so the element's text content
              stays a readable sentence for screen readers and find-in-page.
              Flex drops a whitespace-only text node rather than laying it
              out, so columnGap still owns the visible spacing. */}
          {i > 0 ? " " : null}
          <motion.span
            initial={FROM}
            animate={inView ? KEYFRAMES : FROM}
            transition={{
              duration: STEP_DURATION * 2,
              times: [0, 0.5, 1],
              delay: (i * delay) / 1000,
              ease: "easeOut"
            }}
            style={{
              display: "inline-block",
              willChange: "transform, filter, opacity"
            }}
          >
            {word}
          </motion.span>
        </React.Fragment>
      ))
    );
  }

  window.BlurText = BlurText;
})();
