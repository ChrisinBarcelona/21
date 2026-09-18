/* ContactModal — "Let's talk", as a dialog.

   A mailto hands the message to the operating system and hopes. On a
   phone that works; on a desktop with no mail client registered it does
   nothing at all, silently, which is why this exists instead. The form
   posts to Web3Forms, so the message arrives whatever the reader has
   installed, and the page can say plainly whether it went.

   The dialog mechanics are the case study's, deliberately: body locked
   behind it, focus taken on open and handed back to the button on close,
   Tab trapped inside, Escape closes, portalled to the body so the
   floating nav cannot draw over it.

   One difference from that dialog: a press on the backdrop does not
   close this one. There is typing in here to lose, and a stray click
   beside a form is not a request to discard it. The X and Escape remain.

   Because Web3Forms takes a public key, the spam check is the thing
   standing between this form and a bot: the question in WORD, plus the
   honeypot Web3Forms reads on its own. */
(function () {
  const { useCallback, useEffect, useRef, useState } = React;
  const motion = window.Motion.motion;
  const Kicker = window.Kicker;
  const X = window.X;
  const ArrowUpRight = window.ArrowUpRight;
  const useReducedMotion = window.useReducedMotion;

  /* ------------------------------------------------------------------
     The Web3Forms access key. Get one free at https://web3forms.com by
     entering chris@chriskelly.it — they send the key by mail — and paste
     it between the quotes. Nothing else needs changing, and the form is
     live on the next deploy.

     The key is public in the page source. That is how Web3Forms works:
     it identifies the destination, it is not a secret, and it can only
     ever deliver to the address it was issued for. It is also why the
     question below matters. Replacing it is the whole of changing where
     this form delivers.
     ------------------------------------------------------------------ */
  const ACCESS_KEY = "a42577b9-4743-4276-89fd-e3a07e1272fc";

  const ENDPOINT = "https://api.web3forms.com/submit";
  const ADDRESS = "chris@chriskelly.it";

  const DEFAULT_SUBJECT = "Project enquiry";
  const DEFAULT_MESSAGE = "Hi Chris,\n\nI'd like to discuss a project with you.";

  /* The spam check. Spelled out rather than "2 + 2" so a naive bot
     filling number fields has nothing to pattern-match, and compared
     case-insensitively — FOUR, four and Four all pass. */
  const QUESTION = "What is two plus two, written as a word?";
  const ANSWER = "four";

  /* Glass does not render on an <input> or a <textarea>: the ring is a
     ::before, and neither element reliably carries one. So the surface
     goes on a wrapper and the control sits bare inside it, which is also
     what lets the focus ring trace the whole field rather than the text
     box — `.field` in system.css. */
  function Field({ id, label, children }) {
    return (
      <div className="flex flex-col gap-2">
        <label
          htmlFor={id}
          className="font-body text-sm leading-[1.1875rem] text-ink-tertiary"
        >
          {label}
        </label>
        <div
          className="field liquid-glass"
          style={{ borderRadius: "var(--radius-md)" }}
        >
          {children}
        </div>
      </div>
    );
  }

  const CONTROL =
    "w-full bg-transparent px-4 py-3 font-body text-sm leading-5 " +
    "text-ink-primary placeholder:text-ink-tertiary focus:outline-none";

  function ContactModal({ onClose }) {
    const reduced = useReducedMotion();
    const dialogRef = useRef(null);
    const closeRef = useRef(null);
    const quizRef = useRef(null);
    const doneRef = useRef(null);
    const openerRef = useRef(null);

    /* idle | sending | sent | error */
    const [status, setStatus] = useState("idle");
    const [quizWrong, setQuizWrong] = useState(false);

    useEffect(() => {
      openerRef.current = document.activeElement;
      closeRef.current && closeRef.current.focus();
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
       on the backdrop leaves focus on <body>, and a handler that waits
       for the event to bubble out of the dialog would never hear it. */
    useEffect(() => {
      const onEscape = (event) => {
        if (event.key === "Escape") onClose();
      };
      document.addEventListener("keydown", onEscape);
      return () => document.removeEventListener("keydown", onEscape);
    }, [onClose]);

    /* And if focus does get out — the backdrop, a browser's own find bar,
       anything — it comes straight back. Tab alone cannot be trusted to
       keep it here when it never started here. */
    useEffect(() => {
      const onFocusIn = (event) => {
        const dialog = dialogRef.current;
        if (dialog && !dialog.contains(event.target)) {
          closeRef.current && closeRef.current.focus();
        }
      };
      document.addEventListener("focusin", onFocusIn);
      return () => document.removeEventListener("focusin", onFocusIn);
    }, []);

    const onKeyDown = useCallback(
      (event) => {
        if (event.key !== "Tab") return;

        const focusable = dialogRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"])'
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
      },
      []
    );

    const onSubmit = (event) => {
      event.preventDefault();
      const form = event.target;
      const data = new FormData(form);

      /* The browser has already held back anything `required` or
         malformed, so by here only the question is left to check. */
      if (String(data.get("quiz")).trim().toLowerCase() !== ANSWER) {
        setQuizWrong(true);
        if (quizRef.current) quizRef.current.focus();
        return;
      }
      setQuizWrong(false);
      setStatus("sending");

      fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
          botcheck: data.get("botcheck") || ""
        })
      })
        .then((response) => response.json())
        .then((result) => setStatus(result && result.success ? "sent" : "error"))
        .catch(() => setStatus("error"));
    };

    const sending = status === "sending";
    const sent = status === "sent";

    /* Send unmounts the button that was pressed, so focus would fall to
       the guard's default. It belongs on the one control now left. */
    useEffect(() => {
      if (sent && doneRef.current) doneRef.current.focus();
    }, [sent]);

    return ReactDOM.createPortal(
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduced ? 0.15 : 0.3, ease: "easeOut" }}
        /* A press on the backdrop is inert, and taking the default with
           it is the point: without this the press blurs whatever had
           focus onto <body>, which fires no focusin for the guard below
           to catch, and the next Tab walks into the page behind. */
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) event.preventDefault();
        }}
        className="fixed inset-0 z-[60] overflow-y-auto overscroll-contain bg-black/80 p-4 sm:p-6"
      >
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-dialog-title"
          onKeyDown={onKeyDown}
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: reduced ? 0.15 : 0.35, ease: "easeOut" }}
          className="relative mx-auto my-auto w-full max-w-[34rem]"
        >
          {/* Filled rather than glass alone. The 1%-white surface
              separates by blur, which holds for a card on a chosen
              ground; this opens over whatever the reader was looking at
              and carries 14px type and form controls. */}
          <div
            className="liquid-glass-strong p-6 sm:p-8"
            style={{ borderRadius: "var(--radius-lg)", background: "rgba(0, 0, 0, 0.88)" }}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full text-ink-tertiary transition-colors duration-200 hover:text-ink-primary"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col gap-2 pr-12">
              <Kicker className="font-body text-sm leading-[1.1875rem] text-ink-tertiary">
                {sent ? "Sent" : "Contact"}
              </Kicker>
              <h2
                id="contact-dialog-title"
                className="font-heading italic text-ink-primary text-3xl md:text-4xl leading-9 tracking-[-0.0625rem]"
              >
                {sent ? "Success" : "Let’s talk"}
              </h2>
              {/* The destination line belongs to the form. Once the mail
                  has gone, where it went is no longer a thing to check. */}
              {!sent && (
                <p className="font-body font-light text-sm leading-[1.1875rem] text-ink-secondary">
                  To <span className="text-ink-primary">{ADDRESS}</span>
                </p>
              )}
            </div>

            {sent ? (
              <div className="mt-8 flex flex-col gap-5">
                <p className="font-body font-light text-base leading-6 text-ink-secondary">
                  We got the message. Thank you for getting in touch — we have it
                  in front of us and we&rsquo;ll come back to you shortly.
                </p>
                <button
                  ref={doneRef}
                  type="button"
                  onClick={onClose}
                  className="liquid-glass-strong glass-lift w-fit rounded-full px-6 py-3 font-body text-sm font-medium leading-5 text-ink-primary"
                >
                  Close now
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-5">
                {/* Web3Forms drops any submission that fills this in. It
                    is not a substitute for the question — a bot that
                    renders the page sees it is hidden — but it costs
                    nothing and stops the ones that do not. */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field id="contact-name" label="Your name">
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Jane Doe"
                      className={CONTROL}
                    />
                  </Field>

                  <Field id="contact-email" label="Your email">
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="jane@example.com"
                      className={CONTROL}
                    />
                  </Field>
                </div>

                <Field id="contact-subject" label="Subject">
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    required
                    defaultValue={DEFAULT_SUBJECT}
                    className={CONTROL}
                  />
                </Field>

                <Field id="contact-message" label="Message">
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={6}
                    defaultValue={DEFAULT_MESSAGE}
                    className={CONTROL + " resize-y"}
                  />
                </Field>

                <Field id="contact-quiz" label={QUESTION}>
                  <input
                    ref={quizRef}
                    id="contact-quiz"
                    name="quiz"
                    type="text"
                    required
                    autoComplete="off"
                    aria-describedby={quizWrong ? "contact-quiz-error" : undefined}
                    aria-invalid={quizWrong ? "true" : undefined}
                    placeholder="Your answer"
                    className={CONTROL}
                  />
                </Field>

                {/* Announced as well as shown: the field it belongs to
                    already has focus by the time this appears. */}
                <p
                  id="contact-quiz-error"
                  role="alert"
                  className={
                    "font-body text-sm leading-[1.1875rem] text-ink-primary " +
                    (quizWrong ? "" : "hidden")
                  }
                >
                  Not quite — the answer is a word, not a number.
                </p>

                {status === "error" && (
                  <p role="alert" className="font-body text-sm leading-[1.1875rem] text-ink-primary">
                    That didn&rsquo;t send. Please email{" "}
                    <a href={"mailto:" + ADDRESS} className="underline">
                      {ADDRESS}
                    </a>{" "}
                    directly and we&rsquo;ll pick it up there.
                  </p>
                )}

                <div className="flex items-center gap-4 pt-1">
                  <button
                    type="submit"
                    disabled={sending}
                    className={
                      "liquid-glass-strong glass-lift flex items-center justify-center gap-2 rounded-full px-6 py-3 " +
                      "font-body text-sm font-medium leading-5 text-ink-primary " +
                      (sending ? "opacity-60" : "")
                    }
                  >
                    {sending ? "Sending…" : "Send message"}
                    {!sending && <ArrowUpRight className="h-5 w-5 shrink-0" />}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>,
      document.body
    );
  }

  window.ContactModal = ContactModal;
})();
