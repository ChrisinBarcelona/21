/* Motion — the shared entrance animation, and the reduced-motion
   preference that governs it.

   Framer Motion drives these from JS with inline styles, so a CSS
   `prefers-reduced-motion` block cannot reach them. Components read the
   preference through this hook instead. Reduced motion keeps the reveal
   but drops the travel and the blur: content still arrives, it just
   doesn't move. */
(function () {
  const { useSyncExternalStore } = React;
  const QUERY = "(prefers-reduced-motion: reduce)";

  const supportsMatchMedia = () =>
    typeof window !== "undefined" && typeof window.matchMedia === "function";

  const subscribe = (onChange) => {
    if (!supportsMatchMedia()) return () => {};
    const query = window.matchMedia(QUERY);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  };
  const getSnapshot = () => supportsMatchMedia() && window.matchMedia(QUERY).matches;

  /* The page is pre-rendered at build time, where there is no preference
     to read, so the markup is always the full-motion version. Hydration
     has to match that markup: the server snapshot keeps the first client
     render at `false`, and React re-renders with the real preference
     straight after. */
  const getServerSnapshot = () => false;

  function useReducedMotion() {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  }

  const RISE = { filter: "blur(10px)", opacity: 0, y: 20 };
  const SETTLE = { filter: "blur(0px)", opacity: 1, y: 0 };
  const VIEWPORT = { once: true, amount: 0.2 };

  /* Spread onto a motion element that should reveal on mount.

     The start and end states are the same with or without reduced motion;
     only the timing differs. That keeps the pre-rendered markup correct
     for everyone, and the preference can arrive after hydration without
     changing where an element starts. Under reduced motion the travel and
     blur jump while the element is still invisible, so what the reader
     sees is the fade alone. */
  function reveal(reduced, delay = 0) {
    return {
      initial: RISE,
      animate: SETTLE,
      transition: reduced
        ? { duration: 0.2, ease: "easeOut", filter: { duration: 0 }, y: { duration: 0 } }
        : { duration: 0.8, delay, ease: "easeOut" }
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
