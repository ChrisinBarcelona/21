/* BottomNav — the floating glass pill. Carries Glass/Strong rather than the
   subtle glass: it sits over the busiest part of the video, and the 50px blur
   is what keeps the labels readable.

   Active state is three reinforcing signals, never colour alone: the 10%
   selected surface, a full-white icon, and the label stepping up from
   Label/XS (11/regular) to Label/SM (12/medium). The selected surface is a
   shared `layoutId`, so it slides between items as you scroll.

   Everything that scales with the pill — its padding, the gaps, the icon
   box, the label type, the glass hairline and the track width — is declared
   in `system.css` under `.bottom-nav`, driven off one `--nav-scale`. The
   pill is drawn at the design's size on a phone and at 85% of it from `md`
   up, which is the whole of "smaller on desktop". The classes left here are
   the ones that do not scale: layout, radius, colour and motion. */
(function () {
  const { useEffect, useState } = React;
  const motion = window.Motion.motion;
  const useReducedMotion = window.useReducedMotion;
  const reveal = window.reveal;

  /* The home page's destinations. Other pages pass their own — the case
     study passes its chapters — so there is one nav implementation. */
  const HOME_ITEMS = [
    { id: "hero", label: "Home", Icon: window.Home },
    { id: "websites", label: "Websites", Icon: window.Globe },
    { id: "visual-design", label: "Visual Design", Icon: window.Palette },
    { id: "case-studies", label: "Case Studies", Icon: window.Flask },
    { id: "learn-to-design", label: "Teaching", Icon: window.GraduationCap },
    { id: "skills", label: "Skills", Icon: window.Dribbble },
    { id: "contact", label: "Contact", Icon: window.ArrowUpRight }
  ];

  function BottomNav({ items = HOME_ITEMS, label = "Sections" }) {
    const [active, setActive] = useState(items[0] && items[0].id);
    const reduced = useReducedMotion();

    /* Read here, not inside the map: each item destructures its own
       `label`, which would shadow this one and hand every item a
       different layoutId — the selection would stop sliding. */
    const selectedLayoutId = "nav-selected-" + label;

    /* Four destinations get the design's exact 97.5px each. Past four the
       labels are longer than the pattern was drawn for (a chapter is a
       "Retrospective", a section is a "Case Studies"), so each gets more
       room. Handed to CSS rather than set as a width, because the track is
       the last thing that has to come down with `--nav-scale`. */
    const compact = items.length > 4;
    const maxWidth = items.length * (compact ? 7.5 : 6.09375) + "rem";

    useEffect(() => {
      const sections = items.map((item) => document.getElementById(item.id)).filter(Boolean);
      if (!sections.length) return;

      /* Whichever section is crossing the middle 10% band of the viewport
         owns the active state. */
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(entry.target.id);
          });
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
      );

      sections.forEach((section) => observer.observe(section));
      return () => observer.disconnect();
    }, [items]);

    return (
      <nav
        className="bottom-nav fixed bottom-8 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
        aria-label={label}
        style={{ "--nav-track": maxWidth }}
      >
        <motion.ul
          {...reveal(reduced, 1.2)}
          className="bottom-nav-pill liquid-glass-strong rounded-full flex items-center w-full pointer-events-auto list-none m-0"
        >
          {items.map(({ id, label, Icon }) => {
            const isActive = active === id;
            return (
              <li key={id} className="relative flex-1 min-w-0">
                <a
                  href={"#" + id}
                  aria-label={label}
                  aria-current={isActive ? "true" : undefined}
                  className="bottom-nav-item relative flex flex-col items-center justify-center rounded-full"
                >
                  {isActive && (
                    <motion.span
                      layoutId={selectedLayoutId}
                      className="absolute inset-0 rounded-full"
                      style={{ background: "var(--color-bg-glass-selected)" }}
                      transition={
                        reduced
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 32 }
                      }
                    />
                  )}
                  <Icon
                    className={
                      "bottom-nav-icon relative shrink-0 transition-colors duration-300 " +
                      (isActive ? "text-ink-primary" : "text-ink-secondary")
                    }
                  />
                  <span
                    aria-hidden="true"
                    className={
                      "bottom-nav-label relative font-body whitespace-nowrap transition-colors duration-300 " +
                      (compact ? "hidden sm:block " : "") +
                      (isActive
                        ? "bottom-nav-label-active font-medium text-ink-primary"
                        : "font-normal text-ink-tertiary")
                    }
                  >
                    {label}
                  </span>
                </a>
              </li>
            );
          })}
        </motion.ul>
      </nav>
    );
  }

  window.BottomNav = BottomNav;
})();
