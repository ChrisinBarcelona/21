/* GlassImage — artwork sitting in a glass tile.

   The tile is a glass surface with the image as its fill, so if the file
   is missing the surface still reads as designed: the <img> is dropped on
   error rather than leaving a broken frame behind. Callers set the height;
   the image always fills and crops. */
(function () {
  const { useState } = React;

  function GlassImage({ src, alt, className = "", radius = "var(--radius-md)" }) {
    const [failed, setFailed] = useState(false);

    return (
      <div
        className={"liquid-glass w-full shrink-0 overflow-hidden " + className}
        style={{ borderRadius: radius }}
      >
        {!failed && (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setFailed(true)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </div>
    );
  }

  window.GlassImage = GlassImage;
})();
