# Website Portfolio thumbnails

`WebsitePortfolio.js` looks for one file per card, at these exact names. Drop
the images from `Desktop/Website Portfolio Images` in here, renamed to match:

```
hack-her-health.jpg       // Hack Her Health     — hackherhealth.eventornado.com
blue-cloud.jpg            // Blue Cloud          — hackathon2025.blue-cloud.org
emod-open-sea-lab.jpg     // EMOD Open Sea Lab   — opensealab.eu
skin-iq-aesthetics.jpg    // Skin IQ Aesthetics  — skin-iq-aesthetics.co.uk
rosspark-hotel.jpg        // Rosspark Hotel      — rosspark.com
falafel-fresh.jpg         // Falafel Fresh      — falafelfresh.co.uk
mad-about-fabrics.jpg     // Mad About Fabrics   — madaboutfabrics.com
binghams-bees.jpg         // Bingham's Bees      — binghamsbeesandcoops.com
aris.jpg                  // Aris                — arisweare.com
```

The tile is a fixed 194px-tall glass surface and the image is `object-cover`,
so any aspect ratio works; roughly 1.92:1 (the 747x388 of `assets/projects/`)
crops least. A `.png` or `.webp` is fine — change the `image` path in
`components/WebsitePortfolio.js` to match.

`GlassImage` drops the `<img>` on error, so a missing or misnamed file leaves
the designed empty glass tile rather than a broken frame.

Card alt text is generated as "The <Business Name> website homepage". If a
thumbnail is not a homepage screenshot, edit the `alt` in
`components/WebsitePortfolio.js`.
