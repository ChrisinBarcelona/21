/* Capabilities — second full-bleed video section with three glass feature cards. */
(function () {
  const motion = window.Motion.motion;
  const FadingVideo = window.FadingVideo;
  const MaterialIcon = window.MaterialIcon;
  const MATERIAL_PATHS = window.MATERIAL_PATHS;

  const CAPABILITIES_VIDEO =
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4";

  const RISE = { filter: "blur(10px)", opacity: 0, y: 20 };
  const SETTLE = { filter: "blur(0px)", opacity: 1, y: 0 };
  const VIEWPORT = { once: true, amount: 0.2 };

  const CARDS = [
    {
      icon: MATERIAL_PATHS.image,
      tags: ["Natural Context", "Photo Realism", "Infinite Settings", "Eco-Vibe"],
      title: "AI Scenery",
      body:
        "AI analyzes your product to create indistinguishable natural environments — from Icelandic cliffs to misty forests."
    },
    {
      icon: MATERIAL_PATHS.movie,
      tags: ["Scale Fast", "Visual Consistency", "Time Saver", "Ready to Post"],
      title: "Batch Production",
      body:
        "Style your entire product line in minutes. Create a unified visual identity for catalogues and social media without weeks of retouching."
    },
    {
      icon: MATERIAL_PATHS.lightbulb,
      tags: ["Ray Tracing", "Physical Shadows", "Studio Quality", "Sunlight Sync"],
      title: "Smart Lighting",
      body:
        "Automatic lighting and material adjustment. Achieve flawless integration with realistic shadows and sunlight."
    }
  ];

  function Capabilities() {
    return (
      <section className="relative min-h-screen w-full overflow-hidden bg-black">
        <FadingVideo
          src={CAPABILITIES_VIDEO}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        <div className="relative z-10 px-8 md:px-16 lg:px-20 pt-24 pb-10 flex flex-col min-h-screen">
          <div className="mb-auto">
            <motion.p
              initial={RISE}
              whileInView={SETTLE}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-sm font-body text-white/80 mb-6"
            >
              // Capabilities
            </motion.p>

            <motion.h2
              initial={RISE}
              whileInView={SETTLE}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              className="font-heading italic text-white text-6xl md:text-7xl lg:text-[6rem] leading-[0.9] tracking-[-3px]"
            >
              Production
              <br />
              evolved
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              {CARDS.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={RISE}
                  whileInView={SETTLE}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: "easeOut" }}
                  className="liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className="liquid-glass rounded-[0.75rem] flex items-center justify-center shrink-0"
                      style={{ width: 44, height: 44 }}
                    >
                      <MaterialIcon path={card.icon} />
                    </div>

                    <div className="flex flex-wrap justify-end gap-1.5 max-w-[70%]">
                      {card.tags.map((tag) => (
                        <span
                          key={tag}
                          className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 font-body whitespace-nowrap"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1" />

                  <div className="mt-6">
                    <h3 className="font-heading italic text-white text-3xl md:text-4xl tracking-[-1px] leading-none">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm text-white/90 font-body font-light leading-snug max-w-[32ch]">
                      {card.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  window.Capabilities = Capabilities;
})();
