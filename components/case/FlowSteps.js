/* FlowSteps — a task flow: ordered steps joined by arrows.

   Stacks vertically with a downward arrow on narrow screens and runs
   horizontally with a rightward arrow once there is room, so the sequence
   is always read in the direction the arrows point. Long flows scroll
   inside their own container rather than widening the page.

   `kind` marks a step as start / step / decision / end. It changes the
   badge glyph as well as its fill, so the type of a step never depends on
   the surface alone. */
(function () {
  const ArrowRight = window.ArrowRight;
  const ArrowDown = window.ArrowDown;
  const Label = window.Label;
  const ScrollX = window.ScrollX;

  const KINDS = {
    start: { glyph: "●", name: "Start" },
    step: { glyph: null, name: "Step" },
    decision: { glyph: "◆", name: "Decision" },
    end: { glyph: "■", name: "End" }
  };

  function Badge({ kind, index }) {
    const spec = KINDS[kind] || KINDS.step;
    const filled = kind === "start" || kind === "end";

    return (
      <span
        className={
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-body text-sm leading-none " +
          (filled ? "bg-ink-primary text-black" : "liquid-glass glass-raised text-ink-primary")
        }
      >
        <span aria-hidden="true">{spec.glyph || index}</span>
        <span className="sr-only">{spec.name}</span>
      </span>
    );
  }

  function Connector() {
    return (
      <div aria-hidden="true" className="flex items-center justify-center text-ink-tertiary shrink-0">
        <ArrowDown className="h-5 w-5 sm:hidden" />
        <ArrowRight className="hidden h-5 w-5 sm:block" />
      </div>
    );
  }

  function Step({ step, index }) {
    return (
      <li
        className="liquid-glass glass-raised flex w-full sm:w-[13rem] shrink-0 flex-col gap-3 p-4"
        style={{ borderRadius: "var(--radius-md)" }}
      >
        <div className="flex items-center gap-3">
          <Badge kind={step.kind} index={index} />
          {step.lane && <Label>{step.lane}</Label>}
        </div>

        <p className="font-body text-base leading-5 text-ink-primary">{step.label}</p>

        {step.note && (
          <p className="font-body font-light text-sm leading-[1.1875rem] text-ink-tertiary">{step.note}</p>
        )}
      </li>
    );
  }

  function FlowSteps({ steps = [], label = "Task flow" }) {
    return (
      <ScrollX label={label}>
        <ol className="flex flex-col sm:flex-row sm:items-stretch gap-3 list-none m-0 p-0 sm:w-max">
          {steps.map((step, i) => (
            <React.Fragment key={step.label}>
              {i > 0 && <Connector />}
              <Step step={step} index={i + 1} />
            </React.Fragment>
          ))}
        </ol>
      </ScrollX>
    );
  }

  window.FlowSteps = FlowSteps;
})();
