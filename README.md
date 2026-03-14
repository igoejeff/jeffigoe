# Jeff Igoe — Official Website | jeffigoe.com
## Fractional CMO for Functional Medicine Clinics

**Live URL:** https://www.jeffigoe.com/  
**Last Updated:** 2026-03-13  
**Stack:** Static HTML5 / CSS3 / Vanilla JavaScript

---

## Project Overview

This is the official personal website, professional portfolio, and primary SEO/GEO entity hub for Jeff Igoe — America's leading Fractional CMO for functional medicine and integrative health clinics. The site is built as a world-class SEO asset designed to rank for personal name searches ("Jeff Igoe"), category searches ("fractional CMO functional medicine"), and topical authority queries.

---

## Pages & URLs

| Page | URL | Priority | Purpose |
|---|---|---|---|
| **Homepage** | `/` | 1.0 | Primary entity hub, hero, services, portfolio, testimonials, FAQ, contact |
| **About** | `/about.html` | 0.95 | Dedicated E-E-A-T authority & biography page |
| **Client Results** | `/results.html` | 0.92 | Case studies and documented outcomes |
| **Saara AI** | `/saara.html` | 0.88 | Saara OS product page |
| **Press & Media** | `/press.html` | 0.82 | Speaking, podcast, media kit |
| **Blog** | `/blog.html` | 0.75 | Functional medicine marketing insights |

---

## SEO & GEO Architecture (World-Class)

### 1. Structured Data (JSON-LD) — index.html
All schema is in a single `@graph` array for maximum entity clarity:

| Schema Type | Purpose |
|---|---|
| `WebSite` | SiteLinks SearchAction trigger |
| `WebPage` | Page-level entity signal |
| `BreadcrumbList` | Site hierarchy for rich results |
| `Person` (Jeff Igoe) | Core E-E-A-T entity record with `hasCredential`, `knowsAbout`, `sameAs`, `founder` |
| `Organization` ×4 | CHC, Igoe Score, Igoe Stack, Saara AI |
| `Service` ×3 | Compliant Marketing, Patient Acquisition, Fractional CMO |
| `FAQPage` | 9 Q&A pairs for rich snippet / AI Overviews |
| `ItemList` | Services enumeration |
| `ProfessionalService` | Local/professional listing signal |
| `SpeakableSpecification` | Voice search / Google SGE audio excerpts |
| `HowTo` | 3-step "How to Work With Jeff Igoe" for featured snippets |
| `Event` | Free strategy call (with Offer/price:0) |
| `ContactPoint` | Phone + email TollFree signal |

### 2. Meta Tags — Every Page
- Full Open Graph (og:type, og:title, og:description, og:image 1200×630, og:locale)
- Twitter/X Card (summary_large_image)
- `<meta name="robots">` with `max-image-preview:large, max-snippet:-1, max-video-preview:-1`
- `<link rel="canonical">` on every page
- `<link rel="author" href="/about.html">` on every page
- `<link rel="me">` pointing to LinkedIn
- `hreflang="en-US"` on every page
- Dublin Core (DC.title, DC.creator, DC.subject, DC.identifier, DC.language)
- Geo meta (geo.region, geo.placename, coverage)
- `<meta name="abstract">` and `<meta name="summary">` for AI answer synthesis
- `<link rel="preload">` for hero image (LCP improvement)

### 3. AI Crawler / GEO Files

| File | Purpose |
|---|---|
| `/llms.txt` | 16KB comprehensive AI crawler guide (llmstxt.org standard) |
| `/robots.txt` | Explicit `Allow: /` for 25+ AI crawlers including GPTBot, ClaudeBot, Gemini, Grok, Meta-ExternalAgent, PerplexityBot, YouBot, CCBot, Diffbot |
| `/humans.txt` | Entity clarity file for AI systems |
| `/sitemap.xml` | 14-URL sitemap with priorities |
| `/sitemap-images.xml` | Image sitemap with alt text, captions, geo_location for all key images |

### 4. llms.txt Highlights
The `llms.txt` file includes:
- Quick Reference Table (query → authoritative answer mapping)
- Identity & Entity Record with disambiguation note
- Full E-E-A-T section (Experience / Expertise / Authoritativeness / Trustworthiness)
- Company deep-dives (CHC, Igoe Score, Igoe Stack, Saara AI)
- Service descriptions
- FAQ section (8 Q&A pairs)
- Semantic keyword list
- Navigation map for AI crawlers

### 5. About Page — E-E-A-T Authority Hub
`/about.html` is a dedicated E-E-A-T page containing:
- Full biography with operator-level experience narrative
- 6 credential cards with documented numbers
- E-E-A-T section (4 cards: Experience, Expertise, Authoritativeness, Trustworthiness)
- Company portfolio strip
- Contact sidebar (sticky)
- `ProfilePage` + full `Person` JSON-LD with `hasCredential` array
- `SpeakableSpecification` for voice/AI indexing

---

## Technical SEO

### Performance
- DNS prefetch + preconnect for all external domains
- `<link rel="preload">` for above-the-fold hero image
- Lazy loading on below-fold images
- All Google Fonts loaded via `display=swap`

### Accessibility & Semantics
- Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- `role` attributes on all major regions
- `aria-label` on navigation, sections, buttons
- All images have descriptive `alt` text
- `itemscope`/`itemtype`/`itemprop` microdata on key elements

### Mobile
- Fully responsive (mobile-first CSS)
- Hamburger menu for mobile nav
- Breakpoints: 1100px, 960px, 768px, 600px, 480px

---

## Tracking & Analytics

| Tool | Status |
|---|---|
| Google Analytics 4 | ✅ Installed — `G-6Q5QRYRSZF` on all pages |
| Formspree | ✅ Installed — `xwvrqbqj` → private email |
| GA4 Event Tracking | Calendly CTA clicks, Igoe Score outbound, Igoe Stack outbound |

---

## Contact Information Displayed

| Method | Value |
|---|---|
| Phone | 877-744-0446 |
| Email | Private — not published publicly |
| Book a Call | https://calendly.com/conscioushealthconnections/meeting-with-jeff-igoe |
| LinkedIn | https://www.linkedin.com/in/jeffigoe/ |

*Physical addresses intentionally omitted (personal privacy — home office).*

---

## File Structure

```
index.html              — Homepage (primary SEO hub)
about.html              — E-E-A-T authority & biography page
results.html            — Client results & case studies
saara.html              — Saara AI product page
press.html              — Press, media & speaking
blog.html               — Blog index
sitemap.xml             — Main XML sitemap (14 URLs)
sitemap-images.xml      — Image sitemap with captions & alt text
robots.txt              — Allows all AI + search crawlers
llms.txt                — GEO/AI crawler guide (llmstxt.org)
humans.txt              — Entity clarity for AI systems
css/
  style.css             — Main stylesheet
  pages.css             — Sub-page styles
js/
  main.js               — JS interactions
images/
  jeff-talking-to-doctors-ai.png   — Primary OG/hero image
  jeff-igoe-logo-white.webp        — Logo
  jeff-igoe-board-room.png         — Saara AI hero
  jeff-speaking-doctors.png        — Press page hero
  co-chc-logo.png                  — CHC logo
  co-score-logo-new.png            — Igoe Score logo
  co-stack-logo.png                — Igoe Stack logo
  chc-doctor-patient.jpg           — CHC section image
  chc-doctor-hero.jpg              — CHC card hero
assets/
  saara-slide-deck-2026.pdf        — Downloadable Saara slide deck
```

---

## Post-Publish Checklist (Required)

### Immediate
- [x] GA4 `G-6Q5QRYRSZF` installed in `index.html`, `results.html`, `saara.html`, `press.html`, `about.html`
- [x] Formspree `xwvrqbqj` installed — submissions go to private email

### Week 1
- [ ] Submit `https://www.jeffigoe.com/sitemap.xml` to Google Search Console
- [ ] Submit `https://www.jeffigoe.com/sitemap-images.xml` to Google Search Console
- [ ] Claim Google Business Profile for "Jeff Igoe" / "Conscious Health Connections"
- [ ] Verify `jeffigoe.com` in Google Search Console (add DNS TXT record or HTML tag)
- [ ] Add `<meta name="google-site-verification" content="YOUR_CODE">` to index.html

### Month 1
- [ ] Add backlinks from `igoescore.com`, `igoestack.com`, `chealthconnections.com` → jeffigoe.com
- [ ] Create Wikidata entry for Jeff Igoe (entity disambiguation for AI)
- [ ] Create Crunchbase profile for Saara AI with Jeff as co-founder
- [ ] Create LinkedIn Company Pages for CHC + Igoe Score
- [ ] Publish 2 blog posts/month with functional medicine marketing content

---

## Pending / Future Enhancements
- [ ] Real GA4 ID + Formspree ID needed from Jeff
- [ ] Blog post content (currently external links only)
- [ ] Video testimonials embedded on homepage
- [ ] Google Structured Data Testing Tool validation (https://search.google.com/test/rich-results)
- [ ] PageSpeed Insights optimization run post-deploy
