# INOSX Website - Maintenance Guide

**Document Version:** 1.0.0  
**Last Updated:** January 8, 2026

---

## 📋 Maintenance Overview

This guide provides practical instructions for maintaining and updating the INOSX website. It's designed for developers, marketing team members, and content editors who need to make routine updates.

---

## 🎯 Common Maintenance Tasks

### 1. Updating Text Content

#### Hero Section

**Location:** `index.html` lines ~890-900

**Current Text:**
```html
<div class="hero-text fade-in">
  There are no more websites...
</div>
<div class="hero-subtitle fade-in">
  ... there's only AI.
</div>
<div class="hero-subtitle fade-in">
  And we create these AIs
</div>
```

**To Update:**
1. Open `index.html` in text editor
2. Find the section between `<div class="left-column">` and `</div>`
3. Modify text within the div tags
4. Save and test locally
5. Deploy following [Deployment Guide](deployment.md)

**Best Practices:**
- Keep hero text concise (3-7 words per line)
- Maintain consistent tone and voice
- Test readability at different screen sizes
- Preserve CSS classes (fade-in, hero-text, etc.)

---

#### Services Section

**Location:** `index.html` lines ~990-1185

**Structure:**
```html
<div class="service-card fade-in">
  <h3 class="service-title">
    <span class="service-icon">🤖</span>
    INOSX AI Agents
  </h3>
  <p class="service-description">
    [Description paragraph]
  </p>
  <div class="service-features">
    <h4>Main capabilities:</h4>
    <ul>
      <li>[Feature 1]</li>
      <li>[Feature 2]</li>
      <!-- ... -->
    </ul>
  </div>
  <div class="service-benefits">
    <h4>Benefits:</h4>
    <ul>
      <li>[Benefit 1]</li>
      <li>[Benefit 2]</li>
      <!-- ... -->
    </ul>
  </div>
</div>
```

**To Update Service Description:**
1. Find the specific service card (search for service name)
2. Modify text within `<p class="service-description">`
3. Update features list items `<li>...</li>`
4. Update benefits list items
5. Maintain HTML structure

**Adding New Service:**
1. Copy entire `<div class="service-card">...</div>` block
2. Paste after last service card (before value proposition)
3. Update icon, title, description, features, benefits
4. Save and test layout (should auto-adjust in grid)

---

#### Footer

**Location:** `index.html` lines ~1479-1521

**Contact Information:**
```html
<div class="contact-box">
  <div><strong>Email</strong><br><a href="mailto:contact@inosx.com">contact@inosx.com</a></div>
  <div style="margin-top:8px">9450 SW Gemini Dr, Beaverton, OR 97008, USA</div>
</div>
```

**To Update:**
- Email: Change href and display text
- Address: Modify text in second div
- Social links: Update href in social section (~line 1489)

---

### 2. Adding/Updating Images

#### Product Carousel Images

**Location:** `index.html` lines ~939-963

**Current Structure:**
```html
<a class="carousel-item" href="https://datagpt.com.br" target="_blank" rel="noopener">
  <img class="carousel-image" src="datagpt.png" alt="DataGPT - AI para análise de dados empresariais" />
  <div class="carousel-caption"><span>DataGPT</span><span>Open site →</span></div>
</a>
```

**To Add New Product:**

1. **Prepare Image:**
   - Recommended size: 1200x600px (2:1 ratio)
   - Format: PNG or WebP
   - Optimize: < 500KB file size
   - Name descriptively: `productname-screenshot.png`

2. **Upload Image:**
   ```bash
   # Copy image to repository root
   cp ~/path/to/image.png ./productname-screenshot.png
   ```

3. **Add HTML:**
   ```html
   <a class="carousel-item" href="https://yourproduct.com" target="_blank" rel="noopener">
     <img class="carousel-image" src="productname-screenshot.png" alt="Product Name - Brief description" />
     <div class="carousel-caption"><span>Product Name</span><span>Open site →</span></div>
   </a>
   ```

4. **Update Indicator Count:**
   Find `<div class="carousel-indicators">` (~line 965)
   Add new button:
   ```html
   <button class="carousel-indicator" data-index="5"></button>
   ```

5. **Test:**
   - Carousel scrolling works
   - Image loads correctly
   - Link directs to correct URL
   - Responsive on mobile

**To Remove Product:**
1. Delete entire `<a class="carousel-item">...</a>` block
2. Remove corresponding indicator button
3. Update `data-index` values to be sequential (0, 1, 2, ...)

---

#### Logo/Brand Assets

**Main Logo:** `INOSXlogo.png` (root directory)

**Favicons:** 
- `favicon16x16.ico`
- `favicon32x32.ico`

**To Update:**
1. Create new icon files (maintain same names)
2. Replace existing files in root directory
3. Clear browser cache to see changes
4. Test across browsers

**Favicon Generator:** Use https://realfavicongenerator.net/

---

### 3. Updating Links

#### External Product Links

**Current Links:**
- https://surveyflow.ai
- https://datagpt.com.br
- https://messiax.ai
- https://psychox.ai
- https://hubiabrasil.com.br

**To Update:**
1. Search for URL in `index.html` (`Ctrl+F` or `Cmd+F`)
2. Replace all occurrences
3. Check both carousel href and any other references

**Best Practice:**
- Always include `target="_blank"` (opens in new tab)
- Always include `rel="noopener"` (security)
- Test link works before deploying

---

#### Footer Links

**Location:** Lines ~1493-1508

```html
<ul>
  <li><a href="index.html">Home</a></li>
  <li><a href="#">Products</a></li>
  <li><a href="#">Services</a></li>
</ul>
```

**Current Issues:**
- Products link (`#`) goes nowhere
- Services link (`#`) goes nowhere

**Recommended Fix:**
```html
<li><a href="#products">Products</a></li>
<li><a href="#services">Services</a></li>
```

Or create dedicated pages:
```html
<li><a href="products.html">Products</a></li>
<li><a href="services.html">Services</a></li>
```

---

### 4. Styling Changes

#### Color Scheme

**Location:** `index.html` ~lines 9-22 (CSS :root section)

**Current Colors:**
```css
:root {
  --bg-color: #0b1020;
  --text-color: #e6f0ff;
  --accent-color: #7dd3fc;
  --secondary-color: #a78bfa;
  --gradient-primary: linear-gradient(135deg, #7dd3fc 0%, #60a5fa 45%, #8b5cf6 100%);
}
```

**To Update Brand Colors:**
1. Find `:root { }` section in `<style>` tag
2. Update color hex codes
3. Save and preview entire site
4. Ensure contrast ratios meet accessibility standards (WCAG AA minimum)

**Tools:**
- Color contrast checker: https://webaim.org/resources/contrastchecker/
- Palette generator: https://coolors.co/

---

#### Typography

**Current Font:** 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif

**To Change Font:**

1. **Add Google Font (Recommended):**
   ```html
   <!-- Add to <head> section -->
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
   ```

2. **Update CSS:**
   ```css
   body {
     font-family: 'Inter', 'Segoe UI', sans-serif;
   }
   ```

3. **Test:**
   - Readability at all sizes
   - Loading performance
   - Fallback fonts work

---

### 5. Animation & Effects

#### Particle Background

**Location:** JavaScript section, ~lines 1197-1220

**To Adjust Particle Count:**
```javascript
const particleCount = 50;  // Change this number
// Lower = better performance, less visual density
// Higher = worse performance, more visual density
```

**To Disable Particles:**
```javascript
// Comment out or remove the function call:
// createParticles();
```

**Performance Note:** Particles use requestAnimationFrame and canvas. On older devices, reducing particle count improves performance.

---

#### Carousel Auto-Scroll

**Location:** JavaScript section, ~lines 1266-1278

**Current Speed:** 8 seconds per slide

**To Adjust:**
```javascript
autoTimer = setInterval(() => {
  // ...
}, 8000);  // Change this number (milliseconds)
// 5000 = 5 seconds
// 10000 = 10 seconds
```

**To Disable Auto-Scroll:**
```javascript
// Comment out startAuto() call:
// startAuto();
```

---

### 6. Adding Analytics Events

#### Track New Button Click

**Location:** JavaScript section (add to existing script)

```javascript
// Add event listener to your new button
document.getElementById('your-button-id').addEventListener('click', function() {
  gtag('event', 'button_click', {
    'event_category': 'engagement',
    'event_label': 'button_name',
    'value': 1
  });
});
```

#### Track Specific Section View

```javascript
// Track when user scrolls to section
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      gtag('event', 'section_view', {
        'section_name': entry.target.id
      });
    }
  });
});

observer.observe(document.getElementById('section-id'));
```

---

## 🛠️ Advanced Maintenance

### Adding Contact Form

**Full implementation guide in:** [Conversion Strategy](conversion-strategy.md) Section 1.3

**Quick Steps:**
1. Choose form backend (Netlify Forms, Formspree, custom API)
2. Add HTML form to page
3. Style form to match site design
4. Add validation (client & server-side)
5. Connect to CRM/email notification
6. Test thoroughly
7. Monitor submissions

---

### Implementing Google Analytics

**Full guide in:** [Conversion Strategy](conversion-strategy.md) Section 1.4

**Quick Steps:**
1. Create GA4 property at analytics.google.com
2. Get tracking ID (G-XXXXXXXXXX)
3. Add gtag.js script to `<head>` section
4. Configure basic settings
5. Add custom event tracking
6. Verify with Real-Time reports
7. Set up conversion goals

---

### Adding New Page

**Example: Creating /products.html**

1. **Create File:**
   ```bash
   cp index.html products.html
   ```

2. **Modify Content:**
   - Update `<title>` tag
   - Remove/modify hero section
   - Add product-specific content
   - Update footer links

3. **Link to New Page:**
   ```html
   <a href="products.html">Products</a>
   ```

4. **Update Navigation:**
   - Add link in footer
   - Add link in header (if header exists)

5. **Deploy:**
   Follow standard deployment process

---

### Performance Optimization

#### Minify CSS/JS

**Tool:** https://www.minifier.org/

**Process:**
1. Copy inline CSS from `<style>` tag
2. Paste into minifier
3. Copy minified output
4. Replace original CSS
5. Test site works correctly

**Or externalize:**
```html
<link rel="stylesheet" href="style.css">
<!-- Instead of inline <style> -->
```

#### Optimize Images

**Tools:**
- TinyPNG: https://tinypng.com/
- Squoosh: https://squoosh.app/
- ImageOptim (Mac): https://imageoptim.com/

**Process:**
1. Upload image to tool
2. Download optimized version
3. Compare quality (should be imperceptible)
4. Replace original file
5. Commit and deploy

**Target:**
- Product images: < 300KB each
- Icons/logos: < 50KB each
- Total page weight: < 2MB

---

### Browser Compatibility Testing

**Must-Test Browsers:**
1. Chrome (latest)
2. Firefox (latest)
3. Safari (latest)
4. Edge (latest)
5. Mobile Safari (iOS)
6. Chrome Mobile (Android)

**Testing Tools:**
- **BrowserStack:** Paid, comprehensive
- **LambdaTest:** Freemium option
- **CrossBrowserTesting:** Paid
- **Manual:** Test on actual devices

**Common Issues:**
- CSS Grid/Flexbox: Check older browsers
- ES6 JavaScript: May need transpiling for IE11 (if required)
- CSS Custom Properties: No IE11 support

**Fix Strategy:**
1. Identify issue in specific browser
2. Check "Can I Use" (caniuse.com) for feature support
3. Add fallback or polyfill
4. Test fix in affected browser

---

## 📅 Routine Maintenance Schedule

### Daily
- [ ] Monitor website uptime (if monitoring tool set up)
- [ ] Check contact form submissions
- [ ] Respond to chat inquiries (if live chat implemented)
- [ ] Review analytics for anomalies

### Weekly
- [ ] Check broken links (tool: https://www.brokenlinkcheck.com/)
- [ ] Review page load speed (PageSpeed Insights)
- [ ] Check mobile responsiveness
- [ ] Update content if needed

### Monthly
- [ ] Comprehensive analytics review
- [ ] Update product information if changed
- [ ] Review and update testimonials/social proof
- [ ] Security updates (if CMS/framework used)
- [ ] Content freshness check
- [ ] Backup website files

### Quarterly
- [ ] Full SEO audit
- [ ] Competitor analysis (check their sites)
- [ ] User experience testing (5-10 users)
- [ ] Performance optimization
- [ ] Content strategy review
- [ ] Update documentation

### Annually
- [ ] Complete website redesign evaluation
- [ ] Technology stack review
- [ ] Hosting/infrastructure evaluation
- [ ] Legal pages update (terms, privacy)
- [ ] Brand refresh assessment

---

## 🚨 Emergency Procedures

### Site Down

**Symptoms:** inosx.com not loading, 404 errors, "Site not found"

**Troubleshooting:**

1. **Check if it's just you:**
   - Use https://downforeveryoneorjustme.com/inosx.com
   - Try different browser/device
   - Try from mobile data (different network)

2. **Check GitHub Pages Status:**
   - Visit https://www.githubstatus.com/
   - Look for Pages outages

3. **Check DNS:**
   ```bash
   nslookup inosx.com
   # Should return GitHub Pages IPs
   ```

4. **Check Repository:**
   - Ensure CNAME file exists and is correct
   - Verify GitHub Pages settings (Settings → Pages)

5. **Contact Hosting:**
   - If GitHub Pages issue, wait for resolution
   - Check GitHub support

**Recovery Time:**
- DNS issue: Up to 48 hours to propagate
- GitHub Pages issue: Usually < 1 hour (on their end)
- CNAME file issue: Fix and redeploy (~5 minutes)

---

### Major Bug After Deployment

**Symptoms:** Site works but major feature broken

**Immediate Action:**

1. **Rollback:**
   ```bash
   git log --oneline  # Find last good commit
   git revert <bad-commit-hash>
   git push origin main
   ```

2. **Or Hard Reset (if just deployed):**
   ```bash
   git reset --hard HEAD~1
   git push --force origin main
   ```

3. **Notify Team:**
   - Alert team of rollback
   - Explain issue
   - Plan fix

4. **Fix Offline:**
   - Create feature branch
   - Fix issue
   - Test thoroughly
   - Deploy when confident

---

### Analytics Stopped Working

**Symptoms:** No data in Google Analytics

**Troubleshooting:**

1. **Check Tracking Code:**
   - View page source
   - Verify gtag.js script present
   - Verify tracking ID correct

2. **Check Browser Console:**
   - F12 → Console tab
   - Look for gtag errors
   - Verify `dataLayer` exists: Type `dataLayer` in console

3. **Test with GA Debugger:**
   - Install "Google Analytics Debugger" Chrome extension
   - Enable and reload page
   - Check console for debug output

4. **Verify in GA Real-Time:**
   - Visit your site
   - Open GA4 → Real-Time reports
   - Should see your visit within 30 seconds

**Common Fixes:**
- Tracking ID typo: Correct and redeploy
- Script blocked: Check ad blocker, privacy settings
- Script not loaded: Check network tab, verify CDN accessible

---

### Form Not Submitting

**Symptoms:** Form submit button does nothing or shows error

**Troubleshooting:**

1. **Check Browser Console:**
   - F12 → Console
   - Look for JavaScript errors

2. **Check Network Tab:**
   - F12 → Network
   - Submit form
   - Look for failed request (red)
   - Check response for error message

3. **Test Form Backend:**
   - If using Netlify: Check Netlify dashboard → Forms
   - If using Formspree: Check Formspree dashboard
   - If custom API: Check server logs

4. **Verify Form Attributes:**
   ```html
   <form method="POST" action="/your-endpoint">
     <!-- Must have name attributes on inputs -->
     <input type="text" name="name" required />
   </form>
   ```

**Common Fixes:**
- Missing `name` attributes on inputs
- Incorrect `action` URL
- CORS issues (if custom backend)
- Spam protection blocking submission

---

## 📚 Resources & Tools

### Development Tools
- **VS Code:** https://code.visualstudio.com/
- **Sublime Text:** https://www.sublimetext.com/
- **Git:** https://git-scm.com/

### Testing Tools
- **PageSpeed Insights:** https://pagespeed.web.dev/
- **GTmetrix:** https://gtmetrix.com/
- **W3C HTML Validator:** https://validator.w3.org/
- **W3C CSS Validator:** https://jigsaw.w3.org/css-validator/
- **Broken Link Checker:** https://www.brokenlinkcheck.com/
- **Mobile-Friendly Test:** https://search.google.com/test/mobile-friendly

### Image Optimization
- **TinyPNG:** https://tinypng.com/
- **Squoosh:** https://squoosh.app/
- **ImageOptim:** https://imageoptim.com/
- **Compressor.io:** https://compressor.io/

### Analytics & SEO
- **Google Analytics:** https://analytics.google.com/
- **Google Search Console:** https://search.google.com/search-console
- **Google Tag Manager:** https://tagmanager.google.com/
- **Ahrefs (paid):** https://ahrefs.com/
- **SEMrush (paid):** https://www.semrush.com/

### Design Resources
- **Coolors (color palettes):** https://coolors.co/
- **Google Fonts:** https://fonts.google.com/
- **Font Awesome (icons):** https://fontawesome.com/
- **Unsplash (stock photos):** https://unsplash.com/

---

## ✅ Quality Checklist

Before every deployment, verify:

### Functionality
- [ ] All links work (no 404s)
- [ ] Forms submit successfully
- [ ] Images load correctly
- [ ] Videos/animations play
- [ ] No JavaScript console errors

### Content
- [ ] No typos or grammatical errors
- [ ] All text is accurate and current
- [ ] Contact information is correct
- [ ] Legal pages are up-to-date

### Performance
- [ ] Page loads in < 3 seconds
- [ ] Images are optimized
- [ ] No unnecessarily large files

### SEO
- [ ] Title tag is descriptive
- [ ] Meta description present
- [ ] Headings (H1, H2) properly structured
- [ ] Alt text on all images

### Accessibility
- [ ] Color contrast meets WCAG AA
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Forms have proper labels

### Cross-Browser
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari
- [ ] Tested in Edge
- [ ] Tested on mobile (iOS/Android)

### Analytics
- [ ] Tracking code present
- [ ] Events fire correctly
- [ ] Conversion goals set up

---

## 💡 Best Practices

### Content Updates
1. **Preview Locally First:** Always test changes locally before deploying
2. **One Change at a Time:** Easier to debug if something breaks
3. **Descriptive Commit Messages:** Future you will thank you
4. **Document Major Changes:** Update this documentation when making structural changes

### Code Quality
1. **Maintain Indentation:** Consistent formatting improves readability
2. **Comment Complex Code:** Explain "why" not just "what"
3. **Keep HTML Semantic:** Use proper tags (`<header>`, `<section>`, `<article>`)
4. **Minimize Inline Styles:** Use classes instead

### Performance
1. **Optimize Images:** Always compress before uploading
2. **Lazy Load:** Consider lazy loading for below-fold images
3. **Minimize HTTP Requests:** Combine files where possible
4. **Cache Assets:** Set proper cache headers

### Security
1. **Keep Dependencies Updated:** Regular security updates
2. **Use HTTPS:** Always (GitHub Pages does this automatically)
3. **Validate Input:** All form inputs must be validated server-side
4. **Escape Output:** Prevent XSS attacks

---

*This maintenance guide should be updated whenever new features are added or processes change.*
