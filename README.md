# ckly.design

The CKLY Design Studio landing page — a single scroll with four sections, two
looping background videos and a shared liquid-glass design system.

Implemented from Figma: **inri-#005 — CKLY DESIGN**, frame `Total Website`
(`0:342`).

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
  projects/             the three project thumbnails (see "Missing assets")
components/
  Icons.js              lucide glyphs: ArrowUpRight, Play, Home, Navigation, Star
  Motion.js             the reduced-motion hook and the shared reveal helpers
  Kicker.js             the "// Label" eyebrow
  FadingVideo.js        rAF-driven crossfade looping video (no CSS transitions)
  BlurText.js           word-by-word blur-in headline, IntersectionObserver triggered
  TopBar.js             sticky wordmark
  BottomNav.js          floating glass pill with scroll-spy
  Hero.js               section 1 — starfield video
  Projects.js           section 2 — Latest Projects
  Skills.js             section 3 — What We Love
  Footer.js             section 4 — contact + colophon
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

The page is drawn at 1.5x the Figma frame. That is done in one place — the root
font size — rather than by rewriting every value:

```css
html { font-size: 150%; }
```

Every length in the design is expressed in `rem`, so type, spacing, radii, stroke
and blur all scale together and the proportions of the frame are preserved. To read
a value back against Figma, multiply by 16: `max-w-[90rem]` is the 1440px frame,
`h-[12.125rem]` is the 194px image tile.

`150%` rather than a flat `24px` on purpose. A reader who has raised their browser's
default font size gets 1.5x *their* size, so the page compounds with that setting
instead of overriding it.

Two things do not follow the root font size, and so are handled explicitly:

- **Breakpoints** are viewport px. They are scaled by the same 1.5 (`sm` 960, `md`
  1152, `lg` 1536) — otherwise the 3-column grid would engage at 1024px while each
  column is half again as wide as it used to be. This also means the layout matches
  what browser zoom at 150% already does: 3 columns need roughly 1900px now.
- **The headline measure** is the one length in `em` rather than `rem`: 672/88 =
  `7.64em`. Tied to its own font size, it holds the design's type-to-measure ratio
  through every breakpoint step, so the line always breaks where Figma breaks it.

The first type step is gentler than a strict 1.5x. A phone viewport cannot take the
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
- **Projects + Skills** — one shared backdrop for both sections, pinned with
  `position: sticky` inside the band so a single viewport-tall clip covers roughly two
  screens of content without being stretched across them. The footer sits below the band
  on solid canvas, which is why it is the one part of the system that carries no glass.

## Motion

- `BlurText` reveals headlines word by word — `blur(10px)/opacity 0/y 50` →
  `blur(5px)/opacity .5/y -5` → `blur(0)/opacity 1/y 0` over 0.7s, staggered 100ms per
  word, fired once the element is 10% visible.
- Sections and cards rise and unblur on scroll (`whileInView`, `once: true`).
- The bottom nav's selected surface is a shared `layoutId`, so it springs between items
  as an `IntersectionObserver` scroll-spy tracks which section holds the middle of the
  viewport. Active state is three reinforcing signals — the 10% selected glass, a
  full-white icon, and the label stepping up from 11px regular to 12px medium — so it
  never depends on colour alone.

A note on `BlurText`: a flex container swallows the whitespace between the word spans, so
the gap has to be drawn explicitly. It uses `columnGap` rather than a per-word
`marginRight` — the gap then applies only *between* words, so a centred line stays
centred and the headline breaks across the design's 672px measure exactly as drawn
("We Make Websites that / Are Impossible to Ignore").

## Project thumbnails

The three cards in Latest Projects are backed by `assets/projects/`:

```
locker-room.jpg     // Lean Startup   — Locker Room
honest-greens.jpg   // Service Design — Honest Greens
conjuga.jpg         // iOS            — Conjuga
```

They are 747x388, which is close enough to the tile's 1.92:1 ratio that `object-cover`
barely crops. Any aspect ratio works though — the tile is a fixed 194px-tall glass
surface. `ProjectImage` drops the `<img>` on error, so a missing or renamed file leaves
the designed empty glass tile rather than a broken frame.
