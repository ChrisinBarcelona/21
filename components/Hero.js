/* Hero — full-viewport looping enchanted-forest clip with the chrome layered straight on
   top. There is deliberately no dark overlay on the video: all contrast comes
   from the liquid glass, which is why the CTA carries its own surface rather
   than sitting on a scrim, and why the loose copy carries `on-video`.

   The video is overscaled to 120% and pinned to the top rather than centred —
   the focal point of the clip is the top of frame.

   The headline's measure is the one length on the page in `em` rather than
   `rem`: 672/88 = 7.64em. Tied to its own font size, it holds the design's
   type-to-measure ratio through every breakpoint step, so the line always
   breaks where Figma breaks it ("We Make Websites that / Are Impossible to
   Ignore") instead of only at the largest size.

   The first type step is gentler than a strict 1.125x. A phone viewport
   cannot take the full multiple without pushing the CTAs under the
   floating nav, and a hero you have to scroll to act on is worse than a
   slightly smaller headline. The desktop steps carry the full scale. */
(function () {
  const { useState } = React;
  const AnimatePresence = window.Motion.AnimatePresence;
  const FadingVideo = window.FadingVideo;
  const BlurText = window.BlurText;
  const ArrowUpRight = window.ArrowUpRight;
  const Play = window.Play;
  const ContactModal = window.ContactModal;

  /* Served from this site. 1080p H.264, re-encoded from the 14MB original
     at CRF 26 with the audio track dropped (the clip always plays muted):
     5.9MB, no visible difference at full screen. */
  const HERO_VIDEO = "assets/video/hero-enchanted.mp4";

  function Hero() {
    const [contactOpen, setContactOpen] = useState(false);

    return (
      <React.Fragment>
      <section id="hero" className="relative min-h-screen w-full overflow-hidden bg-black">
        <FadingVideo
          src={HERO_VIDEO}
          className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top z-0"
          style={{ width: "120%", height: "120%" }}
        />

        <div className="on-video relative z-10 flex min-h-screen flex-col items-center justify-center gap-6 px-4 pt-24 pb-44 sm:py-28 text-center">
          <BlurText
            as="h1"
            text="We Make Websites that Are Impossible to Ignore"
            delay={100}
            immediate
            className="font-heading italic text-ink-primary max-w-[7.64em] justify-center text-[2.25rem] sm:text-[4rem] md:text-[5rem] lg:text-[5.5rem] leading-[0.85] tracking-[-0.09375rem] md:tracking-[-0.25rem]"
          />

          <p
            style={{ animationDelay: "0.8s" }}
            className="entrance max-w-[42rem] font-body font-light text-ink-primary text-sm md:text-base leading-5"
          >
            We have spent decades mastering technology and design to build stunning websites and
            brand identities that drive real, measurable sales
          </p>

          <div
            style={{ animationDelay: "1.1s" }}
            className="entrance flex flex-wrap items-center justify-center gap-4 sm:gap-6"
          >
            <a
              href="#websites"
              className="liquid-glass-strong rounded-full flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium leading-5 text-ink-primary font-body"
            >
              View work
              <ArrowUpRight className="h-5 w-5 shrink-0" />
            </a>
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="rounded-full flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium leading-5 text-ink-primary font-body"
            >
              Let&rsquo;s talk
              <Play className="h-5 w-5 shrink-0" />
            </button>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
      </AnimatePresence>
      </React.Fragment>
    );
  }

  window.Hero = Hero;
})();
