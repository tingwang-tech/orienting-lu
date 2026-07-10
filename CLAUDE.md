# CLAUDE.md — orienting.lu

Read this before touching any code. It is the project's source of truth for context, brand, and decisions.

---

## What this is

`orienting.lu` is Ting's personal home as a solo AI builder, in **English and Traditional Chinese (中文)**.
It is the de-gendered successor to How Mom AI (`howmomai.com`): same proven static-site structure and mechanics, rebranded around Ting herself. The "mom" framing gated people; this site drops it to reach the wider audience she sells to.

**Primary job: conversion.** Two paid offers sit front and center — a live **Workshop** and **1:1 Coaching** — backed by proof that she ships real products (`tax.orienting.lu`, `school.orienting.lu`). The newsletter is the low-friction "stay in touch" action.

Positioning: a personal, credibility-first page, not a directory. It opens with Ting and her Amazon track record, then routes to the two offers.

---

## Brand

The name is the hook. **Orienting** carries "the Orient" (Ting is from Taiwan, the East), "orientation" (finding direction), and the "-ing" of continuous building. She lives in the West and points others forward. Her name sits inside the word.

- **Wordmark:** `ORIEN` + emphasized `TING` — one word, reveals her name. Render the "ting" in deep purple via a `<span>`.
- **Tagline:** EN "Find your direction in AI." · 中文 「找到你的方向」.

### Palette — inherit the frozen Orienting visual brand
Source of truth: the `orienting-field-notes-visual` skill's `design.md` in the ai-brain repo. Purple is the one owned color (unclaimed in AI: Anthropic is clay, OpenAI near-black). Website, Field Notes cover cards, and products read as one brand.

```css
--color-bg: #F5F1E6;             /* cream paper */
--color-primary: #6B4AA6;        /* purple ink — hero, owned color, CTAs */
--color-primary-hover: #472C7E;  /* deep purple — emphasis, the "ting" highlight */
--color-text: #2B2738;           /* title/body text */
--color-text-muted: #8B84A0;     /* muted — taglines, secondary */
--color-surface: #FBF9F1;        /* lighter paper for cards */
--color-dot: #CFC6AE;            /* dot-grid texture */
/* rainbow foot accents (small recurring signal only): #E4572E #F3A712 #3CAEA3 #4A6FE3 #6B4AA6 */
```

Recurring signals from the cover card, used sparingly: a subtle **dot-grid** texture and a small **rainbow band** as a footer/section detail — never as the palette.

### Type — hybrid
Readable sans for body (DM Sans body + Plus Jakarta Sans headings, from How Mom AI). Monospace (`'SF Mono', ui-monospace, Menlo, monospace`) carries the engineer's-notebook motif on the **wordmark, section labels, and CTAs**. CJK stack (`Noto Sans TC`) for the `/zh/` pages.

Copy is always written in Ting's voice — load VOICE.md before drafting a word.

---

## Structure (planned)

- `/` (EN, default) and `/zh/` (中文), full mirror. `EN | 中文` toggle in nav on every page, linking to the sibling page.
- **Homepage:** announcement bar · nav · hero (wordmark + tagline + credibility-first bio) · offers block (Workshop + Coaching) · proof (tax/school product cards) · newsletter feed (RSS) + subscribe · footer · cookie banner.
- `/coaching` — coaching offer + Apply/Book CTA.
- `/privacy` — privacy policy.
- **Workshop** — nav links straight to Maven (single source of truth, no on-page page to go stale).

Reuse from How Mom AI wholesale: `script.js` (cookie gate + Substack RSS + hamburger + announcement), the cookie banner / subscribe-gate markup, and `style.css` as a base (swap palette + add wordmark/toggle/offers/proof styles).

---

## Key URLs

| Thing | URL |
|---|---|
| Domain | https://orienting.lu |
| Workshop (EN CTA) | https://maven.com/ting/build-your-second-brain |
| Workshop (中文 CTA) | TBD — Chinese Maven course not set up yet; points to build-your-second-brain until it exists |
| Coaching booking | TBD — no link yet; ship placeholder (newsletter capture / mailto / Google Form) |
| Newsletter feed | https://howmomai.substack.com/feed *(under review — may move to a dedicated Orienting Substack)* |
| Products (proof) | https://tax.orienting.lu · https://school.orienting.lu |
| Template site | ~/Desktop/howmomai |

---

## Decisions log

| Decision | Rationale |
|---|---|
| De-gender How Mom AI into orienting.lu | The "mom" frame gated the wider audience Ting wants to sell to |
| Personal home, not a directory | A credibility-first personal page converts to paid better than a hub |
| Workshop + Coaching front and center | The site's primary job is getting people to pay |
| Inherit the frozen Orienting purple palette | One brand across site, Field Notes, and products; purple is unclaimed in AI |
| Separate `/` + `/zh/` URL paths (not JS text-swap) | Better SEO and quality for the Chinese pages |
| Plain HTML/CSS/JS on Vercel | Max speed, no build step; same as How Mom AI |
| Design in claude.ai/design first, then build | Design-first; `/design-sync` deferred until there's a real component library to sync (Phase 2) |

---

## Open items (confirm before deploy)

- Newsletter feed source: howmomai Substack vs a dedicated Orienting Substack (mom-framed titles would surface on a de-mom'd site).
- Coaching booking link (real form to replace the placeholder).
- 中文 Workshop URL once the Chinese Maven course exists.
- Dedicated Orienting OG image / logo mark.
