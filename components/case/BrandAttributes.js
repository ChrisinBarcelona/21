/* BrandAttributes — tag chips plus bipolar scales.

   Each scale is a track with a marker between two named poles. The poles
   are always written out, so the marker's position is a second reading of
   something already stated in words rather than the only carrier. */
(function () {
  const Chip = window.Chip;
  const Label = window.Label;

  function Scale({ from, to, value, note }) {
    const pct = Math.round(Math.min(Math.max(value, 0), 1) * 100);

    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-4">
          <Label>{from}</Label>
          <Label className="text-right">{to}</Label>
        </div>

        <div
          className="liquid-glass relative h-2 w-full"
          role="img"
          aria-label={`${from} to ${to}: ${pct}% toward ${to}`}
          style={{ borderRadius: "9999px" }}
        >
          <span
            aria-hidden="true"
            className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink-primary"
            style={{ left: pct + "%" }}
          />
        </div>

        {note && (
          <p className="font-body font-light text-sm leading-[1.1875rem] text-ink-tertiary">{note}</p>
        )}
      </div>
    );
  }

  function BrandAttributes({ chips = [], scales = [] }) {
    return (
      <div className="flex flex-col gap-7">
        {chips.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {chips.map((chip) => (
              <Chip key={chip}>{chip}</Chip>
            ))}
          </div>
        )}

        {scales.length > 0 && (
          <div className="flex flex-col gap-6">
            {scales.map((scale) => (
              <Scale key={scale.from + scale.to} {...scale} />
            ))}
          </div>
        )}
      </div>
    );
  }

  window.BrandAttributes = BrandAttributes;
})();
