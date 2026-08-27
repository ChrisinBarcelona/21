/* Projects — "Latest Projects". Sits transparent over the shared video band,
   so every surface here carries its own glass. */
(function () {
  const { useState } = React;
  const motion = window.Motion.motion;
  const BlurText = window.BlurText;

  const RISE = { filter: "blur(10px)", opacity: 0, y: 20 };
  const SETTLE = { filter: "blur(0px)", opacity: 1, y: 0 };
  const VIEWPORT = { once: true, amount: 0.2 };

  const PROJECTS = [
    {
      kicker: "// Lean Startup",
      title: "Locker Room",
      body: "Validating a gap in the tourist industry",
      status: "Coming Soon",
      image: "assets/projects/locker-room.jpg"
    },
    {
      kicker: "// Service Design",
      title: "Honest Greens",
      body: "A clear service problem that needs re-design",
      status: "Coming Soon",
      image: "assets/projects/honest-greens.jpg"
    },
    {
      kicker: "// iOS",
      title: "Conjuga",
      body: "A quiz to assist learning verbs",
      status: "Coming Soon",
      image: "assets/projects/conjuga.jpg"
    }
  ];

  /* The image tile is a glass surface with the artwork as its fill. If the
     artwork is missing the surface still reads as designed, so drop the
     <img> rather than leaving a broken frame behind. */
  function ProjectImage({ src, alt }) {
    const [failed, setFailed] = useState(false);

    return (
      <div
        className="liquid-glass w-full h-[194px] shrink-0 overflow-hidden"
        style={{ borderRadius: "var(--radius-md)" }}
      >
        {!failed && (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setFailed(true)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </div>
    );
  }

  function Projects() {
    return (
      <section
        id="projects"
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
            // Projects
          </motion.p>

          <BlurText
            as="h2"
            align="left"
            text="Latest Projects"
            delay={100}
            className="font-heading italic text-ink-primary text-4xl md:text-5xl lg:text-[60px] leading-[0.9] tracking-[-2px] lg:tracking-[-3px]"
          />
        </div>

        <div className="mt-[54px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <motion.article
              key={project.title}
              initial={RISE}
              whileInView={SETTLE}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.15, ease: "easeOut" }}
              className="liquid-glass glass-lift flex flex-col gap-4 p-6"
              style={{ borderRadius: "var(--radius-lg)" }}
            >
              <ProjectImage src={project.image} alt={project.title} />

              <p className="font-body text-sm leading-[19px] text-ink-tertiary">{project.kicker}</p>

              <h3 className="font-heading italic text-ink-primary text-3xl md:text-4xl leading-9 tracking-[-1px]">
                {project.title}
              </h3>

              <p className="font-body font-light text-sm leading-[19px] text-ink-secondary">
                {project.body}
              </p>

              <p className="font-heading italic text-ink-primary text-2xl leading-6">
                {project.status}
              </p>
            </motion.article>
          ))}
        </div>
      </section>
    );
  }

  window.Projects = Projects;
})();
