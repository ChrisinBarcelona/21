/* Skills — "What We Love". Six feature cards on the already-raised 5% glass,
   two rows of three. */
(function () {
  const motion = window.Motion.motion;
  const BlurText = window.BlurText;
  const Kicker = window.Kicker;
  const useReducedMotion = window.useReducedMotion;
  const revealOnScroll = window.revealOnScroll;

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
    const reduced = useReducedMotion();

    return (
      <section
        id="skills"
        aria-labelledby="skills-heading"
        className="relative scroll-mt-20 mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16 py-14"
      >
        <div className="on-video flex flex-col gap-4">
          <motion.div {...revealOnScroll(reduced)}>
            <Kicker className="font-body text-sm leading-[1.1875rem] text-ink-tertiary">
              Skills
            </Kicker>
          </motion.div>

          <BlurText
            as="h2"
            id="skills-heading"
            align="left"
            text="What We Love"
            delay={100}
            className="font-heading italic text-ink-primary text-4xl md:text-5xl lg:text-[3.75rem] leading-[0.9] tracking-[-0.125rem] lg:tracking-[-0.1875rem]"
          />
        </div>

        <div className="mt-[3.375rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map((skill, i) => (
            <motion.article
              key={skill.title}
              {...revealOnScroll(reduced, 0.15 + (i % 3) * 0.15)}
              className="liquid-glass glass-raised flex flex-col gap-4 p-6"
              style={{ borderRadius: "var(--radius-lg)" }}
            >
              <Kicker className="font-body text-sm leading-[1.1875rem] text-ink-tertiary">
                Skills
              </Kicker>

              <h3 className="font-heading italic text-ink-primary text-3xl md:text-4xl leading-9 tracking-[-0.0625rem]">
                {skill.title}
              </h3>

              <p className="font-body font-light text-sm leading-[1.1875rem] text-ink-secondary">
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
