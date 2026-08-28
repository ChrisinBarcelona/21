/* Projects — "Latest Projects". Sits transparent over the shared video band,
   so every surface here carries its own glass. */
(function () {
  const { useState } = React;
  const motion = window.Motion.motion;
  const BlurText = window.BlurText;
  const Kicker = window.Kicker;
  const useReducedMotion = window.useReducedMotion;
  const revealOnScroll = window.revealOnScroll;

  const PROJECTS = [
    {
      kicker: "Lean Startup",
      title: "Locker Room",
      body: "Validating a gap in the tourist industry",
      status: "Coming Soon",
      image: "assets/projects/locker-room.jpg",
      alt: "A pink shipping-container locker hut under neon signage on a beach at sunset, palm trees behind it"
    },
    {
      kicker: "Service Design",
      title: "Honest Greens",
      body: "A clear service problem that needs re-design",
      status: "Coming Soon",
      image: "assets/projects/honest-greens.jpg",
      alt: "An overhead shot of a salad bowl of leaves, cucumber and broccoli beside a halved avocado on a wooden table"
    },
    {
      kicker: "iOS",
      title: "Conjuga",
      body: "A quiz to assist learning verbs",
      status: "Coming Soon",
      image: "assets/projects/conjuga.jpg",
      alt: "The Conjuga wordmark set in bright green on charcoal, above the line Español - Verbos esenciales"
    }
  ];

  /* The image tile is a glass surface with the artwork as its fill. If the
     artwork is missing the surface still reads as designed, so drop the
     <img> rather than leaving a broken frame behind. */
  function ProjectImage({ src, alt }) {
    const [failed, setFailed] = useState(false);

    return (
      <div
        className="liquid-glass w-full h-[12.125rem] shrink-0 overflow-hidden"
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
    const reduced = useReducedMotion();

    return (
      <section
        id="projects"
        aria-labelledby="projects-heading"
        className="relative scroll-mt-20 mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16 py-14"
      >
        <div className="on-video flex flex-col gap-4">
          <motion.div {...revealOnScroll(reduced)}>
            <Kicker className="font-body text-sm leading-[1.1875rem] text-ink-tertiary">
              Projects
            </Kicker>
          </motion.div>

          <BlurText
            as="h2"
            id="projects-heading"
            align="left"
            text="Latest Projects"
            delay={100}
            className="font-heading italic text-ink-primary text-4xl md:text-5xl lg:text-[3.75rem] leading-[0.9] tracking-[-0.125rem] lg:tracking-[-0.1875rem]"
          />
        </div>

        <div className="mt-[3.375rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <motion.article
              key={project.title}
              {...revealOnScroll(reduced, 0.15 + i * 0.15)}
              className="liquid-glass glass-lift flex flex-col gap-4 p-6"
              style={{ borderRadius: "var(--radius-lg)" }}
            >
              <ProjectImage src={project.image} alt={project.alt} />

              <Kicker className="font-body text-sm leading-[1.1875rem] text-ink-tertiary">
                {project.kicker}
              </Kicker>

              <h3 className="font-heading italic text-ink-primary text-3xl md:text-4xl leading-9 tracking-[-0.0625rem]">
                {project.title}
              </h3>

              <p className="font-body font-light text-sm leading-[1.1875rem] text-ink-secondary">
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
