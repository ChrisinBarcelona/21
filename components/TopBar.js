/* TopBar — the sticky wordmark. Deliberately bare: the design gives it no
   glass and no background, so it reads as part of the starfield until the
   page scrolls a card under it. */
(function () {
  const motion = window.Motion.motion;
  const useReducedMotion = window.useReducedMotion;
  const reveal = window.reveal;

  function TopBar() {
    const reduced = useReducedMotion();
    const entrance = reveal(reduced, 0.2);

    return (
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16 py-4 flex items-center">
          <motion.a
            href="#hero"
            initial={reduced ? entrance.initial : { filter: "blur(10px)", opacity: 0, y: -12 }}
            animate={entrance.animate}
            transition={entrance.transition}
            className="on-video pointer-events-auto font-heading italic text-ink-primary text-2xl md:text-[1.875rem] leading-[1.875rem] tracking-[-0.046875rem]"
          >
            ckly.design
          </motion.a>
        </div>
      </header>
    );
  }

  window.TopBar = TopBar;
})();
