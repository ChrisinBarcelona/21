# Oak National Academy artwork

Backs the Visual Design section on the landing page and the case study it opens.
Sources were the print-scale exports (up to 8000px wide, 7.8 MB the set); these are
downscaled to twice the widest size each is rendered at and re-encoded as WebP at
quality 82, totalling 1.9 MB.

| File | Ratio | Used by |
| --- | --- | --- |
| `instagram-story-1.webp` | 9:16 | the Visual Design card preview, and Instagram Stories |
| `instagram-story-2..5.webp` | 9:16 | Instagram Stories |
| `instagram-post-1..4.webp` | 1:1 | Instagram Carousel Posts |
| `instagram-post-5..6.webp` | 1:1 | Instagram Single Posts |
| `event-tornado-banner-1..2.webp` | 8:3 | Facebook / Linkedin Header Banners |
| `linkedin-post-1..2.webp` | 1.91:1 | Facebook / Linkedin Header Banners |
| `banner-blog-1..2.webp` | 2.4:1 | Facebook / Linkedin Header Banners |
| `direct-mail-1..3.webp` | ~5:7 | Email Circulator |

Each tile passes its own aspect ratio to `GlassImage`, so an asset is never cropped
to fit a shape it was not drawn for. `GlassImage` drops the `<img>` on error, so a
missing file leaves the designed empty glass tile rather than a broken frame.

## guidelines/

`page-01.webp` … `page-55.webp`, rendered from `../ona-guidelines.pdf` at 1400px
wide and quality 78 — 35 KB a page, 2.0 MB the deck. `GuidelinesCarousel` fetches
only the current page and its two neighbours.

To regenerate after the PDF changes:

```python
import pymupdf, io
from PIL import Image
doc = pymupdf.open("assets/ona-guidelines.pdf")
for i, page in enumerate(doc, 1):
    scale = 1400 / page.rect.width
    pix = page.get_pixmap(matrix=pymupdf.Matrix(scale, scale), alpha=False)
    img = Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGB")
    img.save(f"assets/oak/guidelines/page-{i:02d}.webp", "WEBP", quality=78, method=6)
```

`PAGE_COUNT` in `components/GuidelinesCarousel.js` must match the page count.
