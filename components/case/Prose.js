/* Prose — the simplest body, and the one most methods use: an optional
   statement set in the display face, then paragraphs.

   Paragraphs run at leading-6 rather than the system's Body/LG 20px. That
   token is sized for short UI copy; at a full measure of running text it
   sets too tight to read comfortably. */
(function () {
  function Prose({ statement, paragraphs = [] }) {
    return (
      <div className="flex flex-col gap-4">
        {statement && (
          <p className="font-heading italic text-ink-primary text-2xl md:text-3xl leading-8 tracking-[-0.03125rem]">
            {statement}
          </p>
        )}
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="font-body font-light text-base leading-6 text-ink-secondary">
            {paragraph}
          </p>
        ))}
      </div>
    );
  }

  window.Prose = Prose;
})();
