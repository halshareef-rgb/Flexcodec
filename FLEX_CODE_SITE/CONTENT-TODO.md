# Pre-launch checklist — placeholders to replace

Everything below is a deliberate placeholder. Nothing here is invented fact presented as real:
figures, names, addresses and client logos are all marked. Work top-down.

---

## 1. Blocks launch

### Company contact details — `tools/build.py`, `SITE` dictionary
| Key | Current placeholder | Needed |
|---|---|---|
| `domain` | `flexcode.sa` | Confirm the live domain |
| `email` | `info@flexcode.sa` | Real, monitored inbox |
| `phone` | `+966 11 000 0000` | Real landline |
| `whatsapp` | `+966 50 000 0000` | Real mobile, or remove |
| `hq` | `[Riyadh HQ — street, district, Riyadh, KSA]` | Full postal address |
| `cr` / `vat` | `[Commercial Registration No.]` / `[VAT No.]` | Legally required on Saudi commercial sites |
| `linkedin` / `x` | placeholder URLs | Real profiles, or delete the icons |

Also confirm `careers@…` exists (referenced on the Careers page).

### Forms are front-end only
`contact.html`, `careers.html` and `insights.html` (newsletter) show a success message and reset;
nothing is sent. Connect each to a mail service, CRM or form endpoint and add spam protection.
See `data-demo-form` in `assets/js/main.js`.

### Legal pages
The footer links to Privacy Policy, Terms of Use and a PDPL Notice — all currently `#`.
A PDPL-compliant privacy notice is a legal requirement given the forms collect personal data.

---

## 2. Should be fixed before promoting the site

### Home page statistics — `tools/content_en.py` / `content_ar.py`, `page_index`
Four figures: `4` practice areas, `3` markets, `10+` years across the partner network,
`24/7` support. The first two follow from the brief; the last two need verification —
`10+` is drawn from NavyBits' publicly stated Odoo experience, not from Flex Code's own history,
and the support figure must match the actual SLA. Replace or remove.

### Leadership — `about.html` / `ar/about.html`
`[Name] — [Title]` × 3. Add real names, titles, photographs and short bios.

### Company facts — `about.html`
No founding year, headcount, CR number or office photography yet.

### Regional presence — `contact.html`, `industries.html`
UAE and Lebanon coverage is now described as running through the partners (NextEdge Technologies in
Dubai and Beirut, NavyBits in Beirut), with `[direct contact to be confirmed]` in place of numbers.
Add the contact routes, and confirm the wording matches the legal reality in each market — whether
Flex Code has registered entities there, or coverage is purely through partners.

### Client logos — `index.html`
The "Trusted across sectors" strip shows sector names in dashed placeholder boxes, with a visible
note that client names will follow. Replace with real logos only once you hold written approvals.

### Product names — `solutions.html`
The six Flex Code platforms are described generically ("Matter & Case Management",
"Medico-Legal Case Platform", …). If you want branded product names, decide them and check
trademark availability first. `Orbit`, `SEHAFlow` and `Odoo` are NavyBits / third-party names,
and `Documentum`, `Bizagi Case Manager`, `IBM watsonx` and `Google Gemini` are platforms NextEdge
works with — all are attributed as such rather than claimed.

### Partner claims — `partners.html`, `solutions.html`
Capabilities attributed to NavyBits and NextEdge Technologies are taken from their own public
websites. Before launch, confirm with each partner that they are happy with how they are described
and that a public reference to the alliance is agreed — ideally in writing, alongside logo usage.

### Delivery timeline claim — `services.html` FAQ
"8–16 weeks" for a first release. Confirm with delivery leadership or soften the wording.

### Careers
The seven listed roles are illustrative. Replace with the real vacancy pipeline or link to your ATS.
Growth/benefits claims ("training budget", "certification support") need HR sign-off.

### Insights
Six article titles are planned, not published. Each card says "Article coming soon" and an editorial
note appears above the grid. Either publish the articles and link the cards, or remove the section
from the nav until content is ready.

---

## 3. Polish

- **The two logo files are not a matched pair.** `FlexCodeLogoWhite_BG.jpeg` is the new artwork and
  matches the brand sheet. `FlexCodeLogoBlack_BG.jpeg` is byte-identical to the original logo supplied
  at the start of the project — same size, same timestamp — so it still carries the older, more
  electric cyan rather than the sheet's `#06B6D4`. The difference is small on screen, but if you want
  them consistent, export a dark-background version of the *new* artwork and I will re-bake
  `flexcode-logo-dark.jpg` from it.
- **Favicon** — currently the SVG mark. Add a `favicon.ico` and a 512px PNG for older clients.
- **Open Graph image** — currently the square logo. A 1200×630 social card would render better.
- **Map** — the contact page has space for an embedded map once the address is confirmed.
- **Analytics** — none installed. Add your chosen tool, and cover it in the privacy notice.
- **Self-hosted fonts** — Google Fonts is the only third-party request. Self-hosting removes it.
- **Photography** — the site is currently illustration- and typography-led. Real office and team
  photography would strengthen About and Careers considerably.
- **Arabic proofreading** — the Arabic content is complete and idiomatic, but should be read once by
  a native legal-sector copywriter before launch, particularly the practice-area terminology.

---

## Finding placeholders in context

```bash
grep -rn "TODO" --include=*.html --include=*.py .
grep -rn "\[" --include=*.html . | grep -v "<!--"
```
