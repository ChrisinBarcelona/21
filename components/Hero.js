/* Hero — full-viewport looping starfield with the glass chrome layered on top. */
(function () {
  const motion = window.Motion.motion;
  const FadingVideo = window.FadingVideo;
  const BlurText = window.BlurText;
  const Navbar = window.Navbar;
  const Partners = window.Partners;
  const ArrowUpRight = window.ArrowUpRight;
  const Play = window.Play;
  const ClockIcon = window.ClockIcon;
  const GlobeIcon = window.GlobeIcon;

  const HERO_VIDEO =
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4";

  const RISE = { filter: "blur(10px)", opacity: 0, y: 20 };
  const SETTLE = { filter: "blur(0px)", opacity: 1, y: 0 };
  const rise = (delay) => ({ duration: 0.8, delay, ease: "easeOut" });

  const STATS = [
    { Icon: ClockIcon, value: "34.5 Min", label: "Average Videos Watch Time" },
    { Icon: GlobeIcon, value: "2.8B+", label: "Users Across the Globe" }
  ];

  function Hero() {
    return (
      <section className="relative min-h-screen w-full overflow-hidden bg-black">
        <FadingVideo
          src={HERO_VIDEO}
          className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top z-0"
          style={{ width: "120%", height: "120%" }}
        />

        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar />

          <div className="flex flex-1 flex-col items-center justify-center px-4 pt-24 text-center">
            <motion.div
              initial={RISE}
              animate={SETTLE}
              transition={rise(0.4)}
              className="liquid-glass rounded-full flex items-center gap-3"
            >
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-black font-body">
                New
              </span>
              <span className="pr-3 text-sm text-white/90 font-body">
                Maiden Crewed Voyage to Mars Arrives 2026
              </span>
            </motion.div>

            <BlurText
              text="Venture Past Our Sky Across the Universe"
              delay={100}
              className="mt-6 text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.8] max-w-2xl justify-center tracking-[-4px]"
            />

            <motion.p
              initial={RISE}
              animate={SETTLE}
              transition={rise(0.8)}
              className="mt-4 text-sm md:text-base text-white max-w-2xl font-body font-light leading-tight"
            >
              Discover the universe in ways once unimaginable. Our pioneering vessels and
              breakthrough engineering bring deep-space exploration within reach—secure and
              extraordinary.
            </motion.p>

            <motion.div
              initial={RISE}
              animate={SETTLE}
              transition={rise(1.1)}
              className="flex items-center gap-6 mt-6"
            >
              <a
                href="#"
                className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium text-white font-body flex items-center gap-2"
              >
                Start Your Voyage
                <ArrowUpRight className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-sm font-medium text-white font-body"
              >
                View Liftoff
                <Play className="h-4 w-4" />
              </a>
            </motion.div>

            <motion.div
              initial={RISE}
              animate={SETTLE}
              transition={rise(1.3)}
              className="flex flex-wrap justify-center items-stretch gap-4 mt-8 max-w-full"
            >
              {STATS.map(({ Icon, value, label }) => (
                <div
                  key={value}
                  className="liquid-glass rounded-[1.25rem] p-5 w-[220px] flex flex-col text-left"
                >
                  <Icon />
                  <div className="mt-8">
                    <div className="font-heading italic text-white text-4xl tracking-[-1px] leading-none">
                      {value}
                    </div>
                    <div className="text-xs text-white font-body font-light mt-2">{label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <Partners />
        </div>
      </section>
    );
  }

  window.Hero = Hero;
})();
