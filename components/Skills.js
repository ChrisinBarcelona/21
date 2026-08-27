/* Skills — "What We Love". Six feature cards on the already-raised 5% glass,
   two rows of three. */
(function () {
  const motion = window.Motion.motion;
  const BlurText = window.BlurText;

  const RISE = { filter: "blur(10px)", opacity: 0, y: 20 };
  const SETTLE = { filter: "blur(0px)", opacity: 1, y: 0 };
  const VIEWPORT = { once: true, amount: 0.2 };

  const SKILLS = [
    {
      title: "AI First Web Design",
      body: "We leverage Claude's power to deliver AI-first, best-in-class websites."
    },
    {
      title: "UX Strategy",
      body: "We optimise websites using thorough user experience testing and research."
    },
    {
      title: "Branding",
      body: "We craft compelling brand identities engineered to engage and convert."
    },
    {
      title: "Art Direction",
      body: "We guide creative vision to craft striking, memorable visual experiences."
    },
    {
      title: "Graphic Design",
      body: "We design captivating graphics that elevate your brand and communicate effectively."
    },
    {
      title: "Service Design",
      body: "We map end-to-end customer journeys to build seamless, impactful service experiences."
    }
  ];

  function Skills() {
    return (
      <section
        id="skills"
        className="relative scroll-mt-20 mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 py-14"
      >
        <div className="flex flex-col gap-4">
          <motion.p
            initial={RISE}
            whileInView={SETTLE}
            viewport={VIEWPORT}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-body text-sm leading-[19px] text-ink-tertiary"
          >
            // Skills
          </motion.p>

          <BlurText
            as="h2"
            align="left"
            text="What We Love"
            delay={100}
            className="font-heading italic text-ink-primary text-4xl md:text-5xl lg:text-[60px] leading-[0.9] tracking-[-2px] lg:tracking-[-3px]"
          />
        </div>

        <div className="mt-[54px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map((skill, i) => (
            <motion.article
              key={skill.title}
              initial={RISE}
              whileInView={SETTLE}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, delay: 0.15 + (i % 3) * 0.15, ease: "easeOut" }}
              className="liquid-glass glass-raised flex flex-col gap-4 p-6"
              style={{ borderRadius: "var(--radius-lg)" }}
            >
              <p className="font-body text-sm leading-[19px] text-ink-tertiary">// Skills</p>

              <h3 className="font-heading italic text-ink-primary text-3xl md:text-4xl leading-9 tracking-[-1px]">
                {skill.title}
              </h3>

              <p className="font-body font-light text-sm leading-[19px] text-ink-secondary">
                {skill.body}
              </p>
            </motion.article>
          ))}
        </div>
      </section>
    );
  }

  window.Skills = Skills;
})();
