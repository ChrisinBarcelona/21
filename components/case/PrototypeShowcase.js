/* PrototypeShowcase — the built artefact. A large glass frame holding the
   screens, a caption, and a link out to the working prototype. */
(function () {
  const GlassImage = window.GlassImage;
  const ArrowUpRight = window.ArrowUpRight;
  const Label = window.Label;

  function PrototypeShowcase({ frames = [], href, linkLabel = "Open prototype", note }) {
    return (
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {frames.map((frame) => (
            <figure key={frame.src} className="m-0 flex flex-col gap-3">
              <GlassImage src={frame.src} alt={frame.alt} className="h-[18rem]" />
              {frame.caption && (
                <figcaption>
                  <Label>{frame.caption}</Label>
                </figcaption>
              )}
            </figure>
          ))}
        </div>

        {note && (
          <p className="font-body font-light text-base leading-6 text-ink-secondary">{note}</p>
        )}

        {href && (
          <div>
            <a
              href={href}
              className="liquid-glass-strong rounded-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium leading-5 text-ink-primary font-body"
            >
              {linkLabel}
              <ArrowUpRight className="h-5 w-5 shrink-0" />
            </a>
          </div>
        )}
      </div>
    );
  }

  window.PrototypeShowcase = PrototypeShowcase;
})();
