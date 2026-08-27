/* BottomNav — the floating glass pill. Carries Glass/Strong rather than the
   subtle glass: it sits over the busiest part of the video, and the 50px blur
   is what keeps the labels readable.

   Active state is three reinforcing signals, never colour alone: the 10%
   selected surface, a full-white icon, and the label stepping up from
   Label/XS (11/regular) to Label/SM (12/medium). The selected surface is a
   shared `layoutId`, so it slides between items as you scroll. */
(function () {
  const { useEffect, useState } = React;
  const motion = window.Motion.motion;
  const useReducedMotion = window.useReducedMotion;
  const reveal = window.reveal;

  const ITEMS = [
    { id: "hero", label: "Home", Icon: window.Home },
    { id: "projects", label: "Projects", Icon: window.Navigation },
    { id: "skills", label: "Skills", Icon: window.Star },
    { id: "contact", label: "Contact", Icon: window.ArrowUpRight }
  ];

  function BottomNav() {
    const [active, setActive] = useState("hero");
    const reduced = useReducedMotion();

    useEffect(() => {
      const sections = ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean);
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
    }, []);

    return (
      <nav
        className="fixed bottom-8 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
        aria-label="Sections"
      >
        <motion.ul
          {...reveal(reduced, 1.2)}
          className="liquid-glass-strong rounded-full flex items-center gap-0.5 p-2 w-full max-w-[24.375rem] pointer-events-auto list-none m-0"
        >
          {ITEMS.map(({ id, label, Icon }) => {
            const isActive = active === id;
            return (
              <li key={id} className="relative flex-1 min-w-0">
                <a
                  href={"#" + id}
                  aria-current={isActive ? "true" : undefined}
                  className="relative flex flex-col items-center justify-center gap-1.5 rounded-full px-2 sm:px-4 py-2"
                >
                  {isActive && (
                    <motion.span
                      layoutId="bottom-nav-selected"
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
                      "relative h-6 w-6 shrink-0 transition-colors duration-300 " +
                      (isActive ? "text-ink-primary" : "text-ink-secondary")
                    }
                  />
                  <span
                    className={
                      "relative font-body whitespace-nowrap transition-colors duration-300 " +
                      (isActive
                        ? "text-[0.75rem] leading-4 font-medium text-ink-primary"
                        : "text-[0.6875rem] leading-[0.875rem] font-normal text-ink-tertiary")
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
