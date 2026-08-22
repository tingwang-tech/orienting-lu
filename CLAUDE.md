# CLAUDE.md – orienting.lu

This file is the source of truth for the website's positioning and design.

## What this site does

Orienting is Tzu-Ting Wang's advisory practice for businesses entering or scaling across Europe.

The audience is global. The destination market is Europe.

The homepage serves two buyer paths:

1. Marketplace operators and businesses that support marketplaces
2. Sellers with multi-market or cross-functional European complexity

### Who actually visits (decided 2026-08-22)

The site is shared through Ting's LinkedIn post and her word-of-mouth network, not through cold search. The typical visitor already knows her name or was just handed it. That gives the page three jobs, in order:

1. **Make Ting referable.** Give visitors a clear description of the buyers she serves and the problems she handles.
2. **Convert the qualified buyer** who does arrive, through the enquiry form.
3. **Be citable by answer engines.** People increasingly ask an assistant instead of searching.

All three want the same thing: concrete, named, verifiable, plainly stated. Vague consultant abstraction fails a referrer, a buyer, and a language model in the same way. When in doubt, name the entity and state the fact.

## Positioning

Core promise:

> Turn European rules into your growth plan.

Ting connects European requirements to product, partner, seller, team, and operating decisions. She does not sell legal opinions, tax filings, product testing, certifications, or registrations. She helps define and coordinate specialist work when it is needed.

## Offer architecture

No prices, timelines, or generic engagement formats on the site. Lead with the buyer and the work. Scope follows the first conversation.

## Homepage structure

1. Hero: outcome-led, with the credential strip **above the CTA buttons** so it lands in the first screen
2. Two buyer paths, no per-card CTAs
3. Experience, opening with "I am Tzu-Ting Wang"
4. FAQ, eight question-shaped entries
5. Enquiry form
6. Footer with LinkedIn, Events, email, privacy

**Cut, do not reintroduce:** the right-side hero diagram, referral-trigger copy, engagement-shape cards, process explanations, and negative-then-positive constructions. Keep the page direct and buyer-focused.

There is no AI offer, workshop, newsletter, coaching offer, or portfolio navigation on the current site. Old coaching and portfolio routes redirect to the homepage.

## Proof

- **15+ years** across product, risk and compliance. Do not say ten; ten is only the Amazon half
- Ten years at Amazon's European headquarters across product, finance, and compliance risk
- Marketplace compliance work across nine European marketplaces
- Final Amazon role included advising European board members on risk strategy
- Earlier advisory experience at Deloitte and KPMG
- MBA from IE Business School, with study at Yale University
- Works in English and Chinese, based in Luxembourg

Do not add stronger claims without evidence. **Never reproduce the Amazon, Deloitte, or KPMG logos** – naming them as employment history is fine, using their marks is not licensed.

## Being citable by answer engines

The mechanics that make this work, all added 2026-08-22:

- **Ting's full name in visible body copy**, not only the footer. Before this, "Tzu-Ting Wang" appeared once in a copyright line and models had nothing to resolve the page to a person.
- **JSON-LD** in `index.html`: `ProfessionalService`, `Person` (with `alumniOf` and `sameAs` to LinkedIn and Luma), `WebSite`, and `FAQPage`. The FAQ answers are duplicated in full inside the `FAQPage` block, so a crawler gets the text even though the visible `<details>` are collapsed. The Chinese page is pending review and has not received this update.
- **`robots.txt` explicitly allowing AI crawlers** (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot and others). This is a deliberate opt-in.
- **`sitemap.xml`** listing only the ready English pages.
- **Question-shaped H3s** in the FAQ, phrased the way someone would type them into an assistant.

None of this guarantees citation. It removes the reasons a model would fail to cite her.

The regulatory FAQ answers were checked against current official EU sources on 2026-08-23, and each visible answer links to its source. Ting remains the final domain owner and should review the answers whenever the underlying rules change.

## Voice

- Plain, direct, and specific
- Confident without hype
- Start with the visitor's situation, not Ting's biography
- Use active voice
- Avoid jargon and grand claims
- Never imply that Orienting replaces qualified legal, tax, testing, or certification specialists

## Brand

- Wordmark: `ORIEN` + purple `TING`
- Background: `#F5F1E6`
- Primary purple: `#6B4AA6`
- Deep purple: `#472C7E`
- Text: `#2B2738`
- Surface: `#FBF9F1`
- Use the dot grid and footer color band sparingly
- Headings: Plus Jakarta Sans
- Body: DM Sans
- Traditional Chinese: Noto Sans TC

## Technical setup

- Static HTML, CSS, and JavaScript. **No build step and no `node_modules`** – keep it that way
- English at `/`; `/zh/` temporarily redirects to English until the Chinese version is reviewed
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
