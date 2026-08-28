/* UXSummary — how the project actually went.

   The outcome row reuses the stat pattern from the design system's own
   cover: a value in the display face over a small wide-tracked label. */
(function () {
  const Label = window.Label;
  const Bullets = window.Bullets;
  const Tile = window.Tile;

  function UXSummary({ outcomes = [], columns = [] }) {
    return (
      <div className="flex flex-col gap-8">
        {outcomes.length > 0 && (
          <dl className="flex flex-wrap gap-x-12 gap-y-6 m-0">
            {outcomes.map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-2">
                <dd className="m-0 font-heading italic text-ink-primary text-4xl leading-9 tracking-[-0.0625rem]">
                  {value}
                </dd>
                <dt>
                  <Label>{label}</Label>
                </dt>
              </div>
            ))}
          </dl>
        )}

        {columns.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {columns.map(({ heading, items }) => (
              <Tile key={heading} className="flex flex-col gap-3">
                <Label>{heading}</Label>
                <Bullets items={items} />
              </Tile>
            ))}
          </div>
        )}
      </div>
    );
  }

  window.UXSummary = UXSummary;
})();
