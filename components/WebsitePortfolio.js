/* WebsitePortfolio — "Latest Websites". The client work, above the
   Case Studies band, sharing the same video band and so carrying its own
   glass.

   The card is the Case Studies card with a longer spine: same 20px glass
   surface, same 194px image tile, same 24px padding and gap, same
   hover lift. Where a project card closes on a status line, a portfolio
   card closes on two metadata chips and a CTA out to the live site.

   The whole card is the link. Rather than wrapping the article in an
   <a> — which would swallow the button into a nested interactive — the
   CTA carries `stretched-link`, whose ::after covers the card. One link
   in the accessibility tree, the entire surface clickable.

   That link does not leave straight away. A press opens
   `LeaveSiteModal`, which names the destination and offers staying, and
   the live site opens from there. The anchor keeps its real `href` and
   `target`, so the status bar still shows where it goes and a
   cmd/ctrl/middle click still opens it directly — the dialog is for the
   plain press, which is the one nobody meant as a departure.

   Which is why the pill's glass is on a span inside the anchor rather
   than on the anchor itself: `.liquid-glass-strong` sets
   `position: relative` and `overflow: hidden`, and on the anchor either
   one alone would collapse the overlay back onto the button.

   Card heights vary with the length of the description, so the CTA is
   pushed down by `mt-auto`: the buttons line up across a row.

   Nine cards at once is a wall. The section opens on the first three and
   grows a row at a time behind "See more", so the page asks for one
   decision rather than nine. The button retires once the last row is out;
   the count beside it is a live region, so the reveal is announced rather
   than silently doubling the list under a screen reader.

   A press moves focus to the first name in the new row. Without it the
   final press would drop focus on the floor as the button unmounts, and
   the row that just arrived would sit behind however many tabs it takes
   to walk back down to it. `preventScroll` keeps the page still — someone
   who pressed the button asked for more cards, not to be moved. */
(function () {
  const { useEffect, useRef, useState } = React;
  const motion = window.Motion.motion;
  const AnimatePresence = window.Motion.AnimatePresence;
  const GlassImage = window.GlassImage;
  const LeaveSiteModal = window.LeaveSiteModal;
  const BlurText = window.BlurText;
  const Kicker = window.Kicker;
  const ArrowUpRight = window.ArrowUpRight;
  const ArrowDown = window.ArrowDown;
  const useReducedMotion = window.useReducedMotion;
  const revealOnScroll = window.revealOnScroll;

  /* Content is Website_Portfolio_Copy.md verbatim, except `blurb` — the
     copy carries no description of the businesses themselves, so those
     are written here. `domain` is both the button label and the href.

     The artwork is thematic stock rather than screenshots of the sites,
     so `alt` describes the photograph. An empty `alt` marks an image as
     decorative: correct, and never a wrong description, but a real one
     is better — fill it in when the image lands. */
  const SITES = [
    {
      name: "Hack Her Health",
      blurb: "A women's health hackathon bringing clinicians and technologists together.",
      category: "Events",
      functionality: "Registration Platform",
      domain: "hackherhealth.eventornado.com",
      image: "assets/website-portfolio/hack-her-health.webp",
      alt: "A raised clenched fist, lit in deep purple against a purple ground"
    },
    {
      name: "Blue Cloud",
      blurb: "A European marine-data hackathon run for the Blue-Cloud research programme.",
      category: "Events",
      functionality: "Registration Platform",
      domain: "hackathon2025.blue-cloud.org",
      image: "assets/website-portfolio/blue-cloud.webp",
      alt: "A whale drawn as a glowing low-poly wireframe of points and triangles on deep blue"
    },
    {
      name: "EMOD Open Sea Lab",
      blurb: "An ocean-data innovation camp built on Europe's marine observation network.",
      category: "Events",
      functionality: "Registration Platform",
      domain: "opensealab.eu",
      image: "assets/website-portfolio/emod-open-sea-lab.webp",
      alt: "A line of offshore wind turbines standing in calm sea under a clear blue sky"
    },
    {
      name: "Skin IQ Aesthetics",
      blurb: "An advanced aesthetics clinic offering skin treatments and medical-grade skincare.",
      category: "Health & Beauty",
      functionality: "E-Commerce Platform",
      domain: "skin-iq-aesthetics.co.uk",
      image: "assets/website-portfolio/skin-iq-aesthetics.webp",
      alt: "A smiling woman resting her fingertips lightly against her cheeks, on a pink ground"
    },
    {
      name: "Rosspark Hotel",
      blurb: "A gorgeous hotel with dining, weddings and event spaces in County Antrim.",
      category: "Hospitality",
      functionality: "E-Commerce // Booking Integration",
      domain: "rosspark.com",
      image: "assets/website-portfolio/rosspark-hotel.webp",
      alt: "A bride in a lace gown lying across a hotel bed dressed in cream and gold linen"
    },
    {
      name: "Falafel Fresh",
      blurb: "A Mediterranean street-food kitchen serving falafel, wraps and mezze.",
      category: "Food & Beverage",
      functionality: "E-Commerce // Booking Integration",
      domain: "falafelfresh.co.uk",
      image: "assets/website-portfolio/falafel-fresh.webp",
      alt: "A plate of falafel with a bowl of chopped salad, lemon and a herbed yoghurt dip on pale blue"
    },
    {
      name: "Mad About Fabrics",
      blurb: "An independent fabric house supplying dressmaking and upholstery textiles.",
      category: "Textiles",
      functionality: "E-Commerce",
      domain: "madaboutfabrics.com",
      image: "assets/website-portfolio/mad-about-fabrics.webp",
      alt: "A bright living room with floor-length cream curtains across three tall windows, a low white sofa and a potted tree"
    },
    {
      name: "Bingham's Bees",
      blurb: "A beekeeping supplier stocking hives, coops and everything for the apiary.",
      category: "Beekeeping Supplies",
      functionality: "E-Commerce",
      domain: "binghamsbeesandcoops.com",
      image: "assets/website-portfolio/binghams-bees.webp",
      alt: "A honeybee seen from above with its wings outstretched, on a flat yellow ground"
    },
    {
      name: "Aris",
      blurb: "A contemporary fashion label selling considered, small-run essentials.",
      category: "Fashion",
      functionality: "E-Commerce",
      domain: "arisweare.com",
      image: "assets/website-portfolio/aris.webp",
      alt: "A woman in a black vest and shorts walking in profile past a weathered concrete wall"
    }
  ];

  /* One row of the lg grid: the batch "See more" adds each press. */
  const STEP = 3;

  /* A metadata pill. Same shape as the case study's Chip, declared here
     because that primitive only loads on project.html. */
  function Chip({ children }) {
    return (
      <span className="liquid-glass rounded-full px-3 py-1 font-body text-sm leading-[1.1875rem] text-ink-secondary">
        {children}
      </span>
    );
  }

  function WebsitePortfolio() {
    const reduced = useReducedMotion();
    const [shown, setShown] = useState(STEP);
    /* The site whose live-link dialog is open, or null. */
    const [leaving, setLeaving] = useState(null);
    const gridRef = useRef(null);
    /* Set by the button, read by the effect below: a reveal moves focus,
       the first paint does not. */
    const revealed = useRef(false);

    const visible = SITES.slice(0, shown);
    const remaining = SITES.length - shown;

    useEffect(() => {
      if (!revealed.current) return;
      revealed.current = false;
      const card = gridRef.current && gridRef.current.children[shown - STEP];
      const name = card && card.querySelector("h3");
      if (name) name.focus({ preventScroll: true });
    }, [shown]);

    const showMore = () => {
      revealed.current = true;
      setShown((n) => Math.min(n + STEP, SITES.length));
    };

    /* A modified click — cmd, ctrl, shift, alt, or anything but the
       primary button — is already a deliberate "open this elsewhere",
       so the browser keeps it. Only the plain press is intercepted. */
    const confirmLeaving = (site) => (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (typeof event.button === "number" && event.button !== 0) return;
      event.preventDefault();
      setLeaving(site);
    };

    return (
      <React.Fragment>
        <section
          id="websites"
          aria-labelledby="websites-heading"
          className="relative scroll-mt-20 mx-auto max-w-[90rem] px-6 md:px-10 lg:px-16 py-14"
        >
          <div className="on-video flex flex-col gap-4">
            <motion.div {...revealOnScroll(reduced)}>
              <Kicker className="font-body text-sm leading-[1.1875rem] text-ink-tertiary">
                Websites
              </Kicker>
            </motion.div>

            <BlurText
              as="h2"
              id="websites-heading"
              align="left"
              text="Latest Websites"
              delay={100}
              className="font-heading italic text-ink-primary text-4xl md:text-5xl lg:text-[3.75rem] leading-[0.9] tracking-[-0.125rem] lg:tracking-[-0.1875rem]"
            />
          </div>

          <div
            ref={gridRef}
            className="mt-[3.375rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {visible.map((site, i) => (
              <motion.article
                key={site.name}
                {...revealOnScroll(reduced, 0.15 + (i % 3) * 0.15)}
                className="liquid-glass glass-lift flex h-full flex-col gap-4 p-6"
                style={{ borderRadius: "var(--radius-lg)" }}
              >
                <GlassImage
                  src={site.image}
                  alt={site.alt}
                  className="h-[12.125rem]"
                />

                <Kicker className="font-body text-sm leading-[1.1875rem] text-ink-tertiary">
                  Website
                </Kicker>

                <h3
                  tabIndex={-1}
                  className="font-heading italic text-ink-primary text-3xl md:text-4xl leading-9 tracking-[-0.0625rem] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60"
                >
                  {site.name}
                </h3>

                <p className="font-body font-light text-sm leading-[1.1875rem] text-ink-secondary">
                  {site.blurb}
                </p>

                <div className="flex flex-wrap gap-2">
                  <Chip>{site.category}</Chip>
                  <Chip>{site.functionality}</Chip>
                </div>

                <div className="mt-auto pt-2">
                  <a
                    href={"https://" + site.domain}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={confirmLeaving(site)}
                    aria-haspopup="dialog"
                    aria-label={"Visit the " + site.name + " website at " + site.domain}
                    className="stretched-link rounded-full block w-fit max-w-full"
                  >
                    <span className="liquid-glass-strong rounded-full flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium leading-5 text-ink-primary font-body">
                      <span className="break-all">{site.domain}</span>
                      <ArrowUpRight className="h-5 w-5 shrink-0" />
                    </span>
                  </a>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-3">
            <p
              aria-live="polite"
              className="font-body text-sm leading-[1.1875rem] text-ink-tertiary"
            >
              {"Showing " + shown + " of " + SITES.length + " websites"}
            </p>

            {remaining > 0 && (
              <button
                type="button"
                onClick={showMore}
                className="liquid-glass-strong glass-lift flex items-center justify-center gap-2 rounded-full px-6 py-3 font-body text-sm font-medium leading-5 text-ink-primary"
              >
                See more
                <ArrowDown className="h-5 w-5 shrink-0" />
              </button>
            )}
          </div>
        </section>

        <AnimatePresence>
          {leaving && (
            <LeaveSiteModal site={leaving} onClose={() => setLeaving(null)} />
          )}
        </AnimatePresence>
      </React.Fragment>
    );
  }

  window.WebsitePortfolio = WebsitePortfolio;
})();
