/* Footer — the one place in the system that sits on solid canvas rather than
   glass: it is below the video band, so there is nothing to blur.

   Two blocks, as in the design: a Full brand block closed by a short rule,
   then a Compact bar with the copyright and the section links. */
(function () {
  const motion = window.Motion.motion;

  const RISE = { filter: "blur(10px)", opacity: 0, y: 20 };
  const SETTLE = { filter: "blur(0px)", opacity: 1, y: 0 };
  const VIEWPORT = { once: true, amount: 0.2 };

  const DETAILS = [
    { label: "Studio Name", value: "CKLY Design Studio" },
    { label: "Address", value: "Calle Paris, 157, 08036 Barcelona" },
    { label: "Phone", value: "+34 603 766 507", href: "tel:+34603766507" },
    { label: "Email", value: "studio@ckly.studio", href: "mailto:studio@ckly.studio" }
  ];

  const LINKS = [
    { id: "hero", label: "Hero" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" }
  ];

  const RULE = { background: "var(--color-border-glass-fade)" };

  function Footer() {
    return (
      <footer id="contact" className="relative z-10 scroll-mt-20 bg-black">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 pt-14 pb-24">
          <motion.div
            initial={RISE}
            whileInView={SETTLE}
            viewport={VIEWPORT}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="pt-20 pb-10 max-w-[420px]"
          >
            <div className="flex flex-col gap-5">
              <p className="font-heading italic text-ink-primary text-[30px] leading-[30px] tracking-[-0.75px]">
                ckly.design
              </p>

              <p className="font-body font-light text-base leading-5 text-ink-secondary">
                Dedicated to leveraging the best technology to produce excellent websites for you.
              </p>

              <address className="not-italic font-body font-light text-base leading-5 text-ink-secondary">
                {DETAILS.map(({ label, value, href }) => (
                  <div key={label}>
                    {label}:{" "}
                    {href ? (
                      <a href={href} className="hover:text-ink-primary transition-colors duration-300">
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </div>
                ))}
              </address>
            </div>

            <div className="mt-16 h-px w-full" style={RULE} />
          </motion.div>

          <div className="pt-24 md:pt-32 pb-8">
            <div className="h-px w-full" style={RULE} />

            <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <p className="font-body text-[11px] leading-[14px] text-ink-tertiary whitespace-nowrap">
                © 2027 All Rights Reserved. CKLY DESIGN STUDIO
              </p>

              <nav className="flex flex-wrap items-center gap-6 md:gap-8" aria-label="Footer">
                {LINKS.map(({ id, label }) => (
                  <a
                    key={id}
                    href={"#" + id}
                    className="font-heading italic text-2xl leading-6 text-ink-secondary hover:text-ink-primary transition-colors duration-300"
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  window.Footer = Footer;
})();
