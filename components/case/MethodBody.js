/* MethodBody — the registry that turns a data entry into its body.

   This is the seam that makes the template repeatable: a case study is
   data, and adding a new UX method means writing one body component and
   adding one line here. Nothing else on the page changes. */
(function () {
  const BODIES = {
    prose: window.Prose,
    flow: window.FlowSteps,
    journey: window.JourneyMap,
    canvas: window.BusinessModelCanvas,
    matrix: window.CompetitiveMatrix,
    persona: window.PersonaCard,
    attributes: window.BrandAttributes,
    moodboard: window.MoodBoard,
    prototype: window.PrototypeShowcase,
    summary: window.UXSummary
  };

  /* Bodies that want the full card width rather than the reading measure. */
  const WIDE = new Set(["flow", "journey", "canvas", "matrix", "persona", "moodboard", "prototype", "summary"]);

  function MethodBody({ type, data }) {
    const Body = BODIES[type];

    if (!Body) {
      /* A typo in the data should be visible while authoring rather than
         silently rendering an empty card. */
      return (
        <p className="font-body text-sm leading-[1.1875rem] text-ink-tertiary">
          No body registered for method type &ldquo;{type}&rdquo;.
        </p>
      );
    }

    return <Body {...data} />;
  }

  window.MethodBody = MethodBody;
  window.isWideMethod = (type) => WIDE.has(type);
})();
