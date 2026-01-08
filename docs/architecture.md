# INOSX Website - Technical Architecture

**Document Version:** 1.0.0  
**Last Updated:** January 8, 2026

---

## 🏗️ Architecture Overview

The INOSX website is a **static single-page application (SPA)** designed for simplicity, performance, and cost-effectiveness. This document describes the current technical architecture and proposed enhancements for lead capture and analytics.

---

## 📐 Current Architecture

### Technology Stack

```
┌─────────────────────────────────────┐
│        Frontend (Client-Side)       │
├─────────────────────────────────────┤
│ • Pure HTML5 + CSS3 + Vanilla JS    │
│ • No frameworks (React, Vue, etc.)  │
│ • No build process                  │
│ • Inline CSS & JS                   │
└─────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│          Static Hosting             │
├─────────────────────────────────────┤
│ • GitHub Pages (inferred from CNAME)│
│ • CDN: GitHub's edge network        │
│ • SSL: Automatic via GitHub         │
└─────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│       External Dependencies         │
├─────────────────────────────────────┤
│ • ElevenLabs widget (unpkg CDN)     │
│ • thum.io (screenshot service)      │
└─────────────────────────────────────┘
```

### File Structure

```
Repository Root
├── index.html              # Main site (1523 lines)
├── terms.html              # Legal pages
├── CNAME                   # Domain: inosx.com
├── favicon16x16.ico        # Browser icons
├── favicon32x32.ico
├── INOSXlogo.png           # Brand assets
├── datagpt.png             # Product screenshots
├── Messiax_tela.png
├── PSYCHOX_tela.png
├── ps1.png
├── /audio                  # Audio files (currently unused)
│   ├── inosx.mp3
│   ├── there-are-no-more-websites.mp3
│   ├── theres-only-ai.mp3
│   └── we-create-ai.mp3
└── /docs                   # This documentation (not public)
    └── *.md
```

---

## 🎨 Frontend Architecture

### HTML Structure

**Single Page Layout:**
```html
<body>
  <!-- Background Effects -->
  <div class="particles">...</div>
  
  <!-- Hero Section -->
  <div class="main-container">
    <div class="two-column-layout">
      <div class="left-column">...</div>
      <div class="right-column">
        <elevenlabs-convai>...</elevenlabs-convai>
      </div>
    </div>
  </div>
  
  <!-- Section Dividers -->
  <div class="section-divider">...</div>
  
  <!-- Products Carousel -->
  <div class="carousel-wrapper">...</div>
  
  <!-- Services Grid -->
  <div class="services-section">...</div>
  
  <!-- Footer -->
  <footer class="inosx-footer">...</footer>
  
  <!-- Scripts -->
  <script>...</script>
</body>
```

### CSS Architecture

**Approach:** Utility-first inline CSS with design system variables

**Design Tokens:**
```css
:root {
  /* Colors */
  --bg-color: #0b1020;
  --text-color: #e6f0ff;
  --accent-color: #7dd3fc;
  --secondary-color: #a78bfa;
  
  /* Gradients */
  --gradient-primary: linear-gradient(135deg, #7dd3fc 0%, #60a5fa 45%, #8b5cf6 100%);
  --gradient-secondary: linear-gradient(135deg, #8b5cf6 0%, #60a5fa 100%);
  
  /* Surfaces */
  --surface-glass: rgba(148, 163, 184, 0.08);
  --border-soft: rgba(125, 211, 252, 0.28);
  
  /* Typography */
  --font-size-large: clamp(2rem, 6vw, 4rem);
  --font-size-medium: clamp(1.5rem, 4vw, 2.5rem);
}
```

**CSS Organization:**
- ~880 lines total
- Reset and base styles
- Component-specific styles
- Responsive media queries
- Animation keyframes

### JavaScript Architecture

**Approach:** Vanilla ES6+ JavaScript, no dependencies

**Core Modules (Conceptual):**

1. **Particle System**
   ```javascript
   createParticles()     // Generate animated background
   initParticleLines()   // Draw connections via canvas
   ```

2. **Carousel Controller**
   ```javascript
   initCarousel()        // Setup product carousel
   - Auto-scroll logic
   - Manual navigation
   - Indicator sync
   ```

3. **Widget Manager**
   ```javascript
   checkWidgetLoaded()   // Monitor ElevenLabs status
   forceMobileLayout()   // Ensure mobile rendering
   ```

4. **Event Handlers**
   - Window: load, resize, scroll, orientationchange
   - User interactions: clicks, hovers, swipes

**Performance Optimizations:**
- `requestAnimationFrame` for smooth animations
- Debounced resize handlers
- Event delegation where applicable
- Canvas for efficient particle rendering

---

## 🌐 Hosting & Deployment

### Current Hosting: GitHub Pages

**Characteristics:**
- ✅ Free hosting for static sites
- ✅ Automatic SSL (Let's Encrypt)
- ✅ Global CDN via GitHub's edge network
- ✅ Custom domain support (CNAME)
- ✅ Git-based deployment (push to deploy)
- ⚠️ Public repository required (or GitHub Pro)
- ⚠️ No server-side logic
- ⚠️ Limited analytics/logging

**Deployment Process:**
1. Commit changes to repository
2. Push to `main` branch (or configured branch)
3. GitHub Pages automatically rebuilds
4. Changes live in 1-3 minutes

**Domain Configuration:**
- **CNAME file:** `inosx.com`
- **DNS:** A/CNAME records point to GitHub Pages
- **SSL:** Automatic via GitHub

### Alternative Hosting Options (If Needed)

**1. Vercel**
- ✅ Excellent for static sites + serverless functions
- ✅ Built-in analytics
- ✅ Preview deployments for branches
- ✅ Easy form handling via Vercel Functions
- 💰 Free tier generous, paid tiers reasonable

**2. Netlify**
- ✅ Similar to Vercel
- ✅ Built-in form handling (perfect for contact forms!)
- ✅ Split testing (A/B tests)
- ✅ Analytics included
- 💰 Free tier available

**3. AWS S3 + CloudFront**
- ✅ Enterprise-grade scalability
- ✅ Full control over caching, security
- ✅ Integration with AWS ecosystem
- ⚠️ More complex setup
- 💰 Pay-as-you-go (typically very cheap for static sites)

**4. Cloudflare Pages**
- ✅ Global CDN (fastest edge network)
- ✅ Free tier very generous
- ✅ Built-in analytics, security features
- ✅ Serverless functions (Workers)
- 💰 Free for most use cases

**Recommendation for Lead Capture:**
**Netlify** or **Vercel** - Both offer easy form handling without needing a separate backend, making lead capture implementation simple.

---

## 🔌 External Dependencies

### Current Dependencies

**1. ElevenLabs Conversational AI Widget**
- **Source:** `https://unpkg.com/@elevenlabs/convai-widget-embed`
- **Purpose:** Conversational AI demo (⚠️ scheduled for removal)
- **Risk:** Third-party CDN dependency, widget may change
- **Impact if removed:** Hero section needs redesign

**2. Thum.io Screenshot Service**
- **Usage:** Product carousel thumbnails
- **URLs:** `https://image.thum.io/get/width/1200/[target-url]`
- **Risk:** External service dependency, quota limits possible
- **Cost:** May have rate limits or costs at scale
- **Alternative:** Self-hosted screenshots or direct product images

### Dependency Risks

**Critical Issues:**
- External services can fail or change APIs
- Performance depends on third-party uptime
- Privacy implications (data sent to external services)
- No version locking on ElevenLabs widget

**Mitigation:**
- **Short-term:** Remove ElevenLabs dependency
- **Long-term:** Replace thum.io with local images
- **Best practice:** Minimize external dependencies

---

## 📊 Analytics & Tracking (Proposed)

### Current State
❌ **No analytics implemented**

### Recommended Implementation

**Tier 1: Essential (Implement Immediately)**

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Tier 2: Enhanced Tracking**

```javascript
// Track key user actions
document.querySelectorAll('.cta-button').forEach(btn => {
  btn.addEventListener('click', () => {
    gtag('event', 'cta_click', {
      'location': btn.dataset.location,
      'cta_text': btn.innerText
    });
  });
});

// Track product carousel interactions
gtag('event', 'product_view', {
  'product_name': productName
});

// Track form submissions
gtag('event', 'lead_capture', {
  'form_type': 'contact'
});
```

**Tier 3: Advanced (Optional)**

- **Heatmaps:** Microsoft Clarity (free) or Hotjar
- **Session Recording:** Understand user behavior
- **A/B Testing:** Google Optimize or VWO
- **Conversion Funnels:** Enhanced GA4 setup

### Privacy Considerations

- Add Cookie Consent banner (GDPR compliance)
- Update Privacy Policy for analytics tracking
- Consider privacy-friendly alternatives (Plausible, Fathom)
- Anonymize IP addresses in GA4

---

## 📧 Lead Capture Architecture (Proposed)

### Option 1: Form Service (Recommended for Quick Start)

**Using Netlify Forms (if hosted on Netlify):**

```html
<form name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact" />
  <input type="text" name="name" placeholder="Name" required />
  <input type="email" name="email" placeholder="Email" required />
  <input type="tel" name="phone" placeholder="Phone" />
  <select name="interest">
    <option>Product Interest</option>
    <option>DataGPT</option>
    <option>SurveyFlow</option>
    <option>PsychoX</option>
    <option>Other</option>
  </select>
  <textarea name="message" placeholder="Tell us about your needs"></textarea>
  <button type="submit">Get Started</button>
</form>
```

**Benefits:**
- ✅ Zero backend code required
- ✅ Spam protection included
- ✅ Email notifications automatic
- ✅ CRM integration available (Zapier)

**Using Formspree (platform-agnostic):**

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <!-- Same fields as above -->
</form>
```

---

### Option 2: Serverless Function (For More Control)

**Architecture:**

```
User Form Submit
       │
       ▼
Serverless Function (Vercel/Netlify)
       │
       ├─→ Validate Data
       ├─→ Send to CRM (HubSpot/Salesforce API)
       ├─→ Send Email Notification
       ├─→ Store in Database (optional)
       │
       ▼
Return Success/Error to User
```

**Example (Vercel Function):**

```javascript
// api/contact.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { name, email, phone, interest, message } = req.body;
  
  // Validate
  if (!name || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // Send to CRM (example: HubSpot)
  await fetch('https://api.hubspot.com/contacts/v1/contact', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      properties: [
        { property: 'firstname', value: name },
        { property: 'email', value: email },
        { property: 'phone', value: phone },
        { property: 'interest', value: interest },
        { property: 'message', value: message }
      ]
    })
  });
  
  // Send notification email
  // ... email logic here ...
  
  return res.status(200).json({ success: true });
}
```

---

### Option 3: Third-Party Widget (Fastest)

**Options:**
- **HubSpot Form Embed:** Free, CRM integration automatic
- **Typeform Embed:** Beautiful UX, conversational forms
- **Calendly:** For demo scheduling specifically

**Trade-offs:**
- ✅ Quickest implementation
- ✅ Professional features out-of-the-box
- ⚠️ Less design control
- ⚠️ External dependency
- ⚠️ May look "generic"

---

## 🔒 Security Considerations

### Current Security Posture

**Strengths:**
- ✅ Static site = minimal attack surface
- ✅ No server-side code to exploit
- ✅ No database to breach
- ✅ HTTPS enforced via GitHub Pages
- ✅ No sensitive data stored

**Weaknesses:**
- ⚠️ No Content Security Policy (CSP)
- ⚠️ External script from unpkg (ElevenLabs)
- ⚠️ No Subresource Integrity (SRI) for external scripts
- ⚠️ No rate limiting on contact forms (when added)

### Recommended Security Headers

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self';
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

**Implementation:**
- Add `_headers` file (Netlify) or configure in hosting platform
- Or use `<meta>` tags for CSP (less secure but works)

### Form Security (When Implemented)

- **Spam Protection:**
  - Honeypot fields (hidden field that bots fill)
  - reCAPTCHA v3 (invisible)
  - Rate limiting (max submissions per IP)
  
- **Data Validation:**
  - Client-side validation (UX)
  - Server-side validation (security)
  - Input sanitization
  
- **Privacy:**
  - Don't log sensitive data
  - Encrypt data in transit (HTTPS)
  - GDPR-compliant data handling

---

## 📈 Performance Metrics

### Current Performance (Estimated)

| Metric | Score | Notes |
|--------|-------|-------|
| First Contentful Paint (FCP) | ~1.0s | Good (static content) |
| Largest Contentful Paint (LCP) | ~1.5s | Good |
| Time to Interactive (TTI) | ~2.0s | Affected by ElevenLabs widget |
| Cumulative Layout Shift (CLS) | ~0.05 | Good (minimal shift) |
| Total Blocking Time (TBT) | ~200ms | Good |
| Page Size | ~50KB HTML + images | Small |

**Opportunities for Improvement:**
1. **Minify CSS/JS** - Reduce by ~30%
2. **Compress images** - WebP format
3. **Lazy load images** - Faster initial paint
4. **Remove ElevenLabs widget** - Reduce blocking time
5. **Add caching headers** - Faster repeat visits
6. **Split CSS/JS** to external files - Enable browser caching

### Performance Monitoring

**Tools to Implement:**
- **Google PageSpeed Insights:** Monthly audits
- **Web Vitals:** Real user monitoring via GA4
- **Lighthouse CI:** Automated testing in deployment pipeline

---

## 🔄 Proposed Architecture Evolution

### Phase 1: Lead Capture (Immediate)

```
Current Static Site
        │
        ├─ Remove ElevenLabs widget
        ├─ Add contact form (Netlify Forms or Formspree)
        ├─ Implement Google Analytics 4
        └─ Add conversion tracking events
```

### Phase 2: Optimization (1-3 months)

```
Enhanced Site
        │
        ├─ A/B testing framework
        ├─ Heatmap tracking
        ├─ Product detail modals/pages
        ├─ Replace thum.io with local images
        └─ Optimize performance (minify, compress)
```

### Phase 3: Advanced Features (3-6 months)

```
Platform Evolution
        │
        ├─ Product-specific landing pages
        ├─ Case study section with CMS
        ├─ Blog/content marketing
        ├─ Advanced personalization
        └─ CRM integration (HubSpot, Salesforce)
```

### Phase 4: Platform (6-12 months)

```
Full Platform
        │
        ├─ Customer portal
        ├─ Product demos (interactive)
        ├─ Self-service pricing calculator
        ├─ Chat integration
        └─ Advanced marketing automation
```

---

## 🛠️ Technical Debt & Recommendations

### Immediate Actions

1. **Remove ElevenLabs widget** ⚠️⚠️⚠️
   - Impact: High (conversion)
   - Effort: Low
   - Priority: CRITICAL

2. **Implement analytics** ⚠️⚠️
   - Impact: High (measurement)
   - Effort: Low (1 hour)
   - Priority: CRITICAL

3. **Add lead capture form** ⚠️⚠️⚠️
   - Impact: Critical (revenue)
   - Effort: Low-Medium (2-4 hours)
   - Priority: CRITICAL

### Short-Term Improvements

4. **Minify and externalize CSS/JS**
   - Impact: Medium (performance, maintainability)
   - Effort: Low (2 hours)
   - Priority: HIGH

5. **Replace thum.io with local images**
   - Impact: Medium (reliability, privacy)
   - Effort: Medium (4 hours)
   - Priority: MEDIUM

6. **Add security headers**
   - Impact: Medium (security)
   - Effort: Low (1 hour)
   - Priority: MEDIUM

### Long-Term Enhancements

7. **Consider static site generator (Eleventy, Hugo)**
   - Impact: High (maintainability at scale)
   - Effort: High (refactor required)
   - Priority: LOW (only if site grows significantly)

8. **Implement CMS for content updates**
   - Impact: High (non-dev content updates)
   - Effort: High
   - Priority: LOW (current site is small)

---

## 📚 Technical Standards

### Code Style

**HTML:**
- Semantic HTML5 elements
- Accessibility attributes (ARIA where needed)
- Valid HTML (W3C validator)

**CSS:**
- BEM naming for classes (if needed)
- Mobile-first approach
- CSS custom properties for design tokens

**JavaScript:**
- ES6+ modern syntax
- Strict mode enabled
- JSDoc comments for functions
- No console.logs in production

### Browser Support

**Target:**
- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile Safari iOS (last 2 versions)
- Chrome Android (last 2 versions)

**Testing:**
- Manual testing on major browsers
- BrowserStack for comprehensive coverage
- Responsive testing on actual devices

---

*This architecture document should be updated whenever significant technical changes are made to the website infrastructure.*
