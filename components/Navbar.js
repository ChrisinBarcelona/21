/* Navbar — floating glass pill: mark on the left, nav + CTA in the centre,
   a matching invisible spacer on the right so the pill stays optically centred. */
(function () {
  const ArrowUpRight = window.ArrowUpRight;

  const LINKS = ["Home", "Voyages", "Worlds", "Innovation", "Plan Launch"];

  function Navbar() {
    return (
      <nav className="fixed top-4 left-0 right-0 z-50 px-8 lg:px-16">
        <div className="flex items-center justify-between">
          <a
            href="#"
            className="liquid-glass rounded-full flex items-center justify-center shrink-0"
            style={{ width: 48, height: 48 }}
            aria-label="Aeon home"
          >
            <span className="font-heading italic text-white text-2xl leading-none lowercase">a</span>
          </a>

          <div className="hidden lg:flex items-center liquid-glass rounded-full px-1.5 py-1.5">
            {LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="px-3 py-2 text-sm font-medium text-white/90 font-body"
              >
                {link}
              </a>
            ))}
            <a
              href="#"
              className="ml-1 flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-black font-body whitespace-nowrap"
            >
              Claim a Spot
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="shrink-0 invisible" style={{ width: 48, height: 48 }} aria-hidden="true" />
        </div>
      </nav>
    );
  }

  window.Navbar = Navbar;
})();
