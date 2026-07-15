# CLAUDE.md — orienting.lu

Read this before touching any code. It is the project's source of truth for context, brand, and decisions.

---

## What this is

`orienting.lu` is Ting's personal home as a solo AI builder, in **English and Traditional Chinese (中文)**.
It is the de-gendered successor to How Mom AI (`howmomai.com`): same proven static-site structure and mechanics, rebranded around Ting herself. The "mom" framing gated people; this site drops it to reach the wider audience she sells to.

**Primary job: conversion.** Two paid offers sit front and center — a live **Workshop** and **1:1 Coaching** — backed by proof that she ships real products (`tax.orienting.lu`, `school.orienting.lu`). The newsletter is the low-friction "stay in touch" action.

Positioning: a personal, credibility-first page, not a directory. It opens with Ting and her Amazon track record, then routes to the offers.

### The spine (locked, superseded 2026-07-14)
Original through-line: **"I think like a product manager, and I make AI build it."** Ten years as a Sr PM at Amazon was the moat, framed as product judgment. This is superseded by the compliance-risk spine below, but the ladder concept (entry wedge → core build offer → premium transformation) may still be worth mapping onto the new positioning — not yet re-derived.

Original three-rung ladder for reference:
1. **Work smarter with AI** (automate a task that eats your week) – entry wedge, widest funnel, easiest yes.
2. **Build products end to end** (make the thing yourself, solo) – core promise, the flagship workshop.
3. **Become an AI PM** (think and build like one) – premium transformation, highest willingness to pay, the natural home for 1:1 Coaching.

### Hero message (current, decided by Ting 2026-07-15)
> Hi, I'm Ting. I spent a decade at Amazon's European HQ, working across product, finance, and compliance risk. In my final role, I advised Amazon's own European board members on risk strategies. Before Amazon, I advised Fortune 500 companies at Deloitte and KPMG.
>
> I now help product leaders, founders, and compliance-minded operators ship AI features that meet the EU AI Act, GDPR, and DSA. These are the strictest rules in the world for privacy, safety, and transparency. If your product survives Europe's rules, it will survive anywhere.

中文 (Ting's own translation, decided 2026-07-15):
> 我在亞馬遜歐洲總部待了十年，職位橫跨產品、財務與合規風險領域。在最後的職位上，我負責向 Amazon 歐洲董事會提供風險策略建議。加入亞馬遜之前，我曾在德勤（Deloitte）和畢馬威（KPMG）為《財星》500強企業提供諮詢服務。
>
> 現在我協助產品負責人、創辦人，以及重視法遵的營運者，推出符合《歐盟人工智慧法案》（EU AI Act）、《一般資料保護條例》（GDPR）及《數位服務法》（DSA）的人工智慧功能。這些是全球最嚴格的隱私、安全與透明度法規。若您的產品能通過歐洲法規的考驗，便能在任何地方立足。

**Hero CTA dropped (2026-07-15):** the "Join the live workshop" button under the hero bio has been removed — subscribing to the newsletter is now the only CTA in the hero section. The nav's "Live Workshop" link and the announcement bar's workshop CTA are untouched.

**Hero heading removed (2026-07-15):** the `hero__wordmark` ("Orienting") and `hero__tagline` ("# find your direction in AI" / 「找到你的方向」) lines have been removed from the hero section on both pages. The hero now opens directly on "Hi, I'm Ting." / 「嗨，我是 Ting。」. The wordmark still appears in the nav; the tagline no longer appears anywhere on the homepage.

Meta/OG/twitter description tags on both `index.html` and `zh/index.html` still reflect the 2026-07-14 version of the hero (decade at Amazon, compliance risk, EU AI Act/GDPR/DSA) and have not yet been updated for the 2026-07-15 Deloitte/KPMG and "strictest rules" additions.

**Still not reconciled with this pivot** (flagged, not changed): the offers block ("Two ways to build with me," Workshop/Coaching card copy framed around "build with AI, solo"), the proof section ("I build the things I teach"), and the nav's "About" link. Rewriting the offer cards means deciding whether the Workshop (Maven "build your second brain") and Coaching sessions themselves still teach solo-building, or have shifted toward shipping compliant AI features — that's a product-content decision, not a copy-alignment one. Left as-is until Ting decides.

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
| Domain (target, DNS pending) | https://orienting.lu |
| Live deploy | https://orienting-lu.vercel.app |
| Vercel project | tings-projects-447d45ab/orienting-lu |
| Workshop (EN CTA) | https://maven.com/ting/build-your-second-brain |
| Workshop (中文 CTA) | TBD — Chinese Maven course not set up yet; points to build-your-second-brain until it exists |
| Coaching booking | hi@orienting.lu (mailto placeholder) — TBD real booking link |
| Newsletter feed | https://howmomai.substack.com/feed, filtered to Field Notes issues only via a slug allowlist in script.js (no category marker exists in the feed to filter automatically) |
| Products (proof) | https://tax.orienting.lu (Railway) · https://school.orienting.lu (Vercel, separate project `lux-school-calendar`) |
| Template site | ~/Desktop/howmomai |

---

## Deploy status

Deployed via Vercel CLI directly (not yet via GitHub — see Open items). Live now at the `.vercel.app` URL above.

`orienting.lu` and `www.orienting.lu` are attached to this Vercel project, but **DNS is not yet pointed at Vercel** — the domain is registered through a third party (EuroDNS), and its current nameservers/records don't resolve to Vercel. The root domain will not go live until Ting adds this DNS record at the registrar:

```
A    orienting.lu    76.76.21.21
A    www.orienting.lu    76.76.21.21
```

(This mirrors how `school.orienting.lu` already resolves to Vercel today — same pattern, one more record.)

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
| Replace PM-who-builds hero with compliance-risk hero (2026-07-14) | Ting-directed pivot toward the EU AI Act / GDPR / DSA compliance-for-AI-features positioning, closer to her original Orienting advisory identity than the solo-builder spine. Offers block, proof section, and meta tags not yet updated to match — see Open items. |

---

## Open items

- **DNS**: add the `A` records above at the registrar (EuroDNS) to make `orienting.lu` live — the one step only Ting can do.
- **GitHub repo**: not yet created. Current deploy is a direct Vercel CLI push (`vercel deploy`), not the GitHub-linked auto-deploy-on-push setup How Mom AI uses. Create `tingwang-tech/orienting-lu` on GitHub, then connect it in the Vercel project settings (or `vercel git connect`) for that workflow.
- Newsletter feed source: howmomai Substack vs a dedicated Orienting Substack (mom-framed titles would surface on a de-mom'd site if the slug allowlist in script.js isn't kept up to date).
- Coaching booking link (real form to replace the `hi@orienting.lu` mailto placeholder).
- 中文 Workshop URL once the Chinese Maven course exists.
- Dedicated Orienting OG image / logo mark.
- **Hero pivot follow-through (2026-07-14)**: hero and meta/OG/twitter tags now lead with compliance-risk positioning. Still open: offers block and proof section copy still speak the old PM-who-builds framing. Decide whether the Workshop/Coaching offers themselves have shifted toward "ship compliant AI features," or whether they still teach solo-building and just sit under a different hero.
