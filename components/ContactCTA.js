/* ContactCTA — the hero's "Let's talk".

   A `mailto:` is a request to the operating system, not a navigation, and
   the browser has no way to tell the page whether anyone answered. On a
   phone someone always does: the screenshot of iOS offering "Gmail /
   Default mail app" is the handoff working exactly as intended. On a
   desktop where no mail client is registered — which is most people who
   live in webmail — the click does nothing at all, silently. No error, no
   dialog, no way for the page to know.

   So the link stays a link, and the page watches to see whether it landed.
   Clicking starts a short timer. Any real handoff — an app taking focus,
   an OS "choose an application" dialog, a tab switch — blurs this window
   or hides the document, and that cancels the timer. If neither happens
   inside HANDOFF_MS, nothing opened, and the panel offers the two ways out
   that need no mail client: copy the address, or compose in Gmail.

   The wait only runs on a fine pointer. Touch devices always have a mail
   app, and an iOS sheet like the one above draws over a page that is still
   visible and still focused — the timer would fire behind it and put a
   panel under a sheet that is already doing the right thing.

   The timer is deliberately generous. Firing late costs a reader nothing;
   firing early puts a panel in front of someone whose mail app was simply
   slow to launch. */
(function () {
  const { useCallback, useEffect, useRef, useState } = React;
  const motion = window.Motion.motion;
  const AnimatePresence = window.Motion.AnimatePresence;
  const Play = window.Play;
  const X = window.X;
  const ArrowUpRight = window.ArrowUpRight;
  const useReducedMotion = window.useReducedMotion;

  const ADDRESS = "chris@chriskelly.it";
  const SUBJECT = "Project enquiry";
  const BODY = ["Hi Chris,", "", "I'd like to discuss a project with you.", "", ""].join("\r\n");

  /* encodeURIComponent leaves !'()* alone. Legal in a query, but not
     uniformly handled once a mail client re-parses the string — the
     apostrophe in "I'd" is the one that matters here. */
  const enc = (value) =>
    encodeURIComponent(value).replace(
      /[!'()*]/g,
      (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase()
    );

  /* CRLF per RFC 6068: Outlook renders a lone %0A as one run-on line. */
  const MAILTO =
    "mailto:" + ADDRESS + "?subject=" + enc(SUBJECT) + "&body=" + enc(BODY);

  /* Gmail's compose deep link takes the same three fields, so the reader
     who lands here gets the identical half-written message. */
  const GMAIL =
    "https://mail.google.com/mail/?view=cm&fs=1&to=" + enc(ADDRESS) +
    "&su=" + enc(SUBJECT) + "&body=" + enc(BODY);

  const HANDOFF_MS = 1500;
  const COPIED_MS = 2400;
  const CLEARANCE = 260;

  function ContactCTA() {
    const reduced = useReducedMotion();
    const [stalled, setStalled] = useState(false);
    const [above, setAbove] = useState(false);
    const [copied, setCopied] = useState(false);
    const timer = useRef(null);
    const copiedTimer = useRef(null);
    const panelRef = useRef(null);
    const linkRef = useRef(null);

    const cancel = useCallback(() => {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
    }, []);

    /* The handoff, whatever form it takes, costs this window its focus. */
    useEffect(() => {
      window.addEventListener("blur", cancel);
      document.addEventListener("visibilitychange", cancel);
      return () => {
        window.removeEventListener("blur", cancel);
        document.removeEventListener("visibilitychange", cancel);
        cancel();
        if (copiedTimer.current) clearTimeout(copiedTimer.current);
      };
    }, [cancel]);

    const close = useCallback(() => {
      setStalled(false);
      const link = linkRef.current;
      if (link) link.focus({ preventScroll: true });
    }, []);

    /* Escape closes it, and so does a press anywhere outside — the panel is
       an offer, not a step the reader has to clear. */
    useEffect(() => {
      if (!stalled) return;
      const onKeyDown = (event) => {
        if (event.key === "Escape") close();
      };
      const onPointerDown = (event) => {
        const panel = panelRef.current;
        if (panel && !panel.contains(event.target)) close();
      };
      document.addEventListener("keydown", onKeyDown);
      document.addEventListener("pointerdown", onPointerDown);
      if (panelRef.current) panelRef.current.focus({ preventScroll: true });
      return () => {
        document.removeEventListener("keydown", onKeyDown);
        document.removeEventListener("pointerdown", onPointerDown);
      };
    }, [stalled, close]);

    const watchForHandoff = () => {
      const fine = window.matchMedia && window.matchMedia("(pointer: fine)").matches;
      if (!fine) return;
      cancel();
      timer.current = setTimeout(() => {
        /* Which side has room. Measured before the panel exists, so both
           state changes land in one render and it never paints downward
           and then jump. CLEARANCE is the panel at its tallest plus the
           floating nav it must not open behind. */
        const link = linkRef.current;
        const room = link ? window.innerHeight - link.getBoundingClientRect().bottom : Infinity;
        setAbove(room < CLEARANCE);
        setStalled(true);
      }, HANDOFF_MS);
    };

    const copy = () => {
      const done = () => {
        setCopied(true);
        if (copiedTimer.current) clearTimeout(copiedTimer.current);
        copiedTimer.current = setTimeout(() => setCopied(false), COPIED_MS);
      };
      /* Needs a secure context and permission. Where it is refused the
         address above is still plain, selectable text. */
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(ADDRESS).then(done, () => setCopied(false));
      }
    };

    const from = above ? 8 : -8;
    const panel = reduced
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
      : {
          initial: { opacity: 0, y: from, filter: "blur(6px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          exit: { opacity: 0, y: from, filter: "blur(6px)" }
        };

    return (
      <div className="relative">
        <a
          ref={linkRef}
          href={MAILTO}
          onClick={watchForHandoff}
          className="rounded-full flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium leading-5 text-ink-primary font-body"
        >
          Let&rsquo;s talk
          <Play className="h-5 w-5 shrink-0" />
        </a>

        <AnimatePresence>
          {stalled && (
            <motion.div
              {...panel}
              transition={{ duration: reduced ? 0.15 : 0.3, ease: "easeOut" }}
              /* Positioned out here because `.liquid-glass-strong` sets
                 `position: relative` and loads after Tailwind, so it would
                 win over an `absolute` class on the same element. Above the
                 floating nav's z-50, which would otherwise draw over a panel
                 that opens downward on a short window. */
              className={
                "absolute left-1/2 z-[60] -translate-x-1/2 " +
                (above ? "bottom-full mb-3" : "top-full mt-3")
              }
              /* The one surface on the page that is filled rather than
                 purely glass. Everything else wearing `--color-bg-glass`
                 (1% white, separated by blur alone) carries large type over
                 chosen ground; this panel is 14px, and it opens wherever
                 the reader happens to be — over the headline on a short
                 window, over the brightest frame of the starfield on any
                 window. The fill sits behind the glass, so the hairline
                 ring and the shadow still read as the rest of the system. */
              style={{
                width: "min(20rem, calc(100vw - 3rem))",
                background: "rgba(0, 0, 0, 0.82)",
                borderRadius: "var(--radius-md)"
              }}
            >
              <div
                ref={panelRef}
                role="dialog"
                aria-label="Other ways to email"
                tabIndex={-1}
                className="liquid-glass-strong flex flex-col gap-3 p-4 text-left"
                style={{ borderRadius: "var(--radius-md)" }}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-body text-sm leading-[1.1875rem] text-ink-secondary">
                    No mail app opened. You can reach us at:
                  </p>
                  <button
                    type="button"
                    onClick={close}
                    aria-label="Close"
                    className="shrink-0 rounded-full p-1 text-ink-tertiary transition-colors duration-200 hover:text-ink-primary"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <p className="select-all break-all font-body text-sm font-medium leading-[1.1875rem] text-ink-primary">
                  {ADDRESS}
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={copy}
                    className="liquid-glass glass-lift rounded-full px-4 py-2 font-body text-sm font-medium leading-5 text-ink-primary"
                  >
                    {copied ? "Copied" : "Copy address"}
                  </button>

                  <a
                    href={GMAIL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="liquid-glass glass-lift flex items-center gap-2 rounded-full px-4 py-2 font-body text-sm font-medium leading-5 text-ink-primary"
                  >
                    Open in Gmail
                    <ArrowUpRight className="h-4 w-4 shrink-0" />
                  </a>
                </div>

                {/* The copy button reports itself rather than relying on the
                    label change alone, which a screen reader may not revisit. */}
                <p aria-live="polite" className="sr-only">
                  {copied ? "Address copied to the clipboard" : ""}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  window.ContactCTA = ContactCTA;
})();
