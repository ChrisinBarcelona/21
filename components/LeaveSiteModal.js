/* LeaveSiteModal — the interstitial between a portfolio card and the live
   site it points at.

   A card's CTA used to hand the reader straight off to a client's domain.
   That is a surprise on a page they came to read: nine cards on the
   section and any press on one of them is a departure. So the press opens
   this instead — it names where the link goes, and offers staying as the
   first and focused choice. Nothing here is a warning; the site is ours
   and it is fine. It is a beat in which to change your mind.

   Role `alertdialog` rather than `dialog`: the reader is being asked to
   confirm, and the pattern names the two answers. `Stay here` takes focus
   on open, so Enter and Escape agree.

   The mechanics are ContactModal's — body locked behind it, focus taken
   on open and handed back to the card on close, Tab trapped inside,
   Escape closes, portalled to <body> so the floating nav cannot draw over
   it. One difference, and it goes the other way: a press on the backdrop
   does close this one. There is nothing in here to lose, and a click
   beside a question about leaving is a decision to stay. */
(function () {
  const { useCallback, useEffect, useRef } = React;
  const motion = window.Motion.motion;
  const Kicker = window.Kicker;
  const ArrowUpRight = window.ArrowUpRight;
  const useReducedMotion = window.useReducedMotion;

  function LeaveSiteModal({ site, onClose }) {
    const reduced = useReducedMotion();
    const dialogRef = useRef(null);
    const stayRef = useRef(null);
    const openerRef = useRef(null);

    const href = "https://" + site.domain;

    /* The card that opened this gets focus back on the way out. */
    useEffect(() => {
      openerRef.current = document.activeElement;
      stayRef.current && stayRef.current.focus();
      return () => {
        const opener = openerRef.current;
        if (opener && typeof opener.focus === "function") opener.focus();
      };
    }, []);

    /* Hold the page behind the dialog still. Padding replaces the
       scrollbar's width so the layout underneath doesn't jump. */
    useEffect(() => {
      const { body, documentElement } = document;
      const previousOverflow = body.style.overflow;
      const previousPadding = body.style.paddingRight;
      const gap = window.innerWidth - documentElement.clientWidth;
      body.style.overflow = "hidden";
      if (gap > 0) body.style.paddingRight = gap + "px";
      return () => {
        body.style.overflow = previousOverflow;
        body.style.paddingRight = previousPadding;
      };
    }, []);

    /* Escape listens on the document rather than on the dialog. A press
       on the backdrop leaves focus on <body>, and a handler that waited
       for the event to bubble out of the dialog would never hear it. */
    useEffect(() => {
      const onEscape = (event) => {
        if (event.key === "Escape") onClose();
      };
      document.addEventListener("keydown", onEscape);
      return () => document.removeEventListener("keydown", onEscape);
    }, [onClose]);

    const onKeyDown = useCallback((event) => {
      if (event.key !== "Tab") return;

      const focusable = dialogRef.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }, []);

    /* Closed on the next task rather than in the handler. The anchor is
       still the element the browser is acting on while this click is
       being dispatched, and unmounting it there can lose the navigation
       with it. */
    const onFollow = () => {
      window.setTimeout(onClose, 0);
    };

    return ReactDOM.createPortal(
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduced ? 0.15 : 0.3, ease: "easeOut" }}
        onClick={onClose}
        className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto overscroll-contain bg-black/80 p-4 sm:p-6"
      >
        <motion.div
          ref={dialogRef}
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="leave-site-title"
          aria-describedby="leave-site-destination"
          onKeyDown={onKeyDown}
          onClick={(event) => event.stopPropagation()}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: reduced ? 0.15 : 0.35, ease: "easeOut" }}
          className="relative m-auto w-full max-w-[30rem]"
        >
          {/* Filled rather than glass alone, as the contact dialog is: the
              1%-white surface separates by blur, which holds for a card on
              a chosen ground but not for a panel opening over whatever the
              reader happened to be looking at. */}
          <div
            className="liquid-glass-strong p-6 sm:p-8"
            style={{ borderRadius: "var(--radius-lg)", background: "rgba(0, 0, 0, 0.88)" }}
          >
            <div className="flex flex-col gap-4">
              <Kicker className="font-body text-sm leading-[1.1875rem] text-ink-tertiary">
                Leaving chriskelly.it
              </Kicker>

              <h2
                id="leave-site-title"
                className="font-heading italic text-ink-primary text-3xl md:text-4xl leading-9 tracking-[-0.0625rem]"
              >
                You are about to leave and go to the live site for &ldquo;{site.name}&rdquo;
              </h2>

              <p
                id="leave-site-destination"
                className="font-body font-light text-sm leading-[1.1875rem] text-ink-secondary"
              >
                <span className="break-all text-ink-primary">{site.domain}</span> opens
                in a new tab, so this page stays where it is.
              </p>
            </div>

            {/* Stay first, and focused. The reader is one press from a
                decision they did not come here to make, so the safe answer
                is the default one. */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                ref={stayRef}
                type="button"
                onClick={onClose}
                className="liquid-glass glass-lift flex items-center justify-center rounded-full px-6 py-3 font-body text-sm font-medium leading-5 text-ink-primary"
              >
                Stay here
              </button>

              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onFollow}
                aria-label={"See the " + site.name + " website at " + site.domain + " (opens in a new tab)"}
                className="liquid-glass-strong glass-lift flex items-center justify-center gap-2 rounded-full px-6 py-3 font-body text-sm font-medium leading-5 text-ink-primary"
              >
                <span>See {site.name} website</span>
                <ArrowUpRight className="h-5 w-5 shrink-0" />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>,
      document.body
    );
  }

  window.LeaveSiteModal = LeaveSiteModal;
})();
