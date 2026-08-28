/* CompetitiveMatrix — competitors down, criteria across.

   A real table, so the relationship between a competitor and a criterion
   survives being read a cell at a time. Each mark is a glyph *and* a
   written value: "Full", "Partial", "None" are in the accessible name, so
   the rating never rests on the shape alone. */
(function () {
  const Label = window.Label;
  const ScrollX = window.ScrollX;

  const MARKS = {
    full: { name: "Full", fill: "currentColor", dash: null, half: false },
    partial: { name: "Partial", fill: "none", dash: null, half: true },
    none: { name: "None", fill: "none", dash: "2 2", half: false }
  };

  function Mark({ value, decorative = false }) {
    const spec = MARKS[value] || MARKS.none;

    return (
      <span className="inline-flex items-center justify-center text-ink-primary">
        <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true" focusable="false">
          {spec.half && <path d="M8 1a7 7 0 0 0 0 14z" fill="currentColor" />}
          <circle
            cx="8"
            cy="8"
            r="7"
            fill={spec.fill}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray={spec.dash || undefined}
          />
        </svg>
        {!decorative && <span className="sr-only">{spec.name}</span>}
      </span>
    );
  }

  function CompetitiveMatrix({ criteria = [], competitors = [], caption }) {
    return (
      <div className="flex flex-col gap-4">
        <ScrollX label="Competitive analysis">
          <table className="w-full min-w-max border-collapse text-left">
            {caption && <caption className="sr-only">{caption}</caption>}
            <thead>
              <tr>
                <th scope="col" className="py-3 pr-6 align-bottom">
                  <Label>Competitor</Label>
                </th>
                {criteria.map((criterion) => (
                  <th key={criterion} scope="col" className="px-3 py-3 align-bottom">
                    <Label>{criterion}</Label>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {competitors.map((competitor) => (
                <tr
                  key={competitor.name}
                  className="border-t"
                  style={{ borderColor: "var(--color-border-glass-fade)" }}
                >
                  <th scope="row" className="py-4 pr-6 font-normal align-top">
                    <p className="font-heading italic text-ink-primary text-xl leading-6">{competitor.name}</p>
                    {competitor.note && (
                      <p className="mt-1 font-body font-light text-sm leading-[1.1875rem] text-ink-tertiary max-w-[16rem]">
                        {competitor.note}
                      </p>
                    )}
                  </th>
                  {criteria.map((criterion) => (
                    <td key={criterion} className="px-3 py-4 align-top">
                      <Mark value={(competitor.scores || {})[criterion]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollX>

        <ul className="flex flex-wrap gap-x-6 gap-y-2 list-none m-0 p-0">
          {Object.keys(MARKS).map((key) => (
            <li key={key} className="flex items-center gap-2">
              <Mark value={key} decorative />
              <span className="font-body text-sm leading-[1.1875rem] text-ink-tertiary">{MARKS[key].name}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  window.CompetitiveMatrix = CompetitiveMatrix;
})();
