/* Hero — full-viewport looping starfield with the chrome layered straight on
   top. There is deliberately no dark overlay on the video: all contrast comes
   from the liquid glass, which is why the CTA carries its own surface rather
   than sitting on a scrim.

   The video is overscaled to 120% and pinned to the top rather than centred —
   the focal point of the clip is the top of frame. */
(function () {
  const motion = window.Motion.motion;
  const FadingVideo = window.FadingVideo;
  const BlurText = window.BlurText;
  const ArrowUpRight = window.ArrowUpRight;
  const Play = window.Play;

  const HERO_VIDEO =
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4";

  const RISE = { filter: "blur(10px)", opacity: 0, y: 20 };
  const SETTLE = { filter: "blur(0px)", opacity: 1, y: 0 };
  const rise = (delay) => ({ duration: 0.8, delay, ease: "easeOut" });

  function Hero() {
    return (
      <section id="hero" className="relative min-h-screen w-full overflow-hidden bg-black">
        <FadingVideo
          src={HERO_VIDEO}
          className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top z-0"
          style={{ width: "120%", height: "120%" }}
        />

        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-6 px-4 py-28 text-center">
          <BlurText
            as="h1"
            text="We Make Websites that Are Impossible to Ignore"
            delay={100}
            className="font-heading italic text-ink-primary max-w-[672px] justify-center text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[88px] leading-[0.8] tracking-[-2px] md:tracking-[-4px]"
          />

          <motion.p
            initial={RISE}
            animate={SETTLE}
            transition={rise(0.8)}
            className="max-w-[672px] font-body font-light text-ink-primary text-sm md:text-base leading-5"
          >
            We have spent decades mastering technology and design to build stunning websites and
            brand identities that drive real, measurable sales
          </motion.p>

          <motion.div
            initial={RISE}
            animate={SETTLE}
            transition={rise(1.1)}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            <a
              href="#projects"
              className="liquid-glass-strong rounded-full flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium leading-5 text-ink-primary font-body"
            >
              View work
              <ArrowUpRight className="h-5 w-5 shrink-0" />
            </a>
            <a
              href="#contact"
              className="rounded-full flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium leading-5 text-ink-primary font-body"
            >
              Let&rsquo;s talk
              <Play className="h-5 w-5 shrink-0" />
            </a>
          </motion.div>
        </div>
      </section>
    );
  }

  window.Hero = Hero;
})();
