/* TopBar — the sticky wordmark. Deliberately bare: the design gives it no
   glass and no background, so it reads as part of the starfield until the
   page scrolls a card under it. */
(function () {
  function TopBar() {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16 py-4 flex items-center">
          {/* Enters from CSS, with the rest of the first screen — see
              "Entrance" in system.css. */}
          <a
            href="#hero"
            style={{ animationDelay: "0.2s" }}
            className="entrance entrance-drop on-video pointer-events-auto font-heading italic text-ink-primary text-2xl md:text-[1.875rem] leading-[1.875rem] tracking-[-0.046875rem]"
          >
            chriskelly.it
          </a>
        </div>
      </header>
    );
  }

  window.TopBar = TopBar;
})();
