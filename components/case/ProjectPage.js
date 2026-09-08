/* ProjectPage — the Individual Project Template.

   The page is a fold over data: chapters contain methods, each method is a
   MethodBlock wrapping the body its `type` selects. Swap PROJECT for
   another project's data and the whole case study re-renders.

   Chapters run on solid canvas rather than over video. The hero keeps the
   clip, but a long read wants a still ground under it — and the raised
   glass the method cards use needs the black to lift off. */
(function () {
  const motion = window.Motion.motion;
  const FadingVideo = window.FadingVideo;
  const TopBar = window.TopBar;
  const BottomNav = window.BottomNav;
  const Footer = window.Footer;
  const BlurText = window.BlurText;
  const Kicker = window.Kicker;
  const Label = window.Label;
  const Chapter = window.Chapter;
  const MethodBlock = window.MethodBlock;
  const MethodBody = window.MethodBody;
  const ArrowUpRight = window.ArrowUpRight;
  const useReducedMotion = window.useReducedMotion;
  const reveal = window.reveal;
  const PROJECT = window.PROJECT;

  const HERO_VIDEO =
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4";

  const SHELL = "mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16";

  const NAV_ITEMS = PROJECT.chapters.map((chapter) => ({
    id: chapter.id,
    label: chapter.name,
    Icon: window[chapter.icon] || window.Star
  }));

  function Hero() {
    const reduced = useReducedMotion();

    return (
      <section id="overview" className="relative min-h-[86vh] w-full overflow-hidden bg-black scroll-mt-20">
        <FadingVideo
          src={HERO_VIDEO}
          className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top z-0"
          style={{ width: "120%", height: "120%" }}
        />

        <div className={"on-video relative z-10 flex min-h-[86vh] flex-col justify-center gap-6 pt-28 pb-44 sm:py-28 " + SHELL}>
          <motion.div {...reveal(reduced, 0.1)}>
            <Kicker className="font-body text-sm leading-[1.1875rem] text-ink-tertiary">
              {PROJECT.kicker}
            </Kicker>
          </motion.div>

          <BlurText
            as="h1"
            align="left"
            text={PROJECT.title}
            delay={100}
            className="font-heading italic text-ink-primary max-w-[7.64em] text-[2.25rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] leading-[0.9] tracking-[-0.125rem] md:tracking-[-0.1875rem]"
          />

          <motion.p
            {...reveal(reduced, 0.7)}
            className="max-w-[42rem] font-body font-light text-base leading-6 text-ink-primary"
          >
            {PROJECT.summary}
          </motion.p>

          <motion.dl {...reveal(reduced, 0.9)} className="flex flex-wrap gap-x-12 gap-y-5 m-0">
            {PROJECT.meta.map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-1.5">
                <dd className="m-0 font-heading italic text-ink-primary text-2xl leading-7">{value}</dd>
                <dt><Label>{label}</Label></dt>
              </div>
            ))}
          </motion.dl>

          {PROJECT.liveHref && (
            <motion.div {...reveal(reduced, 1.05)}>
              <a
                href={PROJECT.liveHref}
                className="liquid-glass-strong rounded-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium leading-5 text-ink-primary font-body"
              >
                {PROJECT.liveLabel || "View the work"}
                <ArrowUpRight className="h-5 w-5 shrink-0" />
              </a>
            </motion.div>
          )}
        </div>
      </section>
    );
  }

  function ProjectPage() {
    return (
      <React.Fragment>
        <a href="#content" className="skip-link font-body">Skip to content</a>

        <TopBar />

        <main id="content" tabIndex={-1} className="bg-black">
          <Hero />

          <div className={SHELL}>
            {PROJECT.chapters.map((chapter) => (
              <Chapter
                key={chapter.id}
                id={chapter.id}
                number={chapter.number}
                name={chapter.name}
                summary={chapter.summary}
              >
                {chapter.methods.map((method) => (
                  <MethodBlock
                    key={method.method}
                    method={method.method}
                    title={method.title}
                    lede={method.lede}
                    wide={window.isWideMethod(method.type)}
                  >
                    <MethodBody type={method.type} data={method.data} />
                  </MethodBlock>
                ))}
              </Chapter>
            ))}
          </div>
        </main>

        <Footer />

        <BottomNav items={NAV_ITEMS} label="Chapters" />
      </React.Fragment>
    );
  }

  window.ProjectPage = ProjectPage;

  ReactDOM.createRoot(document.getElementById("root")).render(<ProjectPage />);
})();
