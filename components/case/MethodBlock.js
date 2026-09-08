/* MethodBlock — the repeatable unit of a case study.

   Every UX method on the page is this block: a kicker naming the method, a
   title, an optional lede, and a body. Only the body differs per method,
   which is what keeps twelve very different research artefacts reading as
   one system. Bodies are registered in MethodBody, keyed by `type`.

   The card sits on the raised 5% glass rather than the 1% used over video:
   the case study runs on solid canvas below the hero, where the subtle
   surface has nothing to lift it off the black. */
(function () {
  const motion = window.Motion.motion;
  const Kicker = window.Kicker;
  const useReducedMotion = window.useReducedMotion;
  const revealOnScroll = window.revealOnScroll;

  const KICKER = "font-body text-sm leading-[1.1875rem] text-ink-tertiary";

  function MethodBlock({ method, title, lede, wide = false, children }) {
    const reduced = useReducedMotion();

    return (
      <motion.article
        {...revealOnScroll(reduced, 0.1)}
        className="liquid-glass glass-raised flex flex-col gap-5 p-6 md:p-8"
        style={{ borderRadius: "var(--radius-lg)" }}
      >
        <header className="flex flex-col gap-3">
          <Kicker className={KICKER}>{method}</Kicker>

          <h3 className="font-heading italic text-ink-primary text-3xl md:text-4xl leading-9 tracking-[-0.0625rem]">
            {title}
          </h3>

          {lede && (
            <p className="font-body font-light text-base leading-5 text-ink-secondary max-w-[42rem]">
              {lede}
            </p>
          )}
        </header>

        {children && <div className={wide ? "" : "max-w-[48rem]"}>{children}</div>}
      </motion.article>
    );
  }

  /* Chapter — the numbered divider between groups of methods. Deliberately
     the same shape as the home page's section headers (kicker over a large
     italic serif line), so a case study reads as the same site. */
  function Chapter({ id, number, name, summary, children }) {
    const reduced = useReducedMotion();
    const headingId = id + "-heading";

    return (
      <section id={id} aria-labelledby={headingId} className="scroll-mt-20 py-14">
        <motion.div {...revealOnScroll(reduced)} className="flex flex-col gap-4">
          <Kicker className={KICKER}>
            Chapter {String(number).padStart(2, "0")}
          </Kicker>

          <h2
            id={headingId}
            className="font-heading italic text-ink-primary text-4xl md:text-5xl lg:text-[3.75rem] leading-[0.9] tracking-[-0.125rem] lg:tracking-[-0.1875rem]"
          >
            {name}
          </h2>

          {summary && (
            <p className="font-body font-light text-base leading-5 text-ink-secondary max-w-[42rem]">
              {summary}
            </p>
          )}

          <div className="mt-2 h-px w-full" style={{ background: "var(--color-border-glass-fade)" }} />
        </motion.div>

        <div className="mt-8 flex flex-col gap-6">{children}</div>
      </section>
    );
  }

  window.MethodBlock = MethodBlock;
  window.Chapter = Chapter;
})();
