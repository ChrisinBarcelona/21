# Cinematic Space-Travel Landing Page

A single-page landing site with two full-height sections — **Hero** and **Capabilities** —
each backed by a looping background video, a shared liquid-glass design system and
Framer Motion entrance animations.

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
index.html              Tailwind config, Google Fonts, liquid-glass CSS, script tags
components/
  Icons.js              ArrowUpRight, Play, hero stat glyphs, Material icon paths
  FadingVideo.js        rAF-driven crossfade looping video (no CSS transitions)
  BlurText.js           word-by-word blur-in headline, IntersectionObserver triggered
  Navbar.js             fixed glass nav pill
  Partners.js           partner chip + wordmarks
  Hero.js               section 1
  Capabilities.js       section 2
  App.js                composition + ReactDOM root
```

Each component file wraps its body in an IIFE and publishes itself on `window`, since
Babel-standalone runs every script in the shared global scope.

## Design system

- `.liquid-glass` — subtle blur for nav, chips and cards
- `.liquid-glass-strong` — heavy blur for the primary CTA

Both draw their edge with a masked `::before` gradient ring rather than a border, so the
highlight is bright at the top and bottom of the shape and fades out through the middle.

Fonts: **Instrument Serif** (always italic) for headings, **Barlow** for body copy.
Tailwind's default border radius is overridden to `9999px`, so a bare `rounded` is a pill.

## FadingVideo

The videos do not use the `loop` attribute. Instead the component fades opacity frame by
frame with `requestAnimationFrame`: it fades in on `loadeddata`, starts fading out
0.55s before the clip ends, and on `ended` rewinds and fades back in. Each fade reads the
current inline opacity first, so an interrupted fade resumes from where it stopped.
