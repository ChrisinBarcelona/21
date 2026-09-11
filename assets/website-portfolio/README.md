# Website Portfolio thumbnails

`WebsitePortfolio.js` looks for one file per card, at these exact names. Drop
the images from `Desktop/Website Portfolio Images` in here, renamed to match:

```
hack-her-health.webp       // Hack Her Health     — hackherhealth.eventornado.com
blue-cloud.webp            // Blue Cloud          — hackathon2025.blue-cloud.org
emod-open-sea-lab.webp     // EMOD Open Sea Lab   — opensealab.eu
skin-iq-aesthetics.webp    // Skin IQ Aesthetics  — skin-iq-aesthetics.co.uk
rosspark-hotel.webp        // Rosspark Hotel      — rosspark.com
falafel-fresh.webp         // Falafel Fresh      — falafelfresh.co.uk
mad-about-fabrics.webp     // Mad About Fabrics   — madaboutfabrics.com
binghams-bees.webp         // Bingham's Bees      — binghamsbeesandcoops.com
aris.webp                  // Aris                — arisweare.com
```

The tile is a fixed 194px-tall glass surface and the image is `object-cover`,
so any aspect ratio works; roughly 1.92:1 (the 747x388 of `assets/projects/`)
crops least. A `.png` or `.webp` is fine — change the `image` path in
`components/WebsitePortfolio.js` to match.

`GlassImage` drops the `<img>` on error, so a missing or misnamed file leaves
the designed empty glass tile rather than a broken frame.

The artwork is thematic stock rather than screenshots of the sites, so each
card carries its own `alt` in the `SITES` array in
`components/WebsitePortfolio.js` describing the photograph. An empty `alt`
marks the image decorative — correct, and never a wrong description, but a
real one is better, so write one when you add or change an image.

Check the licence before adding one. Watermarked previews (Unsplash+ and the
like) are not licensed for use and the watermark is plainly visible at card
size.
