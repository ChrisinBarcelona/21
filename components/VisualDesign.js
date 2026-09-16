/* VisualDesign — the brand-identity work, above the UX case studies.

   One card today, in the first column of the same three-column grid the
   rest of the page runs on, so a second piece drops in beside it without
   the section being rebuilt. The card is taller than its neighbours
   elsewhere on the page only because its artwork is: an Instagram story
   is 9:16, and the tile takes that ratio rather than cropping a portrait
   asset into a landscape band.

   The card opens the case study as a dialog rather than navigating. The
   heading wraps the button, so the accessibility tree carries one control
   named for the project while the whole card stays the hit area. */
(function () {
  const { useState } = React;
  const motion = window.Motion.motion;
  const AnimatePresence = window.Motion.AnimatePresence;
  const BlurText = window.BlurText;
  const GlassImage = window.GlassImage;
  const Kicker = window.Kicker;
  const OakNationalAcademy = window.OakNationalAcademy;
  const useReducedMotion = window.useReducedMotion;
  const revealOnScroll = window.revealOnScroll;

  const PROJECT = {
    kicker: "Visual Identity",
    name: "Oak National Academy",
    blurb: "Strictly adhere to existing brand guidelines",
    image: "assets/oak/instagram-story-1.webp",
    alt:
      "An Instagram story for the Oak National Academy hackathon, in the vertical story format"
  };

  function VisualDesign() {
    const [open, setOpen] = useState(false);
    const reduced = useReducedMotion();

    return (
      <React.Fragment>
        <section
          id="visual-design"
          aria-labelledby="visual-design-heading"
          className="relative scroll-mt-20 mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16 py-14"
        >
          <div className="on-video flex flex-col gap-4">
            <motion.div {...revealOnScroll(reduced)}>
              <Kicker className="font-body text-sm leading-[1.1875rem] text-ink-tertiary">
                Visual Identity
              </Kicker>
            </motion.div>

            <BlurText
              as="h2"
              id="visual-design-heading"
              align="left"
              text="Visual Design"
              delay={100}
              className="font-heading italic text-ink-primary text-4xl md:text-5xl lg:text-[3.75rem] leading-[0.9] tracking-[-0.125rem] lg:tracking-[-0.1875rem]"
            />
          </div>

          <div className="mt-[3.375rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.article
              {...revealOnScroll(reduced, 0.15)}
              className="liquid-glass glass-lift flex h-full flex-col gap-4 p-6"
              style={{ borderRadius: "var(--radius-lg)" }}
            >
              <GlassImage src={PROJECT.image} alt={PROJECT.alt} ratio="9 / 16" />

              <Kicker className="font-body text-sm leading-[1.1875rem] text-ink-tertiary">
                {PROJECT.kicker}
              </Kicker>

              <h3 className="font-heading italic text-ink-primary text-3xl md:text-4xl leading-9 tracking-[-0.0625rem]">
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  aria-haspopup="dialog"
                  className="stretched-link cursor-pointer rounded-sm text-left"
                >
                  {PROJECT.name}
                </button>
              </h3>

              <p className="font-body font-light text-sm leading-[1.1875rem] text-ink-secondary">
                {PROJECT.blurb}
              </p>
            </motion.article>
          </div>
        </section>

        <AnimatePresence>
          {open && <OakNationalAcademy onClose={() => setOpen(false)} />}
        </AnimatePresence>
      </React.Fragment>
    );
  }

  window.VisualDesign = VisualDesign;
})();
