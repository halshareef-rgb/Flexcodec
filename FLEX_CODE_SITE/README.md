# Flex Code — Corporate Website

A bilingual (English / Arabic RTL), dependency-free static website for **Flex Code**, a Saudi
technology company working in legal tech, medico-legal systems, advisory and enterprise platforms,
in alliance with [NavyBits](https://www.navybits.com/) and
[NextEdge Technologies](https://nxtech.tech/) of Dubai.

## Quick start

Open `index.html` in a browser. That's it — there is no build step, no framework and no server
requirement for local viewing.

For a local server (recommended, so relative paths and fonts behave exactly as in production):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Structure

```
.
├── index.html            Home
├── services.html         Four practices (legal tech, medico-legal, advisory, enterprise)
├── solutions.html        Platforms and products
├── industries.html       Sectors served
├── partners.html         The NavyBits and NextEdge alliances
├── about.html            Company, principles, compliance posture
├── insights.html         Article hub + newsletter sign-up
├── careers.html          Roles + application form
├── contact.html          Contact form and details
├── ar/                   Arabic (RTL) mirror of all nine pages
├── assets/
│   ├── css/styles.css    Design system: tokens, layout, components
│   ├── css/rtl.css       Arabic typography + RTL exceptions
│   ├── js/main.js        Theme, nav, scroll reveal, counters, forms (vanilla JS)
│   └── img/              Logo assets (see below)
├── tools/                Optional page generator (see below)
├── sitemap.xml
├── robots.txt
└── CONTENT-TODO.md       Every placeholder that must be replaced before launch
```

## Brand system

Colours come from the Flex Code brand sheet (`assets/FlexCodeColorsAndLogosjpeg.jpeg`):

| Hex | Name | Use |
|---|---|---|
| `#0D1B2A` | Navy | Dark sections, header, footer, body text |
| `#1E3A8A` | Indigo | Gradient start, chip text, link hover |
| `#2563EB` | Royal blue | Primary — buttons, links, eyebrows |
| `#06B6D4` | Cyan | Accent — gradient end, dark-section highlights |
| `#E6F6FF` | Ice | Chips, icon tints, alternating sections |

These five sit inside a ten-step ramp (`--b-900` … `--b-050`) that fills in the hover states,
borders and tints a site needs. The signature gradient (`--grad`) runs indigo → royal → cyan at 135°,
matching the `</>` mark. A separate `--grad-btn` stops at royal blue: white text on full cyan is only
2.43:1, so buttons never reach that end. The pixel-dissolve motif from the logo reappears as the
animated `.pixfield` decoration on dark sections.

### Logo assets

Built from the two files you supplied (`assets/FlexCodeLogoWhite_BG.jpeg`,
`assets/FlexCodeLogoBlack_BG.jpeg`), which stay in `assets/` as the originals.

| File | Used for |
|---|---|
| `img/flexcode-mark.svg` | Header lockup and favicon. Vector, redrawn to the brand palette so it stays sharp at 34px. |
| `img/flexcode-logo-light.jpg` | Hero logo panel in the **light** theme — the light artwork baked onto `#FFFFFF`. |
| `img/flexcode-logo-dark.jpg` | Hero logo panel in the **dark** theme — the dark artwork baked onto `#060F1A`. |
| `img/flexcode-og.jpg` | 1200×630 social sharing card. |
| `img/flexcode-icon-512.png` | Apple touch icon / PWA icon. |
| `img/flexcode-logo-transparent-on-light.png` | Spare transparent master for decks and documents on **light** backgrounds. |
| `img/flexcode-logo-transparent-on-dark.png` | Spare transparent master for **dark** backgrounds. |

The two hero files are baked onto a solid colour rather than kept transparent: it drops them from
~380KB to ~40KB each with no visible seam, because `.frame--logo` paints exactly the same colour
behind them. **If you change that background colour in CSS, re-bake the images to match** — the two
values are `#FFFFFF` (light) and `#060F1A` (dark).

They are declared as CSS `background-image`, not `<img>`, so only the active theme's file is
downloaded. The panel carries `role="img"` and an `aria-label` so screen readers still announce it.

### Light and dark themes

The site ships with both. `assets/css/styles.css` defines semantic tokens (`--surface`,
`--surface-alt`, `--card`, `--inv`, `--tx`, `--accent` …) and the dark theme simply redefines them —
no component rule is duplicated per theme.

**What flips and what doesn't.** Two groups of tokens:

- **Chrome** (`--chrome*`) — the hero, header and footer. Light in the light theme (white/ice ground,
  dark text), dark in the dark theme.
- **Feature bands** (`--inv*`) — the `.sec--dark` strips, the closing CTA card and `.card--dark`.
  These stay brand navy in **both** themes. They are the page's rhythm and the reason navy still
  appears on a light page; treating them as chrome would flatten the whole design.

Decoration follows the same split: grid lines, pixel motif and aurora glow all read dark-on-light in
the chrome and light-on-dark inside the feature bands.

- A small inline script in each page's `<head>` sets `data-theme` on `<html>` **before first paint**,
  so there is no flash of the wrong theme. It honours a saved choice first, then the OS setting.
- The sun/moon button in the header toggles it and stores the choice in `localStorage` under
  `fc-theme`. That choice then persists across pages and visits.
- With JavaScript disabled, a `prefers-color-scheme` media query still applies the dark theme.
- The `<meta name="theme-color">` value follows the active theme.

**Maintenance note:** the dark token block appears **twice** in `styles.css` — once under
`:root[data-theme="dark"]` and once inside the media query. CSS has no way to share one block between
the two, so if you change a dark value, change both copies. They are adjacent and clearly commented.

Typefaces: **Plus Jakarta Sans** (Latin), **IBM Plex Sans Arabic** (Arabic), **JetBrains Mono**
(small technical labels), all loaded from Google Fonts with system fallbacks.

## Editing content

Two options — pick one and stay with it:

1. **Edit the HTML directly.** The generated files are ordinary, readable HTML. If you take this
   route, delete `tools/` so nobody regenerates over your edits.
2. **Edit the generator.** Content lives in `tools/content_en.py` and `tools/content_ar.py`; shared
   chrome (head, header, footer, icons, components) lives in `tools/build.py`. Then run:

   ```bash
   python3 tools/build.py     # rewrites all 18 HTML files
   ```

   Company-wide values (email, phone, address, domain, social links) are in the `SITE` dictionary at
   the top of `tools/build.py` — change them once and rebuild.

## Before launch

Read **CONTENT-TODO.md**. Every placeholder in the site is listed there, grouped by priority.
Search the project for `TODO` and `[` to find them in context:

```bash
grep -rn "TODO" --include=*.html --include=*.py .
```

The three that block launch: real contact details, real company registration data, and a working
back end for the three forms (contact, careers, newsletter) — they are front-end only today.

## Deployment

Any static host works. Upload the whole directory (excluding `tools/` if you prefer):

- **Netlify / Vercel / Cloudflare Pages** — drag and drop, or connect the repository. No build command.
- **GitHub Pages** — push to a repo and enable Pages on the branch root.
- **Traditional hosting** — upload via FTP/SFTP to the web root.

After deploying, update `SITE["domain"]` in `tools/build.py`, rebuild, and regenerate `sitemap.xml`
and `robots.txt` so they carry the live domain.

## Accessibility & performance notes

- Skip link, visible focus rings, `aria-current` on the active nav item, labelled form fields.
- The theme toggle carries `aria-pressed` and a label that updates with the current state.
- Every text/background pair in both themes was measured against WCAG AA — including gradient
  buttons, which were checked by sampling rendered pixels rather than computed styles. The worst
  case is 5.17:1 for small text.
- `prefers-reduced-motion` is respected — all animation is disabled for users who ask for it.
- Content is fully readable with JavaScript disabled; JS only adds the mobile menu, reveal
  animations and counter animation.
- No external JS or CSS frameworks. The only network dependency is Google Fonts; self-host the two
  families if you want a zero-third-party build.
- Every page validates as well-formed HTML with exactly one `<h1>`, and no page scrolls horizontally
  at 390px, 768px, 1024px or 1440px.

## Licence / ownership

All site code and copy in this repository is the property of Flex Code. The logo file
(`FlexCodeLogo.jpeg`) was supplied by the client.
