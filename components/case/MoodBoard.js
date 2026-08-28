/* MoodBoard — a grid of reference imagery. Tiles carry their own glass, so
   a board with missing files still reads as a composed board rather than a
   row of broken frames. */
(function () {
  const GlassImage = window.GlassImage;

  function MoodBoard({ images = [], caption }) {
    return (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image) => (
            <figure key={image.src} className={"m-0 flex flex-col gap-2 " + (image.wide ? "col-span-2" : "")}>
              <GlassImage
                src={image.src}
                alt={image.alt}
                className={image.wide ? "h-[10rem] md:h-[13rem]" : "h-[10rem] md:h-[13rem]"}
              />
              {image.caption && (
                <figcaption className="font-body font-light text-sm leading-[1.1875rem] text-ink-tertiary">
                  {image.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>

        {caption && (
          <p className="font-body font-light text-sm leading-[1.1875rem] text-ink-tertiary">{caption}</p>
        )}
      </div>
    );
  }

  window.MoodBoard = MoodBoard;
})();
