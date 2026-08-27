/* TopBar — the sticky wordmark. Deliberately bare: the design gives it no
   glass and no background, so it reads as part of the starfield until the
   page scrolls a card under it. */
(function () {
  const motion = window.Motion.motion;

  function TopBar() {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 py-4 flex items-center">
          <motion.a
            href="#hero"
            initial={{ filter: "blur(10px)", opacity: 0, y: -12 }}
            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="pointer-events-auto font-heading italic text-ink-primary text-2xl md:text-[30px] leading-[30px] tracking-[-0.75px]"
          >
            ckly.design
          </motion.a>
        </div>
      </header>
    );
  }

  window.TopBar = TopBar;
})();
