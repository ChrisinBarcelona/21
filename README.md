# chriskelly.it

The CHRIS KELLY design studio landing page — a single scroll with five sections, two
looping background videos and a shared liquid-glass design system.

Implemented from Figma: **inri-#005 — CKLY DESIGN**, frame `Total Website`
(`0:342`).

## Cache busting

Every local script and stylesheet in `index.html` and `project.html` carries
`?v=<version>`.

GitHub Pages serves these files with a ten-minute cache and no fingerprint in
their names, so a browser that already has the page keeps running the
JavaScript it downloaded before. The markup updates; the copy living inside the
components does not — which looks exactly like a deploy that did not happen.

**Bump the string on any deploy that changes a file under `components/` or
`styles/`.** It is one find-and-replace across the two HTML files. Editing only
the HTML does not need a bump.

The alternative — a timestamp generated per page load — would defeat caching for
every visitor on every visit, on a page that already asks them to download 3MB
of Babel. The version string costs one edit per deploy and nothing at runtime.

## Running it

Everything is CDN-only, but the components are loaded as separate
`<script type="text/babel" src="...">` files, which Babel fetches over XHR. Open the
page through a static server rather than `file://`:

```
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Layout

```
index.html              the landing page
project.html            the Individual Project Template (a UX case study)
styles/
  system.css            design tokens, glass, focus, motion and contrast — shared by both pages
  tailwind.config.js    the Tailwind theme extension — shared by both pages
assets/
  projects/             the three project thumbnails
  website-portfolio/    the client site thumbnails (see "Website Portfolio thumbnails")
  oak/                  the Oak National Academy artwork (see "Visual Design")
  oak/guidelines/       the brand guidelines deck, one WebP per PDF page
  ona-guidelines.pdf    the source brand guidelines, linked for download
components/
  Icons.js              lucide glyphs: ArrowUpRight, Play, Home, Globe, Flask, Dribbble
  Motion.js             the reduced-motion hook and the shared reveal helpers
  Kicker.js             the "// Label" eyebrow
  FadingVideo.js        rAF-driven crossfade looping video (no CSS transitions)
  BlurText.js           word-by-word blur-in headline, IntersectionObserver triggered
  TopBar.js             sticky wordmark
  BottomNav.js          floating glass pill with scroll-spy
  Hero.js               section 1 — starfield video
  ContactModal.js       the "Let's talk" dialog — contact form, posts to Web3Forms
  LeaveSiteModal.js     the "about to leave" dialog, between a card and a live site
  WebsitePortfolio.js   section 2 — Latest Websites (client sites)
  VisualDesign.js       section 3 — Visual Design, and the dialog it opens
  OakNationalAcademy.js the Oak National Academy case study, shown as a modal
  GuidelinesCarousel.js the 55-page brand guidelines deck, flick-through
  CaseStudies.js        section 4 — Case Studies / Coming Soon
  Skills.js             section 5 — What We Love
  Footer.js             section 6 — contact + colophon
  GlassImage.js         artwork in a glass tile, degrading to the tile alone
  App.js                composition + ReactDOM root
  case/                 the case study building blocks — see below
```

## The Individual Project Template

`project.html` renders a UX case study from data. `case/ProjectData.js` is the
whole input: replace it and the page becomes a different study.

```
case/
  ProjectData.js        the content of one case study — the only file you edit per project
  ProjectPage.js        hero, chapter loop, ReactDOM root
  MethodBlock.js        the repeatable block, plus the numbered Chapter divider
  MethodBody.js         the type -> body registry
  Primitives.js         Tile, Label, Body, Bullets, Chip, ScrollX
  Prose.js              statement + paragraphs
  FlowSteps.js          sequential steps with arrows
  JourneyMap.js         phases, lanes, and the emotional line
  BusinessModelCanvas.js  the nine blocks in their canonical arrangement
  CompetitiveMatrix.js  competitors x criteria
  PersonaCard.js        portrait, evidence, behaviour
  BrandAttributes.js    chips and bipolar scales
  MoodBoard.js          reference grid
  PrototypeShowcase.js  screens and a link out
  UXSummary.js          outcome stats and retrospective columns
```

**Every method is the same block.** `MethodBlock` draws the kicker, title and
lede; only the body differs. Bodies are registered by `type` in `MethodBody.js`,
so a new UX method is one component and one line — nothing else on the page
changes.

```js
{ method: "Problem Statement", title: "...", type: "prose",   data: { paragraphs: [...] } }
{ method: "User Journey Map",  title: "...", type: "journey", data: { phases: [...] } }
```

Types: `prose`, `flow`, `journey`, `canvas`, `matrix`, `persona`, `attributes`,
`moodboard`, `prototype`, `summary`. Simple types render at the reading measure;
the structural ones take the full card width (`isWideMethod`).

Chapters run on solid canvas rather than over video — a long read wants a still
ground, and the raised 5% glass the method cards use needs the black to lift off.

Notes on the dynamic blocks:

- **JourneyMap** draws the emotional line as an SVG stretched to the column grid
  (`preserveAspectRatio="none"` with a non-scaling stroke so it does not smear),
  while the points are HTML positioned at the same percentages — a circle inside
  a stretched SVG renders as an ellipse. Every phase also states its feeling in
  words under the point, so the curve is a second reading, never the only one.
- **FlowSteps** stacks with a downward arrow on narrow screens and runs across
  with a rightward arrow once there is room, so the sequence is always read in
  the direction the arrows point. A step's `kind` changes the badge glyph as well
  as its fill.
- **CompetitiveMatrix** is a real table with a caption and row headers. Each mark
  is a glyph *and* a written value in its accessible name, so a rating never
  rests on shape alone.
- Wide blocks scroll inside their own labelled, focusable container rather than
  widening the page.

### A Babel-standalone constraint

Every component file is an IIFE publishing onto `window`, because
Babel-standalone runs them all in one shared global scope. That protects your own
bindings but **not Babel's injected helpers**: object-rest destructuring
(`function F({ a, ...rest })`) compiles to a top-level `const _excluded`, and a
second one anywhere on the page is a redeclaration that kills the script.
`FadingVideo` owns the only one. JSX spread (`{...props}`) is fine — it emits a
function declaration, which can redeclare.

Each component file wraps its body in an IIFE and publishes itself on `window`, since
Babel-standalone runs every script in the shared global scope.

## Design system

The Figma variable collection is mirrored as CSS custom properties in `index.html`
(`--blur-glass`, `--stroke-glass`, `--radius-lg`, `--color-bg-glass-*` …) so a value in
the markup can be read against the design without a lookup table.

The system lives in `styles/system.css` and is shared by both pages.

- `.liquid-glass` — Glass/Subtle: 4px blur, for cards and image tiles
- `.liquid-glass-strong` — Glass/Strong: 50px blur, for the primary CTA and the bottom nav
- `.glass-lift` — hover lifts the surface from 1% to 5% (project cards)
- `.glass-raised` — the already-raised 5% surface, lifting to 8% (skill cards)

Both glass classes draw their edge with a masked `::before` gradient ring rather than a
border, so the highlight is bright at the top and bottom of the shape and fades out
through the middle. Figma renders this as a flat 1.4px stroke because it cannot express
the mask; the component notes in the file name `.liquid-glass-strong` directly, so the
ring is the intended rendering. The ring carries `z-index: 2` — as a `::before` it would
otherwise sit beneath any absolutely positioned child, such as a card's artwork or the
bottom nav's selected pill.

Fonts: **Instrument Serif** (always italic) for headings, **Barlow** for body copy.
Tailwind's default border radius is overridden to `9999px`, so a bare `rounded` is a pill.

## Scale

The page is drawn at 1.125x the Figma frame. That is done in one place — the root
font size — rather than by rewriting every value:

```css
html { font-size: 112.5%; }
```

Every length in the design is expressed in `rem`, so type, spacing, radii, stroke
and blur all scale together and the proportions of the frame are preserved. To read
a value back against Figma, multiply by 16: `max-w-[90rem]` is the 1440px frame,
`h-[12.125rem]` is the 194px image tile.

`112.5%` rather than a flat `18px` on purpose. A reader who has raised their browser's
default font size gets 1.125x *their* size, so the page compounds with that setting
instead of overriding it.

Two things do not follow the root font size, and so are handled explicitly:

- **Breakpoints** are viewport px. They are scaled by the same 1.125 (`sm` 720, `md`
  864, `lg` 1152) — otherwise the 3-column grid would engage at 1024px while each
  column is an eighth wider than it used to be. This also means the layout matches
  what browser zoom at 112.5% already does: 3 columns need roughly 1150px now.
- **The headline measure** is the one length in `em` rather than `rem`: 672/88 =
  `7.64em`. Tied to its own font size, it holds the design's type-to-measure ratio
  through every breakpoint step, so the line always breaks where Figma breaks it.

One thing is deliberately drawn *below* the page scale: **the bottom nav is 85% of
its design size from `md` (864px) up**. On a phone the pill is a touch target and
keeps the full size; on a desktop it is a pointer target sitting over the video, and
15% smaller is enough to stop it dominating the fold. It is one number —
`--nav-scale` in the `.bottom-nav` block of `system.css` — multiplying every length
the pill is built out of: padding, gaps, the icon box, the label type, the glass
hairline and the width of the track. The 50px backdrop blur and the pill's 2rem
offset from the bottom of the viewport are not scaled; the blur is what keeps the
labels readable over a bright frame.

Those metrics live in CSS rather than in Tailwind utilities *because* they all have
to come down together, and each selector names `.bottom-nav` as well as its own
class — two classes against a utility's one, so they hold wherever the Play CDN
injects its stylesheet.

The first type step is gentler than a strict 1.125x. A phone viewport cannot take the
full multiple without pushing the hero CTAs under the floating nav; the desktop
steps carry the full scale.

## Accessibility

- **Skip link** to `#content` as the first tab stop; `<header>`, the section `<nav>`
  and `<footer>` sit outside `<main>`, so skipping the chrome actually skips it.
- **Focus** draws an explicit white ring — the UA default is invisible on this page.
  It inherits `border-radius`, so it traces the pills rather than boxing them.
- **Reduced motion** is read in JS, not just CSS, because Framer Motion animates
  through inline styles that a CSS media block cannot reach. `Motion.js` exposes the
  preference; reveals keep the fade but drop the travel and the blur, `BlurText`
  skips the word split entirely, and `FadingVideo` holds its first frame instead of
  looping — background movement the reader cannot stop is the thing being avoided.
- **More contrast** inverts the glass from a bright film to a dark scrim and makes
  the edge ring solid, which is what actually buys contrast for text over a bright
  video frame.
- **Text over video** carries a tight shadow (`.on-video`), scoped to the copy that
  sits directly on the clip — the card text has its own glass behind it.
- `BlurText` emits a real space between its word spans. Flex drops a whitespace-only
  text node rather than laying it out, so `columnGap` still owns the visible spacing
  while the element's text content stays a readable sentence for screen readers and
  find-in-page.
- The `//` in every kicker is marked decorative; otherwise it is announced as
  "slash slash" before each of the nine labels on the page.
- Background video is `aria-hidden` and out of the tab order. Project images carry
  descriptive alt text rather than a repeat of the title beneath them.
- The smallest type on the page is now 16.5px rendered, up from 11px.

## Videos

`FadingVideo` does not use the `loop` attribute. Instead the component fades opacity
frame by frame with `requestAnimationFrame`: it fades in on `loadeddata`, starts fading
out 0.55s before the clip ends, and on `ended` rewinds and fades back in. Each fade reads
the current inline opacity first, so an interrupted fade resumes from where it stopped.

There are two clips:

- **Hero** — overscaled to 120% and pinned to the top rather than centred, because the
  focal point of the clip is the top of frame. There is deliberately no dark overlay:
  all contrast comes from the glass chrome.
- **Latest Websites + Coming Soon + Skills** — one shared backdrop for all three
  sections, pinned with `position: sticky` inside the band so a single viewport-tall
  clip covers several screens of content without being stretched across them. The footer sits below the band
  on solid canvas, which is why it is the one part of the system that carries no glass.

## Overscroll

`html, body { overscroll-behavior-y: none; }` in `system.css`. Pulling past the
top rubber-bands the whole document away from the viewport edge and paints the
canvas into the gap — on a page that opens on a full-bleed video, the site reads
as coming unstuck from the browser chrome rather than as a flourish.

Only the y axis: `overscroll-behavior-x` would take the horizontal swipe-back
gesture with it. Set on both elements because the spec propagates the root
element's value to the viewport while browsers have also historically read it
off `<body>`, the way they do `overflow`. Android's pull-to-refresh goes with
it, which on a page with nothing to refresh is the better half of the bargain.

It reaches the viewport only, so scroll containers inside the page are
unaffected — the case-study dialog keeps its own `overscroll-contain`.

Supported in Chrome, Edge, Firefox and Safari 16+. An older browser still
bounces; the only way to stop it there is to move the page scroll into an inner
container, which would cost the sticky video band, the scroll-spy and the smooth
anchors. Not worth it for a browser generation that is already past.

## Motion

- `BlurText` reveals headlines word by word — `blur(10px)/opacity 0/y 50` →
  `blur(5px)/opacity .5/y -5` → `blur(0)/opacity 1/y 0` over 0.7s, staggered 100ms per
  word, fired once the element is 10% visible.
- Sections and cards rise and unblur on scroll (`whileInView`, `once: true`).
- The bottom nav's selected surface is a shared `layoutId`, so it springs between items
  as an `IntersectionObserver` scroll-spy tracks which section holds the middle of the
  viewport. Active state is three reinforcing signals — the 10% selected glass, a
  full-white icon, and the label stepping up from 11px regular to 12px medium — so it
  never depends on colour alone. The six destinations are Home, Websites, Visual
  Design, Case Studies, Skills and Contact; the same component renders the case
  study's five chapters from `PROJECT.chapters`.

A note on `BlurText`: a flex container swallows the whitespace between the word spans, so
the gap has to be drawn explicitly. It uses `columnGap` rather than a per-word
`marginRight` — the gap then applies only *between* words, so a centred line stays
centred and the headline breaks across the design's 672px measure exactly as drawn
("We Make Websites that / Are Impossible to Ignore").

## Case study thumbnails

The three cards in Case Studies (`CaseStudies.js`, section `#case-studies`, still
headed *Coming Soon*) are backed by `assets/projects/`:

```
locker-room.jpg     // Lean Startup   — Locker Room
honest-greens.jpg   // Service Design — Honest Greens
conjuga.jpg         // iOS            — Conjuga
```

They are 747x388, which is close enough to the tile's 1.92:1 ratio that `object-cover`
barely crops. Any aspect ratio works though — the tile is a fixed 194px-tall glass
surface. `ProjectImage` drops the `<img>` on error, so a missing or renamed file leaves
the designed empty glass tile rather than a broken frame.

## "Let's talk"

The hero's second button opens `ContactModal.js` — a dialog with a real form,
rather than a `mailto:`. A `mailto:` hands the message to the operating system
and hopes: on a phone that works, on a desktop with no mail client registered it
does nothing at all, silently. The form posts to
[Web3Forms](https://web3forms.com), so a message arrives whatever the reader has
installed, and the page can say plainly whether it went.

### Where it delivers

`ACCESS_KEY` at the top of `ContactModal.js`, issued by web3forms.com against
`chris@chriskelly.it`. Replacing that one string is the whole of changing where
this form delivers; nothing else in the file knows the destination.

The key is public in the page source. That is how the service works: it names
the destination, it is not a secret, and it can only ever deliver to the address
it was issued for. It is also why the question below matters.

### The form

`To chris@chriskelly.it` is shown as a line of text, not a field — the
destination is not the visitor's to change. Name and email are required, so a
reply has somewhere to go; the service sends from its own address, so without
them an enquiry arrives unanswerable. Subject defaults to `Project enquiry` and
the message to "Hi Chris, / I'd like to discuss a project with you.", both
editable.

The spam check is *What is two plus two, written as a word?*, answered `four` in
any mix of case — it is trimmed and lower-cased before comparison, so `FOUR`,
`Four` and `  four  ` all pass. Spelled out rather than `2 + 2` so a bot filling
number fields has no pattern to match. Alongside it sits Web3Forms' own
honeypot, a hidden `botcheck` the service drops a submission for filling in.

Glass does not render on an `<input>` or `<textarea>` — the ring is a `::before`
and neither element reliably carries one — so the surface goes on a wrapper with
the control bare inside it. That is also what lets the focus ring trace the whole
field rather than the text box: `.field:focus-within` in `system.css`.

### The dialog

The mechanics are the case study's: body locked behind it, focus taken on open
and handed back to the button on close, Tab trapped inside, Escape closes,
portalled to `<body>` so the floating nav cannot draw over it.

Two deliberate differences. **A press on the backdrop does not close it** —
there is typing in here to lose, and a stray click beside a form is not a request
to discard it. And that press takes `preventDefault()`, because otherwise it
blurs focus onto `<body>`, which fires no `focusin` for the guard to catch, and
the next Tab walks into the page behind.

Escape listens on the document rather than the dialog, for the same reason: a
handler waiting for the event to bubble out of the dialog never hears it once
focus has left.

A failed send keeps the form exactly as it was, so nothing typed is lost. A
successful one replaces it: the kicker becomes *Sent*, the heading *Success*,
and the destination line goes — where the mail went stops being a thing to check
once it has gone. Focus moves to the *Close now* button, because the button that
was pressed no longer exists.

## Latest Websites

`WebsitePortfolio.js` renders the client sites above Case Studies.
The file keeps its name; the heading it renders is the one that changed. The whole
section is one `SITES` array at the top of the file — add, remove or reorder a
card by editing that array and nothing else.

```js
{
  name: "Rosspark Hotel",
  blurb: "A four-star hotel with dining, weddings and event spaces in County Antrim.",
  category: "Hospitality",
  functionality: "E-Commerce // Booking Integration",
  domain: "rosspark.com",
  image: "assets/website-portfolio/rosspark-hotel.webp"
}
```

`domain` is used three times — as the button label, as the `https://` href, and in
the link's accessible name — so correcting a URL is a one-line change.

The card is the Case Studies card with a longer spine: the same 20px glass
surface, 194px image tile, 24px padding and hover lift, closing on two metadata
chips and a CTA instead of a status line. Descriptions vary in length, so the CTA
carries `mt-auto` and the buttons line up across a row.

One deliberate departure: **the site names are set upright**, the only headings on
the page that are not in the serif italic. They are proper nouns belonging to
somebody else, so they read as names rather than as our display type, and nine of
them in a row is where the italic stops being a voice and becomes a texture. The
*Latest Websites* heading above them keeps it.

`SITES` is also the running order, and it leads with the commercial work — Skin IQ
Aesthetics, Rosspark Hotel, Falafel Fresh, then Mad About Fabrics, Bingham's Bees,
Aris — with the three event registration platforms last.

**Three at a time.** Nine cards at once is a wall, so the section opens on the
first three and grows a row per press of **See more** — 3, then 6, then 9, at
which point the button retires. `STEP` at the top of the file is the batch size
and matches the widest grid column count; the list is `SITES.slice(0, shown)`, so
adding a card to `SITES` is still the only edit a new site needs. The cards keep
`revealOnScroll`, so a row that lands below the fold animates in when it is
reached rather than popping in unseen.

A press moves focus to the first name in the new row — the `<h3>` carries
`tabIndex={-1}` for it — because the last press unmounts the button and would
otherwise drop focus on the floor, leaving the row that just arrived a long walk
back down the tab order. `focus({ preventScroll: true })` keeps the page still: a
reader who clicked asked for more cards, not to be moved. The *Showing 6 of 9
websites* line beside the button is `aria-live="polite"`, so the reveal is
announced instead of the list silently doubling.

**The whole card is the link.** Wrapping the `<article>` in an `<a>` would nest the
CTA inside another interactive, so the CTA carries `.stretched-link` instead — its
`::after` is stretched over the card at `z-index: 3`, clearing the glass edge ring
at 2. The accessibility tree gets exactly one link per card; the whole surface is
the hit area. The pill's glass sits on a `<span>` *inside* the anchor rather than on
the anchor itself, because `.liquid-glass-strong` sets `position: relative` and
`overflow: hidden` — either one on the anchor would collapse the overlay back onto
the button. Links open in a new tab, which is what the up-right arrow signals.

### The link asks first

A press does not leave straight away. It opens `LeaveSiteModal.js`, which names
where the link goes and offers staying as the first and focused choice:

> // Leaving chriskelly.it
>
> *You are about to leave and go to the live site for "Rosspark Hotel"*
>
> rosspark.com opens in a new tab, so this page stays where it is.
>
> `Stay here`  `See Rosspark Hotel website`

Nine cards on the section and any press on one of them was a departure, on a page
the reader came to read. Nothing in the dialog is a warning — the site is the work,
and going to see it is the point — it is a beat in which to change your mind, and
the name of the destination before you arrive at it.

Its role is `alertdialog` rather than `dialog`, which is the pattern for a question
with two answers, and *Stay here* takes focus on open so Enter and Escape agree. The
mechanics are `ContactModal`'s — body locked, focus returned to the card on close,
Tab trapped, Escape closes, portalled to `<body>` past the floating nav — with the
backdrop going the other way: a press beside a question about leaving closes it,
because there is nothing in here to lose.

The anchor keeps its real `href` and `target`, so the status bar still shows the
destination and a cmd/ctrl/middle click still opens the site directly. Only the plain
left press is intercepted, which is the one nobody meant as a departure.

Following the link closes the dialog on the *next* task rather than in the click
handler. The anchor is the element the browser is acting on while the click is being
dispatched, and unmounting it there can take the navigation with it.

### Latest Websites thumbnails

The nine cards are backed by `assets/website-portfolio/`, one file per card. A
card behind **See more** is not in the DOM, so the first paint fetches three
thumbnails and each press fetches the next three:

```
skin-iq-aesthetics.webp  rosspark-hotel.webp      falafel-fresh.webp
mad-about-fabrics.webp   binghams-bees.webp       aris.webp
hack-her-health.webp     blue-cloud.webp          emod-open-sea-lab.webp
```

A row of the table is a press of **See more**, so the order of `SITES` is the
order they are revealed in: the commercial work first, the event platforms last.

The tile is the same fixed 194px-tall glass surface as the project cards, so any
aspect ratio works and `GlassImage` drops the `<img>` on error — a missing file
leaves the designed empty tile rather than a broken frame. See the README in that
directory for the full name-to-card mapping.

The artwork is thematic stock rather than screenshots of the sites, so each entry
carries its own `alt` describing the photograph. An empty `alt` marks an image
decorative — correct, and never a wrong description, but a real one is better.


## Visual Design

A third card section, between Latest Websites and Coming Soon, holding the
brand-identity work. One card today — Oak National Academy — sitting in the first
column of the same three-column grid, so a second piece drops in beside it without
the section being rebuilt.

The card is taller than its neighbours for one reason: its artwork is. An Instagram
story is 9:16, and `GlassImage` takes a `ratio` so the tile adopts the artwork's
proportions rather than cropping a portrait asset into the 194px landscape band the
other cards use. Nothing is cut off.

### The case study is a dialog, not a page

Clicking the card opens `OakNationalAcademy` rather than navigating. The dialog owns
what a page would otherwise get for free — it locks the body behind it, takes focus
on open, traps Tab, closes on Escape or a backdrop click, and hands focus back to
the card on the way out.

It is portalled to `document.body`. The section that owns it sits inside the video
band's `z-10` stacking context, which would trap the overlay underneath the `z-50`
bottom nav however high its own `z-index` went.

One thing to watch when pinning anything inside it: `.liquid-glass` and
`.liquid-glass-strong` both set `position: relative`, and `system.css` loads after
Tailwind, so a `fixed` *utility* silently loses to them. The close button sets
`position` in a style attribute instead.

### The guidelines carousel

The work was judged on adherence, so the deck leads — the reader needs the yardstick
in hand before the assets are worth looking at. All 55 pages are pre-rendered from
`ona-guidelines.pdf` at 1400px wide, which only stays cheap (35 KB a page) because
just the current page and its two neighbours are ever fetched. The source PDF is
still linked for anyone who wants it.

Three ways through, because the obvious control differs by device: the arrows on a
pointer, a drag on touch, the arrow keys once the strip has focus. A dot per page
would be unreadable at 55, so progress is a bar plus a live-announced counter.

### Oak National Academy artwork

Twenty assets in `assets/oak/`, grouped by what they were made for:

```
instagram-story-1..5.webp        9:16    the story set (story 1 is the card preview)
instagram-post-1..4.webp         1:1     the carousel slides
instagram-post-5..6.webp         1:1     the single posts
event-tornado-banner-1..2.webp   8:3     the wide event headers
linkedin-post-1..2.webp          1.91:1  the social share cards
banner-blog-1..2.webp            2.4:1   the blog headers
direct-mail-1..3.webp            ~5:7    the email circulators
```

They arrived at print scale — up to 8000px wide, 7.8 MB the set. Downscaled to twice
the widest size each is ever rendered at and re-encoded at quality 82, that is 1.9 MB.
Every tile passes its own ratio, so each asset shows whole rather than cropped to a
common shape.

Figma places only fourteen of them. The LinkedIn share cards and blog headers are
folded into "Facebook / Linkedin Header Banners" and the remaining two circulators
into "Email Circulator", on the strength of their proportions and their names — no
section was invented for them.
