/* BlurText — reveals a headline word by word, each word blurring in from
   below and overshooting slightly. Triggers once the element is 10% visible. */
(function () {
  const { useEffect, useRef, useState } = React;
  const motion = window.Motion.motion;

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

  function BlurText({ text = "", delay = 100, className = "", align = "center", as = "p" }) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
      const el = ref.current;
      if (!el) return;

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
    }, []);

    const words = text.split(" ");

    return React.createElement(
      as,
      {
        ref,
        className,
        style: {
          display: "flex",
          flexWrap: "wrap",
          justifyContent: align === "left" ? "flex-start" : "center",
          rowGap: "0.1em",
          /* A flex container swallows the whitespace between the word spans,
             so the gap has to be drawn explicitly. columnGap rather than a
             per-word margin: it only applies *between* words, so a centred
             line stays centred and the measure matches the design frame. */
          columnGap: "0.18em"
        }
      },
      words.map((word, i) => (
        <motion.span
          key={word + i}
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
      ))
    );
  }

  window.BlurText = BlurText;
})();
