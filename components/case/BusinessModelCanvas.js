/* BusinessModelCanvas — Osterwalder's nine blocks in their canonical
   arrangement: partners, activities and resources on the left, the value
   proposition centre, relationships and channels leading out to segments
   on the right, with cost and revenue underneath.

   The arrangement is the meaning here, so the desktop grid is explicit
   template areas rather than a flow. Below `lg` it becomes a single
   column in reading order, which is the order the blocks are numbered in
   the method anyway. */
(function () {
  const Label = window.Label;
  const Bullets = window.Bullets;

  const CELLS = [
    { key: "partners", heading: "Key Partners" },
    { key: "activities", heading: "Key Activities" },
    { key: "resources", heading: "Key Resources" },
    { key: "value", heading: "Value Propositions" },
    { key: "relationships", heading: "Customer Relationships" },
    { key: "channels", heading: "Channels" },
    { key: "segments", heading: "Customer Segments" },
    { key: "cost", heading: "Cost Structure" },
    { key: "revenue", heading: "Revenue Streams" }
  ];

  function BusinessModelCanvas({ blocks = {} }) {
    return (
      <div className="bmc-grid">
        {CELLS.map(({ key, heading }) => (
          <section
            key={key}
            className="liquid-glass glass-raised flex flex-col gap-3 p-4"
            style={{ borderRadius: "var(--radius-md)", gridArea: key }}
          >
            <h4 className="m-0">
              <Label>{heading}</Label>
            </h4>
            <Bullets items={blocks[key] || []} />
          </section>
        ))}
      </div>
    );
  }

  window.BusinessModelCanvas = BusinessModelCanvas;
})();
