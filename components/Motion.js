/* Motion — the shared entrance animation, and the reduced-motion
   preference that governs it.

   Framer Motion drives these from JS with inline styles, so a CSS
   `prefers-reduced-motion` block cannot reach them. Components read the
   preference through this hook instead. Reduced motion keeps the reveal
   but drops the travel and the blur: content still arrives, it just
   doesn't move. */
(function () {
  const { useEffect, useState } = React;
  const QUERY = "(prefers-reduced-motion: reduce)";

  const supportsMatchMedia = () => typeof window.matchMedia === "function";

  function useReducedMotion() {
    const [reduced, setReduced] = useState(
      () => supportsMatchMedia() && window.matchMedia(QUERY).matches
    );

    useEffect(() => {
      if (!supportsMatchMedia()) return;
      const query = window.matchMedia(QUERY);
      const onChange = () => setReduced(query.matches);
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    }, []);

    return reduced;
  }

  const RISE = { filter: "blur(10px)", opacity: 0, y: 20 };
  const SETTLE = { filter: "blur(0px)", opacity: 1, y: 0 };
  const VIEWPORT = { once: true, amount: 0.2 };

  /* Spread onto a motion element that should reveal on mount. */
  function reveal(reduced, delay = 0) {
    return {
      initial: reduced ? { opacity: 0 } : RISE,
      animate: reduced ? { opacity: 1 } : SETTLE,
      transition: {
        duration: reduced ? 0.2 : 0.8,
        delay: reduced ? 0 : delay,
        ease: "easeOut"
      }
    };
  }

  /* Same, but held until the element scrolls into view. */
  function revealOnScroll(reduced, delay = 0) {
    const { initial, animate, transition } = reveal(reduced, delay);
    return { initial, whileInView: animate, viewport: VIEWPORT, transition };
  }

  window.useReducedMotion = useReducedMotion;
  window.reveal = reveal;
  window.revealOnScroll = revealOnScroll;
})();
