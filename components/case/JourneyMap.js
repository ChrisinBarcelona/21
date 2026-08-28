/* JourneyMap — phases across, lanes down, with the emotional line drawn
   over the top.

   The curve is an SVG stretched to the column grid (preserveAspectRatio
   none, non-scaling stroke so it does not smear), while the points
   themselves are HTML positioned at the same percentages — a circle in a
   stretched SVG would render as an ellipse.

   Every phase states its feeling in words underneath the point. The curve
   is the second reading of that, never the only one. */
(function () {
  const Label = window.Label;
  const Bullets = window.Bullets;
  const ScrollX = window.ScrollX;

  const CURVE_H = 100;   // SVG user units; the box is stretched to fit
  const PAD = 14;        // keeps the extremes off the edges

  /* feeling runs -2 (low) to +2 (high) */
  const toY = (feeling) => {
    const t = (2 - Math.min(Math.max(feeling, -2), 2)) / 4; // 0 at top
    return PAD + t * (CURVE_H - PAD * 2);
  };

  function EmotionCurve({ phases }) {
    const n = phases.length;
    const width = 1000;
    const x = (i) => ((i + 0.5) / n) * width;
    const points = phases.map((p, i) => `${x(i)},${toY(p.feeling)}`).join(" ");
    const area = `${x(0)},${CURVE_H} ${points} ${x(n - 1)},${CURVE_H}`;

    return (
      <div className="relative h-24 w-full">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox={`0 0 ${width} ${CURVE_H}`}
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          {[-2, 0, 2].map((level) => (
            <line
              key={level}
              x1="0"
              x2={width}
              y1={toY(level)}
              y2={toY(level)}
              stroke="var(--color-border-glass-fade)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          <polygon points={area} fill="rgba(255,255,255,0.06)" />
          <polyline
            points={points}
            fill="none"
            stroke="rgba(255,255,255,0.9)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {phases.map((phase, i) => (
          <span
            key={phase.name}
            aria-hidden="true"
            className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink-primary"
            style={{ left: `${((i + 0.5) / n) * 100}%`, top: `${(toY(phase.feeling) / CURVE_H) * 100}%` }}
          />
        ))}
      </div>
    );
  }

  function JourneyMap({ phases = [], lanes = ["Actions", "Touchpoints", "Thinking"], label = "User journey map" }) {
    /* 12rem is the narrowest a lane cell stays readable at. Five phases
       then fit a 1920 viewport without scrolling; more than that, or a
       smaller screen, and ScrollX takes over. */
    const columns = { gridTemplateColumns: `repeat(${phases.length}, minmax(12rem, 1fr))` };

    return (
      <ScrollX label={label}>
        <div className="min-w-max sm:min-w-0">
          {/* phase headers */}
          <div className="grid gap-3" style={columns}>
            {phases.map((phase, i) => (
              <div
                key={phase.name}
                className="liquid-glass glass-raised flex flex-col gap-1 p-3"
                style={{ borderRadius: "var(--radius-md)" }}
              >
                <Label>Phase {i + 1}</Label>
                <p className="font-heading italic text-ink-primary text-xl leading-6">{phase.name}</p>
              </div>
            ))}
          </div>

          {/* the emotional line, spanning the same columns */}
          <div className="mt-4">
            <EmotionCurve phases={phases} />
          </div>

          <div className="grid gap-3" style={columns}>
            {phases.map((phase) => (
              <p
                key={phase.name}
                className="font-body text-sm leading-[1.1875rem] text-ink-primary text-center"
              >
                {phase.feelingLabel}
              </p>
            ))}
          </div>

          {/* lanes */}
          <div className="mt-6 flex flex-col gap-4">
            {lanes.map((lane) => (
              <div key={lane} className="flex flex-col gap-2">
                <Label>{lane}</Label>
                <div className="grid gap-3" style={columns}>
                  {phases.map((phase) => (
                    <div
                      key={phase.name}
                      className="liquid-glass p-3"
                      style={{ borderRadius: "var(--radius-md)" }}
                    >
                      <Bullets items={phase[lane.toLowerCase()] || []} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollX>
    );
  }

  window.JourneyMap = JourneyMap;
})();
