/* Primitives — the small shared parts the method bodies are built from, so
   a lane label in the journey map and a cell heading in the business model
   canvas are demonstrably the same thing. */
(function () {
  /* Tile — a nested surface inside a MethodBlock. One step brighter than
     the card it sits in, so nesting stays legible without a second border
     treatment.

     No `...rest` here on purpose: Babel-standalone compiles object-rest
     destructuring to a top-level `const _excluded`, and every file on this
     page shares one global scope, so a second one is a redeclaration that
     kills the whole script. FadingVideo already owns the only one. */
  function Tile({ className = "", children }) {
    return (
      <div
        className={"liquid-glass p-4 " + className}
        style={{ borderRadius: "var(--radius-md)" }}
      >
        {children}
      </div>
    );
  }

  /* Lane label / cell heading: Barlow, uppercase, wide-tracked. The one
     place the system uses uppercase — it marks structural labels apart
     from content without needing another colour. */
  function Label({ children, className = "" }) {
    return (
      <p
        className={
          "font-body font-medium uppercase text-[0.6875rem] leading-[0.875rem] tracking-[0.08em] text-ink-tertiary " +
          className
        }
      >
        {children}
      </p>
    );
  }

  function Body({ children, className = "" }) {
    return (
      <p className={"font-body font-light text-sm leading-[1.1875rem] text-ink-secondary " + className}>
        {children}
      </p>
    );
  }

  /* A bulleted list that keeps the bullet out of the accessible name. */
  function Bullets({ items, className = "" }) {
    return (
      <ul className={"flex flex-col gap-1.5 list-none m-0 p-0 " + className}>
        {items.map((item) => (
          <li key={item} className="flex gap-2 font-body font-light text-sm leading-[1.1875rem] text-ink-secondary">
            <span aria-hidden="true" className="text-ink-tertiary select-none">&middot;</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  /* Chip — a small pill for tags and attributes. */
  function Chip({ children }) {
    return (
      <span className="liquid-glass rounded-full px-3 py-1 font-body text-sm leading-[1.1875rem] text-ink-secondary">
        {children}
      </span>
    );
  }

  /* Wide content — a journey map, a flow, a matrix — scrolls inside its own
     container rather than pushing the page sideways. */
  function ScrollX({ children, label }) {
    return (
      <div
        className="overflow-x-auto -mx-2 px-2 pb-2"
        tabIndex={0}
        role="group"
        aria-label={label}
      >
        {children}
      </div>
    );
  }

  window.Tile = Tile;
  window.Label = Label;
  window.Body = Body;
  window.Bullets = Bullets;
  window.Chip = Chip;
  window.ScrollX = ScrollX;
})();
