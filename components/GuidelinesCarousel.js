/* GuidelinesCarousel — the Oak brand guidelines, page by page.

   The deck is the yardstick the assets on this page are measured against,
   so it wants to be flicked through rather than downloaded and opened in
   another tab. Pages are pre-rendered from the PDF as WebP: 55 of them at
   35 KB each, which only stays cheap because just the neighbours are ever
   in the DOM. The full PDF is still linked for anyone who wants the source.

   Three ways in, because the control that feels obvious differs by device:
   the arrows on a pointer, a drag on touch, the arrow keys once the strip
   has focus. */
(function () {
  const { useCallback, useEffect, useRef, useState } = React;
  const motion = window.Motion.motion;
  const AnimatePresence = window.Motion.AnimatePresence;
  const CaretLeft = window.CaretLeft;
  const CaretRight = window.CaretRight;
  const useReducedMotion = window.useReducedMotion;

  const PAGE_COUNT = 55;
  const SRC = (i) => "assets/oak/guidelines/page-" + String(i + 1).padStart(2, "0") + ".webp";

  /* Past this much travel the drag counts as a page turn rather than a
     nudge — roughly a thumb's width, so a scroll that wanders sideways
     doesn't advance the deck. */
  const SWIPE_DISTANCE = 60;
  const SWIPE_VELOCITY = 400;

  function Arrow({ dir, onClick, disabled }) {
    const Icon = dir === "prev" ? CaretLeft : CaretRight;
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-label={dir === "prev" ? "Previous page" : "Next page"}
        className={
          "liquid-glass glass-lift flex h-14 w-14 shrink-0 items-center justify-center rounded-full " +
          "text-ink-primary transition-opacity duration-200 " +
          (disabled ? "opacity-30 cursor-default" : "cursor-pointer")
        }
      >
        <Icon className="h-6 w-6" />
      </button>
    );
  }

  function GuidelinesCarousel() {
    const [page, setPage] = useState(0);
    /* Which way the next slide should enter from. Held separately from
       `page` so a jump from the last page back to the first still animates
       in the direction the reader asked for. */
    const [dir, setDir] = useState(1);
    const reduced = useReducedMotion();
    const liveRef = useRef(null);

    const go = useCallback((next, direction) => {
      if (next < 0 || next >= PAGE_COUNT) return;
      setDir(direction);
      setPage(next);
    }, []);

    const prev = useCallback(() => go(page - 1, -1), [go, page]);
    const next = useCallback(() => go(page + 1, 1), [go, page]);

    /* Decode the neighbours ahead of the request so a turn paints
       immediately instead of flashing the empty glass tile. */
    useEffect(() => {
      [page - 1, page + 1].forEach((i) => {
        if (i < 0 || i >= PAGE_COUNT) return;
        const img = new Image();
        img.src = SRC(i);
      });
    }, [page]);

    const onKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        prev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        next();
      }
    };

    const onDragEnd = (_event, info) => {
      const { offset, velocity } = info;
      if (offset.x < -SWIPE_DISTANCE || velocity.x < -SWIPE_VELOCITY) next();
      else if (offset.x > SWIPE_DISTANCE || velocity.x > SWIPE_VELOCITY) prev();
    };

    const slide = (from) => ({
      initial: reduced ? { opacity: 0 } : { opacity: 0, x: from * 40 },
      animate: reduced ? { opacity: 1 } : { opacity: 1, x: 0 },
      exit: reduced ? { opacity: 0 } : { opacity: 0, x: from * -40 },
      transition: { duration: reduced ? 0.15 : 0.35, ease: "easeOut" }
    });

    const counter = "Page " + (page + 1) + " of " + PAGE_COUNT;

    return (
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Oak National Academy brand guidelines"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="flex flex-col gap-4 rounded-[var(--radius-lg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60"
      >
        <div className="flex items-center gap-4 lg:gap-6">
          <div className="hidden lg:block">
            <Arrow dir="prev" onClick={prev} disabled={page === 0} />
          </div>

          <div
            className="liquid-glass min-w-0 flex-1 p-3 sm:p-6"
            style={{ borderRadius: "var(--radius-lg)" }}
          >
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: "16 / 9", borderRadius: "var(--radius-md)" }}
            >
              <AnimatePresence initial={false} custom={dir} mode="popLayout">
                <motion.img
                  key={page}
                  src={SRC(page)}
                  alt={counter + " of the Oak National Academy brand guidelines"}
                  draggable={false}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.18}
                  onDragEnd={onDragEnd}
                  {...slide(dir)}
                  className="absolute inset-0 h-full w-full cursor-grab object-contain active:cursor-grabbing"
                />
              </AnimatePresence>
            </div>
          </div>

          <div className="hidden lg:block">
            <Arrow dir="next" onClick={next} disabled={page === PAGE_COUNT - 1} />
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 lg:justify-between">
          <div className="lg:hidden">
            <Arrow dir="prev" onClick={prev} disabled={page === 0} />
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-2 lg:mx-16">
            {/* The only progress cue that survives 55 pages — a dot per
                page would be unreadable at any width. */}
            <div className="h-0.5 w-full overflow-hidden rounded-full bg-white/15">
              <motion.div
                className="h-full rounded-full bg-white/70"
                animate={{ width: ((page + 1) / PAGE_COUNT) * 100 + "%" }}
                transition={{ duration: reduced ? 0 : 0.35, ease: "easeOut" }}
              />
            </div>
            <p
              ref={liveRef}
              aria-live="polite"
              className="text-center font-body text-sm leading-[1.1875rem] text-ink-tertiary"
            >
              {counter}
            </p>
          </div>

          <div className="lg:hidden">
            <Arrow dir="next" onClick={next} disabled={page === PAGE_COUNT - 1} />
          </div>
        </div>
      </div>
    );
  }

  window.GuidelinesCarousel = GuidelinesCarousel;
})();
