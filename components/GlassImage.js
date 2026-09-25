/* GlassImage — artwork sitting in a glass tile.

   The tile is a glass surface with the image as its fill, so if the file
   is missing the surface still reads as designed: the <img> is dropped on
   error rather than leaving a broken frame behind.

   Two ways to size it. Callers that want a fixed band set a height in
   `className` and the image crops to fill it. Callers showing artwork
   whose shape is the point — a 9:16 story, a square post — pass `ratio`
   instead, and the tile takes the artwork's proportions so nothing is
   cropped. `ratio="auto"` lets the file itself set the height.

   The <img> is added once the page has hydrated, not in the pre-rendered
   HTML. Two reasons. An image that failed before hydration would never
   reach `onError` — React was not listening yet — and would leave a broken
   frame. And every tile on the page sits below the first screen, but
   browsers start "lazy" images well before they scroll into view; in the
   HTML they would download alongside the fonts the first screen is
   waiting for. The tile itself is in the HTML, so nothing moves when the
   image arrives. */
(function () {
  const { useEffect, useState } = React;

  function GlassImage({ src, alt, className = "", radius = "var(--radius-md)", ratio }) {
    const [failed, setFailed] = useState(false);
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => setHydrated(true), []);
    const flows = ratio === "auto";

    return (
      <div
        className={"liquid-glass w-full shrink-0 overflow-hidden " + className}
        style={{
          borderRadius: radius,
          aspectRatio: ratio && !flows ? ratio : undefined
        }}
      >
        {hydrated && !failed && (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setFailed(true)}
            className={
              flows
                ? "block h-auto w-full"
                : "absolute inset-0 h-full w-full object-cover"
            }
          />
        )}
      </div>
    );
  }

  window.GlassImage = GlassImage;
})();
