/* PersonaCard — the person the work is for. Portrait and voice on the
   left, evidence on the right. */
(function () {
  const GlassImage = window.GlassImage;
  const Label = window.Label;
  const Bullets = window.Bullets;
  const Tile = window.Tile;

  function Trait({ label, value }) {
    const pct = Math.round(Math.min(Math.max(value, 0), 1) * 100);

    return (
      <div className="flex flex-col gap-1.5">
        <div className="flex items-baseline justify-between gap-3">
          <Label>{label}</Label>
          <span className="font-body text-[0.6875rem] leading-[0.875rem] text-ink-tertiary">{pct}%</span>
        </div>
        <div className="liquid-glass h-1.5 w-full" style={{ borderRadius: "9999px" }}>
          <span
            aria-hidden="true"
            className="block h-full rounded-full bg-ink-secondary"
            style={{ width: pct + "%" }}
          />
        </div>
      </div>
    );
  }

  function PersonaCard({ name, role, portrait, quote, demographics = [], goals = [], frustrations = [], traits = [] }) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-[18rem_1fr] gap-6">
        <div className="flex flex-col gap-4">
          {portrait && <GlassImage src={portrait.src} alt={portrait.alt} className="h-[14rem]" />}

          <div className="flex flex-col gap-1">
            <p className="font-heading italic text-ink-primary text-2xl leading-7">{name}</p>
            <Label>{role}</Label>
          </div>

          {quote && (
            <blockquote className="m-0 border-0 p-0">
              <p className="font-heading italic text-ink-secondary text-xl leading-7">&ldquo;{quote}&rdquo;</p>
            </blockquote>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {demographics.length > 0 && (
            <Tile>
              <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 m-0">
                {demographics.map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-1">
                    <dt><Label>{label}</Label></dt>
                    <dd className="m-0 font-body font-light text-sm leading-[1.1875rem] text-ink-secondary">{value}</dd>
                  </div>
                ))}
              </dl>
            </Tile>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {goals.length > 0 && (
              <Tile className="flex flex-col gap-3">
                <Label>Goals</Label>
                <Bullets items={goals} />
              </Tile>
            )}
            {frustrations.length > 0 && (
              <Tile className="flex flex-col gap-3">
                <Label>Frustrations</Label>
                <Bullets items={frustrations} />
              </Tile>
            )}
          </div>

          {traits.length > 0 && (
            <Tile className="flex flex-col gap-4">
              <Label>Behaviour</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {traits.map((trait) => (
                  <Trait key={trait.label} {...trait} />
                ))}
              </div>
            </Tile>
          )}
        </div>
      </div>
    );
  }

  window.PersonaCard = PersonaCard;
})();
