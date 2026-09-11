# CLAUDE.md – orienting.lu

This file is the source of truth for the website's positioning and design.

## What this site does

Orienting is Tzu-Ting Wang's advisory practice for scaling e-commerce businesses working across Europe.

The audience is global. The destination market is Europe.

The public category is scaling e-commerce businesses. Outreach can focus more narrowly on marketplaces and larger operators with product and operations teams.

### Who actually visits (decided 2026-08-22)

The site is shared through Ting's LinkedIn post and her word-of-mouth network, not through cold search. The typical visitor already knows her name or was just handed it. That gives the page three jobs, in order:

1. **Make Ting referable.** Give visitors a clear description of the buyers she serves and the problems she handles.
2. **Convert the qualified buyer** who does arrive, through the enquiry form.
3. **Be citable by answer engines.** People increasingly ask an assistant instead of searching.

All three want the same thing: concrete, named, verifiable, plainly stated. Vague consultant abstraction fails a referrer, a buyer, and a language model in the same way. When in doubt, name the entity and state the fact.

## Positioning

Core description:

> Ting helps scaling e-commerce businesses turn European requirements into product decisions, operating processes and clear ownership across teams.

Referral sentence:

> Talk to Ting when an e-commerce business is scaling across Europe and regulation is starting to slow growth or overload operations.

## Offer architecture

No prices, timelines, or generic engagement formats on the site. Lead with the buyer and the work. Scope follows the first conversation.

## Homepage structure

The homepage is one continuous mobile-first page:

1. Personal introduction and relevant Amazon experience
2. Three service areas
3. Enquiry form
4. Minimal footer

Visitors can understand the offer and contact Ting by scrolling from top to bottom. The Resources link appears in navigation and opens a separate page. The Contact link scrolls to the homepage form.

Keep the form as the primary contact path. Show `hi@orienting.lu` quietly below it as a trust signal and fallback.

There is no AI offer, workshop, newsletter, coaching offer, or portfolio navigation on the current site. Old coaching and portfolio routes redirect to the homepage.

## Proof

- **15+ years** across product, risk and compliance. Do not say ten; ten is only the Amazon half
- Ten years at Amazon's European headquarters across product, finance, and compliance risk
- One of three founding members of the team that built Amazon's European compliance program from the ground up
- The model later became Amazon's global standard
- Final Amazon role included advising European board members on risk and governance strategy
- Earlier advisory experience at Deloitte and KPMG
- MBA from IE Business School, with study at Yale University
- Works in English and Chinese, based in Luxembourg

Do not add stronger claims without evidence. **Never reproduce the Amazon, Deloitte, or KPMG logos** – naming them as employment history is fine, using their marks is not licensed.

## Being citable by answer engines

The mechanics that make this work, all added 2026-08-22:

- **Ting's full name in structured data and the footer**, with the conversational name Ting in the hero.
- **JSON-LD** in `index.html`: `ProfessionalService`, `Person` (with `alumniOf` and `sameAs` to LinkedIn and Luma), and `WebSite`.
- **FAQPage JSON-LD** and source-linked answers on `/resources`, separate from the homepage sales journey.
- **`robots.txt` explicitly allowing AI crawlers** (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot and others). This is a deliberate opt-in.
- **`sitemap.xml`** listing only the ready English pages.
- **Question-shaped resource headings**, phrased the way someone would ask an assistant.

None of this guarantees citation. It removes the reasons a model would fail to cite her.

The regulatory FAQ answers were checked against current official EU sources on 2026-08-23, and each visible answer links to its source. Ting remains the final domain owner and should review the answers whenever the underlying rules change.

## Voice

- Plain, direct, and specific
- Confident without hype
- Start with Ting's relevant operating experience, then state whom she helps now
- Use active voice
- Avoid jargon and grand claims
- Never imply that Orienting replaces qualified legal, tax, testing, or certification specialists

## Brand

- Wordmark: `ORIEN` + purple `TING`
- Background: white
- Primary purple: `#6B4AA6`
- Deep purple: `#472C7E`
- Text: `#2B2738`
- Surface: very light neutral purple
- Use no dot grid, decorative cards, or footer color band
- Headings and body: DM Sans
- Keep a narrow editorial reading column and generous white space
- Traditional Chinese: Noto Sans TC

## Technical setup

- Static HTML, CSS, and JavaScript. **No build step and no `node_modules`** – keep it that way
- English at `/`; resources at `/resources`; `/zh/` temporarily redirects to English until the Chinese version is reviewed
- Vercel hosting with clean URLs
- Pushes to `main` auto-deploy through the GitHub connection
- No analytics, tracking, or marketing cookies

### Enquiry form

`api/enquiry.mjs` is a Vercel serverless function that relays the form to `hi@orienting.lu` via Resend's REST API. It calls `fetch` directly rather than using the Resend SDK, which is why there is still no `package.json` and no dependency install. The `.mjs` extension is what makes Vercel treat it as an ES module without a `"type": "module"` package file.

Nothing is stored server-side. The message is relayed and dropped. A honeypot field named `website` catches bots; a filled honeypot returns 200 so the bot learns nothing.

Environment variables in Vercel:

| Variable | Required | Default |
|---|---|---|
| `RESEND_API_KEY` | yes | – |
| `ENQUIRY_TO` | no | `hi@orienting.lu` |
| `ENQUIRY_FROM` | no | Resend's shared `onboarding@resend.dev` sender |

`ENQUIRY_FROM` defaults to Resend's shared sender **on purpose**. Sending from `forms@orienting.lu` requires Resend domain verification and its DNS records. The existing iCloud SPF and DKIM records must remain valid. Add Resend to the single merged SPF record rather than creating a second SPF record.

**The Resend account must be registered to `hi@orienting.lu`.** Resend's shared `onboarding@resend.dev` sender can only deliver to the email address on the Resend account itself. Because `ENQUIRY_TO` is `hi@orienting.lu`, registering the account under any other address (a personal GitHub OAuth signup, for example) makes every submission fail with a 403 until a real domain is verified. This constraint disappears once `orienting.lu` is verified as a sending domain, not before.

Enquiries stay in `hi@orienting.lu`; do not forward them to a personal mailbox. Replies should come from the business address, and the privacy policy commits to a retention period that is hard to honour across a personal inbox.

## Key URLs

- Live: https://orienting.lu
- Vercel: https://orienting-lu.vercel.app
- Repository: https://github.com/tingwang-tech/orienting-lu
- Contact: hi@orienting.lu
- LinkedIn: https://www.linkedin.com/in/wangtzuting/
- Events (Luma): https://luma.com/user/usr-sBGOoekdV7BDtQ0

## Open items

- **Ting's Chinese name.** The `/zh/` pages use the romanised "Tzu-Ting Wang" throughout because the correct characters were not known. Add them to the `zh` copy and to `alternateName` in the `zh` JSON-LD.
- **Chinese copy review.** The `/zh/` page was drafted, not written by Ting. She reviews or rewrites it before it is treated as final.
- **DMARC.** iCloud SPF and DKIM are present, but `_dmarc.orienting.lu` has no public record. Add and monitor DMARC before moving to an enforcement policy.
- **No photo on the site.** For a solo practice shared into a personal network, a face helps.
- **Regulatory FAQ maintenance.** Recheck the answers and source links when the underlying EU rules change.
