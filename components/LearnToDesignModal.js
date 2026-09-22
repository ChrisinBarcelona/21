/* LearnToDesignModal — the UX/UI Design Bootcamp with AI, shown as a
   dialog over the Learn to Design ribbon.

   Structurally this is OakNationalAcademy's dialog again: portalled to
   <body>, body locked and padded behind it, focus taken on open and
   handed back to the ribbon's button on close, Tab trapped inside,
   Escape closes. Content-wise it is the bootcamp's own page at
   barcelonacodeschool.com/ux-design-bootcamp-in-barcelona-code-school/,
   redrawn in this page's cards-and-kickers voice rather than embedded as
   theirs.

   Every outbound link — the register CTA on the next cohort, and the
   closing link back to the school's own site — reuses LeaveSiteModal
   rather than leaving straight away, exactly as WebsitePortfolio does
   for a live site: the anchor keeps its real href and target, so a
   modified click still goes directly, and the plain press opens the
   "you're about to leave chriskelly.it" interstitial first. */
(function () {
  const { useCallback, useEffect, useRef, useState } = React;
  const motion = window.Motion.motion;
  const AnimatePresence = window.Motion.AnimatePresence;
  const Kicker = window.Kicker;
  const LeaveSiteModal = window.LeaveSiteModal;
  const X = window.X;
  const ArrowUpRight = window.ArrowUpRight;
  const CircleCheck = window.CircleCheck;
  const useReducedMotion = window.useReducedMotion;
  const revealOnScroll = window.revealOnScroll;

  const SHELL = "mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16";

  const META = [
    { value: "9 Weeks", label: "Duration" },
    { value: "Full-Time", label: "Format" },
    { value: "English", label: "Language" },
    { value: "Campus or Remote", label: "Location" }
  ];

  const NEXT_COHORT = {
    dates: "October 19 – December 18, 2026",
    title: "UX/UI Design Bootcamp with AI",
    details: [
      "On campus or remote, live",
      "9-week course, in English, full-time",
      "Registration prepayment €580"
    ]
  };

  const SPRINTS = [
    {
      kicker: "Sprint 01",
      title: "Discover",
      body: "UX foundations and Design Thinking, put into practice with a live Google Design Sprint — research, problem framing and rapid concepting from day one."
    },
    {
      kicker: "Sprint 02",
      title: "Define & Design",
      body: "User research becomes information architecture, wireframes and interactive prototypes, built out in Figma."
    },
    {
      kicker: "Sprint 03",
      title: "Validate",
      body: "Usability testing on real users, then iterating the design against what the data actually shows rather than a hunch."
    },
    {
      kicker: "Sprint 04",
      title: "Ship & Present",
      body: "High-fidelity UI, a finished case study and a portfolio site — ready to show in a job interview."
    }
  ];

  const MODULES = [
    { n: "01", title: "UX Foundations & Design Thinking" },
    { n: "02", title: "User Research & Behavioural Analysis" },
    { n: "03", title: "Information Architecture & Wireframing" },
    { n: "04", title: "Interface Design & Prototyping in Figma" },
    { n: "05", title: "Usability Testing & Iteration" },
    { n: "06", title: "Portfolio Case Studies" },
    { n: "07", title: "AI Integration, Ethics & Advanced Workflows" },
    { n: "08", title: "Career Prep & Job Search" }
  ];

  const MODULE_07_POINTS = [
    "Practical AI tools for research synthesis, ideation and rapid prototyping",
    "Evaluating AI output critically rather than accepting it at face value",
    "Ethics, bias and transparency in AI-assisted design decisions",
    "Building an AI-literate workflow that still keeps the user at the centre"
  ];

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
            In Partnership with Barcelona Code School
          </Kicker>
        </motion.div>

        <motion.h1
          {...revealOnScroll(reduced, 0.1)}
          id="learn-to-design-dialog-title"
          className="max-w-[56.25rem] font-heading italic text-ink-primary text-5xl md:text-7xl lg:text-[6rem] leading-[0.9] tracking-[-0.125rem] lg:tracking-[-0.1875rem]"
        >
          UX / UI Design Bootcamp with AI
        </motion.h1>

        <motion.p
          {...revealOnScroll(reduced, 0.2)}
          className="max-w-[42rem] font-body font-light text-base leading-5 text-ink-primary"
        >
          A full-time bootcamp in user experience and interface design, with
          AI woven through every sprint rather than bolted on at the end.
          Chris Kelly, of chriskelly.it, is the course&rsquo;s UX/UI Design
          Instructor.
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

  function LearnToDesignModal({ onClose }) {
    const dialogRef = useRef(null);
    const closeRef = useRef(null);
    const reduced = useReducedMotion();

    /* The site whose leave-confirmation dialog is open, or null. Shared
       by every outbound link in this dialog. */
    const [leaving, setLeaving] = useState(null);

    const openerRef = useRef(null);
    useEffect(() => {
      openerRef.current = document.activeElement;
      closeRef.current && closeRef.current.focus();
      return () => {
        const opener = openerRef.current;
        if (opener && typeof opener.focus === "function") opener.focus();
      };
    }, []);

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

    /* Same guard WebsitePortfolio uses: a modified click is already a
       deliberate "open this elsewhere", so the browser keeps it. Only
       the plain press is intercepted for the leave-site interstitial. */
    const confirmLeaving = (site) => (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (typeof event.button === "number" && event.button !== 0) return;
      event.preventDefault();
      setLeaving(site);
    };

    return ReactDOM.createPortal(
      <React.Fragment>
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
            aria-labelledby="learn-to-design-dialog-title"
            onKeyDown={onKeyDown}
            onClick={(event) => event.stopPropagation()}
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: reduced ? 0.15 : 0.35, ease: "easeOut" }}
            className="absolute inset-0 overflow-y-auto overscroll-contain bg-black"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close the UX/UI Design Bootcamp with AI"
              style={{ position: "fixed" }}
              className="liquid-glass-strong glass-lift right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full text-ink-primary sm:right-8 sm:top-8"
            >
              <X className="h-6 w-6" />
            </button>

            <Hero />

            <Section id="ltd-cohort" kicker="Schedule" title="Next Cohort">
              <div
                className="liquid-glass glass-lift flex flex-col gap-4 p-6 sm:p-8"
                style={{ borderRadius: "var(--radius-lg)", maxWidth: "36rem" }}
              >
                <Kicker className="font-body text-sm leading-[1.1875rem] text-ink-tertiary">
                  {NEXT_COHORT.dates}
                </Kicker>

                <h3 className="font-heading italic text-ink-primary text-3xl md:text-4xl leading-9 tracking-[-0.0625rem]">
                  {NEXT_COHORT.title}
                </h3>

                <ul className="flex flex-col gap-1.5">
                  {NEXT_COHORT.details.map((line) => (
                    <li
                      key={line}
                      className="font-body font-light text-sm leading-[1.1875rem] text-ink-secondary"
                    >
                      {line}
                    </li>
                  ))}
                </ul>

                <a
                  href="https://barcelonacodeschool.com/register/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={confirmLeaving({
                    name: "Barcelona Code School",
                    domain: "barcelonacodeschool.com/register/"
                  })}
                  aria-haspopup="dialog"
                  className="stretched-link mt-2 w-fit rounded-full"
                >
                  <span className="liquid-glass-strong rounded-full flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium leading-5 text-ink-primary font-body">
                    Sign up
                    <ArrowUpRight className="h-5 w-5 shrink-0" />
                  </span>
                </a>
              </div>
            </Section>

            <Section
              id="ltd-sprints"
              kicker="Curriculum"
              title="Four Sprints, One Portfolio"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {SPRINTS.map((sprint) => (
                  <div
                    key={sprint.kicker}
                    className="liquid-glass glass-lift flex flex-col gap-3 p-6"
                    style={{ borderRadius: "var(--radius-lg)" }}
                  >
                    <Kicker className="font-body text-sm leading-[1.1875rem] text-ink-tertiary">
                      {sprint.kicker}
                    </Kicker>
                    <h3 className="font-heading italic text-ink-primary text-2xl leading-7">
                      {sprint.title}
                    </h3>
                    <p className="font-body font-light text-sm leading-[1.1875rem] text-ink-secondary">
                      {sprint.body}
                    </p>
                  </div>
                ))}
              </div>
            </Section>

            <Section
              id="ltd-modules"
              kicker="Curriculum"
              title="Cornerstone Modules"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MODULES.map((mod) => (
                  <div
                    key={mod.n}
                    className="liquid-glass glass-lift flex items-center gap-4 p-5"
                    style={{ borderRadius: "var(--radius-md)" }}
                  >
                    <span className="font-heading italic text-ink-tertiary text-2xl leading-6 shrink-0">
                      {mod.n}
                    </span>
                    <span className="font-body text-sm font-medium leading-5 text-ink-primary">
                      {mod.title}
                    </span>
                  </div>
                ))}
              </div>
            </Section>

            <Section
              id="ltd-module-07"
              kicker="Module 07 in Detail"
              title="AI Integration, Ethics and Advanced Workflows"
            >
              <div
                className="liquid-glass-strong flex flex-col gap-6 p-6 sm:p-8"
                style={{ borderRadius: "var(--radius-lg)" }}
              >
                <p className="font-body font-light text-base leading-5 text-ink-secondary">
                  The bootcamp&rsquo;s final cornerstone module is where AI
                  stops being a shortcut and starts being a tool a designer
                  can defend. Sessions cover using generative AI across the
                  UX process — synthesising research, exploring concepts,
                  accelerating prototyping — alongside the judgement to
                  know when an AI&rsquo;s output is good enough to ship,
                  and when it isn&rsquo;t.
                </p>

                <ul className="flex flex-col gap-3">
                  {MODULE_07_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <CircleCheck className="h-5 w-5 shrink-0 text-ink-primary mt-0.5" />
                      <span className="font-body font-light text-sm leading-[1.1875rem] text-ink-secondary">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Section>

            <div className={"flex flex-col items-center gap-4 pb-20 pt-4 sm:flex-row sm:justify-center " + SHELL}>
              <a
                href="https://barcelonacodeschool.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={confirmLeaving({
                  name: "Barcelona Code School",
                  domain: "barcelonacodeschool.com"
                })}
                aria-haspopup="dialog"
                className="liquid-glass-strong glass-lift flex items-center justify-center gap-2 rounded-full px-6 py-3 font-body text-sm font-medium leading-5 text-ink-primary"
              >
                Find out more at Barcelona Code School
                <ArrowUpRight className="h-5 w-5 shrink-0" />
              </a>

              <button
                type="button"
                onClick={onClose}
                className="liquid-glass glass-lift rounded-full px-6 py-3 font-body text-sm font-medium leading-5 text-ink-primary"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {leaving && (
            <LeaveSiteModal site={leaving} onClose={() => setLeaving(null)} />
          )}
        </AnimatePresence>
      </React.Fragment>,
      document.body
    );
  }

  window.LearnToDesignModal = LearnToDesignModal;
})();
