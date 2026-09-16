/* OakNationalAcademy — the Visual Design case study, shown as a modal.

   The card on the home page opens this rather than navigating, so the
   dialog owns the things a page would otherwise get for free: it locks
   the body behind it, takes focus on open, traps Tab inside itself,
   closes on Escape, and hands focus back to the card it came from.

   The deck of brand guidelines leads, before any of the artwork. The
   whole point of the work was adherence, so the reader needs the
   yardstick in hand before the assets are worth looking at. */
(function () {
  const { useCallback, useEffect, useRef } = React;
  const motion = window.Motion.motion;
  const GlassImage = window.GlassImage;
  const GuidelinesCarousel = window.GuidelinesCarousel;
  const Kicker = window.Kicker;
  const X = window.X;
  const ArrowDown = window.ArrowDown;
  const useReducedMotion = window.useReducedMotion;
  const revealOnScroll = window.revealOnScroll;

  const SHELL = "mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16";

  const META = [
    { value: "Visual Designer", label: "Role" },
    { value: "2 Weeks", label: "Timeline" },
    { value: "One", label: "Team" },
    { value: "Figma", label: "Platform" }
  ];

  const STORIES = [2, 3, 4, 5, 1].map((n) => ({
    src: "assets/oak/instagram-story-" + n + ".webp",
    alt: "Instagram story " + n + ": an Oak National Academy hackathon graphic in the vertical story format"
  }));

  const CAROUSEL_POSTS = [2, 3, 4, 1].map((n) => ({
    src: "assets/oak/instagram-post-" + n + ".webp",
    alt: "Instagram carousel slide " + n + ": a square Oak National Academy hackathon graphic"
  }));

  const SINGLE_POSTS = [5, 6].map((n) => ({
    src: "assets/oak/instagram-post-" + n + ".webp",
    alt: "Instagram single post " + (n - 4) + ": a square Oak National Academy hackathon graphic"
  }));

  const WIDE_BANNERS = [1, 2].map((n) => ({
    src: "assets/oak/event-tornado-banner-" + n + ".webp",
    alt: "Event Tornado banner " + n + ": an ultra-wide Oak National Academy hackathon header"
  }));

  const SOCIAL_BANNERS = [
    { src: "assets/oak/linkedin-post-1.webp", alt: "LinkedIn share card 1 for the Oak National Academy hackathon" },
    { src: "assets/oak/linkedin-post-2.webp", alt: "LinkedIn share card 2 for the Oak National Academy hackathon" },
    { src: "assets/oak/banner-blog-1.webp", alt: "Blog header banner 1 for the Oak National Academy hackathon" },
    { src: "assets/oak/banner-blog-2.webp", alt: "Blog header banner 2 for the Oak National Academy hackathon" }
  ];

  const DIRECT_MAIL = [1, 2, 3].map((n) => ({
    src: "assets/oak/direct-mail-" + n + ".webp",
    alt: "Email circulator " + n + ": a long-form Oak National Academy hackathon mailer"
  }));

  /* A gallery tile. The artwork sets its own shape — a story is 9:16, a
     post is square, a banner is 8:3 — so the tile takes the ratio rather
     than a height, and nothing is ever cropped. */
  function Tile({ src, alt, ratio, className = "" }) {
    return (
      <div
        className={"liquid-glass glass-lift p-4 sm:p-5 " + className}
        style={{ borderRadius: "var(--radius-lg)" }}
      >
        <GlassImage src={src} alt={alt} className="h-auto" ratio={ratio} />
      </div>
    );
  }

  function Section({ id, kicker, title, children }) {
    const reduced = useReducedMotion();
    return (
      <section id={id} aria-labelledby={id + "-heading"} className={"py-14 " + SHELL}>
        <motion.div {...revealOnScroll(reduced)} className="flex flex-col gap-4">
          {kicker && (
            <Kicker className="font-body text-sm leading-[1.1875rem] text-ink-tertiary">
              {kicker}
            </Kicker>
          )}
          <h2
            id={id + "-heading"}
            className="font-heading italic text-ink-primary text-4xl md:text-5xl lg:text-[3.75rem] leading-[0.9] tracking-[-0.125rem] lg:tracking-[-0.1875rem]"
          >
            {title}
          </h2>
        </motion.div>

        <motion.div {...revealOnScroll(reduced, 0.15)} className="mt-[3.375rem]">
          {children}
        </motion.div>
      </section>
    );
  }

  function Hero() {
    const reduced = useReducedMotion();
    return (
      <header
        className={"flex flex-col justify-center gap-6 pt-20 pb-16 sm:pt-24 " + SHELL}
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 55%, rgba(255,255,255,0) 100%)"
        }}
      >
        <motion.div {...revealOnScroll(reduced)}>
          <Kicker className="font-body text-sm leading-[1.1875rem] text-ink-tertiary">
            Visual Design
          </Kicker>
        </motion.div>

        <motion.h1
          {...revealOnScroll(reduced, 0.1)}
          id="oak-dialog-title"
          className="max-w-[56.25rem] font-heading italic text-ink-primary text-5xl md:text-7xl lg:text-[6rem] leading-[0.9] tracking-[-0.125rem] lg:tracking-[-0.1875rem]"
        >
          Oak National Academy
        </motion.h1>

        <motion.p
          {...revealOnScroll(reduced, 0.2)}
          className="max-w-[42rem] font-body font-light text-base leading-5 text-ink-primary"
        >
          Providing supporting brand assets for the 2024 Oak National Academy
          Hackathon which had to strictly adhere to existing brand guidelines
        </motion.p>

        <motion.dl
          {...revealOnScroll(reduced, 0.3)}
          className="mt-2 flex flex-wrap gap-x-12 gap-y-6"
        >
          {META.map(({ value, label }) => (
            <div key={label} className="flex flex-col gap-1.5">
              <dd className="font-heading italic text-ink-primary text-2xl leading-6">
                {value}
              </dd>
              <dt className="font-body text-xs font-medium uppercase leading-4 tracking-[0.06em] text-ink-tertiary">
                {label}
              </dt>
            </div>
          ))}
        </motion.dl>
      </header>
    );
  }

  function OakNationalAcademy({ onClose }) {
    const dialogRef = useRef(null);
    const closeRef = useRef(null);
    const reduced = useReducedMotion();

    /* Whatever had focus when the dialog opened — the card — gets it back
       on close, so the reader lands where they left rather than at the
       top of the document. */
    const openerRef = useRef(null);
    useEffect(() => {
      openerRef.current = document.activeElement;
      closeRef.current && closeRef.current.focus();
      return () => {
        const opener = openerRef.current;
        if (opener && typeof opener.focus === "function") opener.focus();
      };
    }, []);

    /* Hold the page behind the dialog still. Padding replaces the
       scrollbar's width so the layout underneath doesn't jump. */
    useEffect(() => {
      const { body, documentElement } = document;
      const previousOverflow = body.style.overflow;
      const previousPadding = body.style.paddingRight;
      const gap = window.innerWidth - documentElement.clientWidth;
      body.style.overflow = "hidden";
      if (gap > 0) body.style.paddingRight = gap + "px";
      return () => {
        body.style.overflow = previousOverflow;
        body.style.paddingRight = previousPadding;
      };
    }, []);

    const onKeyDown = useCallback(
      (event) => {
        if (event.key === "Escape") {
          event.stopPropagation();
          onClose();
          return;
        }
        if (event.key !== "Tab") return;

        /* Keep Tab inside the dialog: the page behind it is inert to the
           eye but still in the tab order. */
        const focusable = dialogRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      },
      [onClose]
    );

    /* Portalled to the body: the section that owns this dialog sits
       inside the video band's z-10 stacking context, which would trap
       the overlay underneath the z-50 bottom nav however high its own
       z-index went. */
    return ReactDOM.createPortal(
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduced ? 0.15 : 0.3, ease: "easeOut" }}
        className="fixed inset-0 z-[60] bg-black/80"
        onClick={onClose}
      >
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="oak-dialog-title"
          onKeyDown={onKeyDown}
          onClick={(event) => event.stopPropagation()}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: reduced ? 0.15 : 0.35, ease: "easeOut" }}
          className="absolute inset-0 overflow-y-auto overscroll-contain bg-black"
        >
          {/* Pinned in a style rather than a class: `.liquid-glass-strong`
              carries its own `position: relative`, and system.css loads
              after Tailwind, so a `fixed` utility would lose to it. */}
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close the Oak National Academy case study"
            style={{ position: "fixed" }}
            className="liquid-glass-strong glass-lift right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full text-ink-primary sm:right-8 sm:top-8"
          >
            <X className="h-6 w-6" />
          </button>

          <Hero />

          <Section id="oak-guidelines" title="Existing Brand Guidelines">
            <div className="flex flex-col gap-6">
              <GuidelinesCarousel />
              <a
                href="assets/ona-guidelines.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass-strong glass-lift flex w-fit items-center gap-2 rounded-full px-5 py-2.5 font-body text-sm font-medium leading-5 text-ink-primary"
              >
                Download the full guidelines (PDF)
                <ArrowDown className="h-5 w-5 shrink-0" />
              </a>
            </div>
          </Section>

          <Section id="oak-stories" kicker="Assets" title="Instagram Stories">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-5">
              {STORIES.map((tile) => (
                <Tile key={tile.src} {...tile} ratio="9 / 16" />
              ))}
            </div>
          </Section>

          <Section id="oak-carousel" kicker="Assets" title="Instagram Carousel Posts">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {CAROUSEL_POSTS.map((tile) => (
                <Tile key={tile.src} {...tile} ratio="1 / 1" />
              ))}
            </div>
          </Section>

          <Section id="oak-banners" kicker="Assets" title="Facebook / Linkedin Header Banners">
            <div className="flex flex-col gap-4 sm:gap-6">
              {WIDE_BANNERS.map((tile) => (
                <Tile key={tile.src} {...tile} ratio="8 / 3" />
              ))}
              <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
                {SOCIAL_BANNERS.map((tile) => (
                  <Tile key={tile.src} {...tile} ratio="auto" />
                ))}
              </div>
            </div>
          </Section>

          <Section id="oak-mail" kicker="Assets" title="Email Circulator">
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
              {DIRECT_MAIL.map((tile) => (
                <Tile key={tile.src} {...tile} ratio="4304 / 6112" />
              ))}
            </div>
          </Section>

          <Section id="oak-single" kicker="Assets" title="Instagram Single Posts">
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
              {SINGLE_POSTS.map((tile) => (
                <Tile key={tile.src} {...tile} ratio="1 / 1" />
              ))}
            </div>
          </Section>

          <div className={"flex justify-center pb-20 pt-4 " + SHELL}>
            <button
              type="button"
              onClick={onClose}
              className="liquid-glass-strong glass-lift rounded-full px-6 py-3 font-body text-sm font-medium leading-5 text-ink-primary"
            >
              Close case study
            </button>
          </div>
        </motion.div>
      </motion.div>,
      document.body
    );
  }

  window.OakNationalAcademy = OakNationalAcademy;
})();
