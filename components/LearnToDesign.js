/* LearnToDesign — the partnership ribbon between Case Studies and Skills.

   Every other section on the page is a heading over a grid of cards; this
   one is neither. It is a single strip, because the thing it is saying —
   "come learn this with us" — is an announcement, not a portfolio piece,
   and a grid would ask the reader to compare it against the work around
   it rather than just read it. The frosted glass (`.liquid-glass-frost`
   in system.css) marks the same difference in surface: an 8% tint rather
   than the 1% film every card on the page otherwise carries, so the strip
   holds its own shape against the video instead of thinning into it.

   The press opens LearnToDesignModal rather than navigating, the same
   pattern VisualDesign and CaseStudies use for their own case studies. */
(function () {
  const { useState } = React;
  const motion = window.Motion.motion;
  const AnimatePresence = window.Motion.AnimatePresence;
  const Kicker = window.Kicker;
  const LearnToDesignModal = window.LearnToDesignModal;
  const ArrowDown = window.ArrowDown;
  const useReducedMotion = window.useReducedMotion;
  const revealOnScroll = window.revealOnScroll;

  function LearnToDesign() {
    const [open, setOpen] = useState(false);
    const reduced = useReducedMotion();

    return (
      <React.Fragment>
        <section
          id="learn-to-design"
          aria-labelledby="learn-to-design-heading"
          className="relative scroll-mt-20 mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16 py-14"
        >
          <motion.div
            {...revealOnScroll(reduced)}
            className="liquid-glass-frost flex flex-col gap-8 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12"
            style={{ borderRadius: "var(--radius-lg)" }}
          >
            <div className="flex flex-col gap-4 lg:max-w-[40rem]">
              <Kicker className="font-body text-sm leading-[1.1875rem] text-ink-tertiary">
                In partnership with Barcelona Code School
              </Kicker>

              <h2
                id="learn-to-design-heading"
                className="font-heading italic text-ink-primary text-3xl sm:text-4xl lg:text-[3.25rem] leading-[0.95] tracking-[-0.09375rem]"
              >
                Want to learn user experience design with AI?
              </h2>

              <p className="font-body font-light text-base leading-5 text-ink-secondary">
                Chris is the UX/UI Design Bootcamp Instructor at Barcelona
                Code School, teaching designers how to bring AI into a real
                UX workflow.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-haspopup="dialog"
              className="liquid-glass-strong glass-lift flex shrink-0 items-center justify-center gap-2 rounded-full px-6 py-3 font-body text-sm font-medium leading-5 text-ink-primary"
            >
              Find out more
              <ArrowDown className="h-5 w-5 shrink-0" />
            </button>
          </motion.div>
        </section>

        <AnimatePresence>
          {open && <LearnToDesignModal onClose={() => setOpen(false)} />}
        </AnimatePresence>
      </React.Fragment>
    );
  }

  window.LearnToDesign = LearnToDesign;
})();
