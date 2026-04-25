# Phase 1.5 — Remaining Tasks
> Last updated: April 24, 2026
> All website development work is complete. Everything below is blocked on Tom, external providers, or the domain cutover.

---

## Blocked on Tom — Integrations

### P3.10 — Lead Routing Widget
- **What's needed:** Tom to confirm which lead routing widget to wire up
- **Why blocked:** We know it's a widget wire-up gap; Tom said it's not urgent since the site isn't live yet
- **When to trigger:** Before go-live

### P3.11 — Zuper CRM Intake
- **What's needed:** Zuper credentials and/or inbound webhook URL from Tom
- **Current state:** Chat widget has a "Connecting to Zuper" placeholder panel; the calendar button shows the placeholder and falls back to a tap-to-call
- **When to trigger:** Once Tom provides Zuper access — swap placeholder panel for real scheduler link/embed

### P3.12 — SMS Provider Decision
- **What's needed:** Tom to decide: Zuper native SMS vs. external provider (e.g., Twilio)
- **Why it matters:** Determines which service to configure AND triggers the 10DLC carrier registration process (1–3 week lead time)
- **Current state:** Opt-in consent is fully live on all CTAs; the SMS infrastructure behind it is not yet wired

### P3.13 — 10DLC Carrier Registration
- **What's needed:** Submit registration once P3.12 is decided
- **Lead time:** 1–3 weeks after submission
- **Current state:** Privacy Policy, Terms of Service, and opt-in language all live and compliant — ready to file as soon as the provider is chosen

---

## Blocked on Tom — Content & Assets

| Item | Status |
|---|---|
| Shingle tier pricing (from Dave at ABC Supply) | ABC Supply portal request unanswered — get prices directly from Dave |
| TAMKO Storm Fighter specs | Not on ABC Supply yet — need from Tom |
| Product images for 3 shingle tiers (Oakridge / Duration / TAMKO) | Pending |
| Real project photos | Pending |
| Team headshots | Tom is working on this |
| "What Our Customers Say" reviews section sign-off | Awaiting David or Tom feedback |

---

## Launch QA — Ready When Domain Is Connected

These can all be run once Tom gives the green light to connect `restorationroofingsc.com`.

- [ ] Run Lighthouse audit — target SEO score ≥ 95
- [ ] Run Google Rich Results Test on homepage, `/roof-quote`, and key service pages
- [ ] Connect `restorationroofingsc.com` in Vercel dashboard (Jimmy has GoDaddy access)
- [ ] Update `sitemap.xml` URLs from `rr-sc-website.vercel.app` → `restorationroofingsc.com`
- [ ] GA4 property setup + Search Console verification (DNS TXT record via GoDaddy)
- [ ] Submit sitemap to Google Search Console
- [ ] Final cross-browser/device QA pass
- [ ] Go-live

---

## After Launch (Phase 2+)

These are not blocking launch — flagged so nothing falls through the cracks.

- **After-hours voice agent** — Zuper may handle natively; confirm scope with Tom
- **Blog content launch** — infrastructure built, 9 posts ready; flip the switch when Tom approves
- **Automated blog system** — 9 posts/month (Tom confirmed); set up once blog is live
- **AEO/GEO/AIO strategy** — full plan in `docs/client-progress-update-2026-04-23.md`; needs Tom's green light
- **Google Reviews live feed** — API integration (needs Google Business Profile API access from Tom)
- **Careers page** — deferred post-launch
- **Referral / lead-gen landing page** — deferred post-launch
- **Accessibility audit (WCAG 2.1 AA)** — tap targets and reduced motion already done; full audit deferred
