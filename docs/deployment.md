# INOSX Website - Deployment Guide

**Document Version:** 1.0.0  
**Last Updated:** January 8, 2026

---

## 🚀 Deployment Overview

The INOSX website uses a **git-based deployment workflow** where changes pushed to the repository are automatically deployed to production. This document covers the current deployment process and best practices.

---

## 📋 Current Deployment Setup

### Hosting Platform
**GitHub Pages**

### Repository Configuration
- **Repository:** (Current workspace)
- **Branch:** `main` (or configured deployment branch)
- **Build:** Static files served directly (no build process)
- **Domain:** inosx.com (configured via CNAME file)

### Deployment Trigger
- **Automatic:** Push to `main` branch
- **Manual:** Not available (automatic only)
- **Rollback:** Revert git commit

---

## 🔄 Deployment Workflow

### Standard Deployment Process

```
┌─────────────────────────────────────────┐
│  1. Developer Makes Changes Locally     │
│     - Edit HTML/CSS/JS files            │
│     - Test locally (open index.html)    │
│     - Review changes                    │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  2. Commit Changes to Git               │
│     $ git add .                         │
│     $ git commit -m "Description"       │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  3. Push to Repository                  │
│     $ git push origin main              │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  4. GitHub Pages Auto-Deploys           │
│     - Detects push event                │
│     - Copies files to CDN               │
│     - Updates live site                 │
│     - Time: ~1-3 minutes                │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  5. Verify Deployment                   │
│     - Visit inosx.com                   │
│     - Check changes are live            │
│     - Test functionality                │
└─────────────────────────────────────────┘
```

---

## 🛠️ Step-by-Step Deployment

### Prerequisites

**Required Software:**
- Git (version 2.x or higher)
- Text editor (VS Code, Sublime, etc.)
- Web browser for testing

**Required Access:**
- Repository write permissions
- GitHub account with proper access

### Local Development

**1. Clone Repository (First Time):**
```bash
git clone <repository-url>
cd site
```

**2. Create Feature Branch (Recommended):**
```bash
git checkout -b feature/your-feature-name
```

**3. Make Changes:**
- Edit `index.html`, `terms.html`, or other files
- Add new images to root directory if needed
- Update documentation in `/docs` if relevant

**4. Test Locally:**
```bash
# Option 1: Open file directly
open index.html
# (Windows: start index.html, Linux: xdg-open index.html)

# Option 2: Use local server (recommended)
# Python 3:
python -m http.server 8000

# Node.js (if you have http-server installed):
npx http-server -p 8000

# Then visit: http://localhost:8000
```

**5. Review Changes:**
- Check all sections of the site
- Test on different screen sizes (browser dev tools)
- Verify links work
- Check console for JavaScript errors (F12 → Console)

### Committing Changes

**1. Check Status:**
```bash
git status
# See what files changed
```

**2. Stage Changes:**
```bash
# Stage all changes:
git add .

# Or stage specific files:
git add index.html
git add docs/new-file.md
```

**3. Commit with Clear Message:**
```bash
git commit -m "Brief description of changes"
```

**Commit Message Best Practices:**
- Use present tense: "Add contact form" not "Added contact form"
- Be specific: "Fix mobile menu alignment" not "Fix bug"
- Keep first line under 50 characters
- Add details in body if needed:
  ```bash
  git commit -m "Add lead capture form to hero section
  
  - Implemented contact form with name, email, phone fields
  - Integrated with Netlify Forms for backend
  - Added validation and error messaging"
  ```

### Deploying to Production

**Option 1: Direct to Main (Small Changes):**
```bash
# Ensure you're on main branch
git checkout main

# Pull latest changes first
git pull origin main

# Make your changes, commit, then push
git push origin main
```

**Option 2: Feature Branch → Pull Request (Recommended for Significant Changes):**

```bash
# Push your feature branch
git push origin feature/your-feature-name

# Then on GitHub:
# 1. Create Pull Request from your branch to main
# 2. Request review (if team workflow requires)
# 3. Merge PR when approved
# 4. GitHub Pages deploys automatically after merge
```

### Monitoring Deployment

**1. Check GitHub Actions (if enabled):**
- Go to repository on GitHub
- Click "Actions" tab
- See deployment status

**2. Verify Live Site:**
```bash
# Visit site in browser
open https://inosx.com

# Or use curl to check:
curl -I https://inosx.com
# Look for HTTP 200 status

# Check with cache-busting:
curl -I "https://inosx.com?v=$(date +%s)"
```

**3. Common Deployment Times:**
- GitHub Pages: 1-3 minutes typical
- CDN propagation: 5-15 minutes for full global distribution
- DNS changes (if made): Up to 48 hours (rare)

---

## 🐛 Troubleshooting Deployments

### Site Not Updating

**Problem:** Pushed changes but site still shows old version

**Solutions:**

1. **Hard Refresh Browser:**
   - Windows/Linux: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

2. **Check GitHub Pages Status:**
   - Go to repository Settings → Pages
   - Check if "Your site is live at..." shows correctly
   - Look for any error messages

3. **Clear Browser Cache:**
   - Or use Incognito/Private mode to test

4. **Verify Correct Branch:**
   ```bash
   # Check which branch GitHub Pages is using
   # Settings → Pages → Source branch should match your push
   ```

5. **Wait Longer:**
   - Sometimes takes up to 10 minutes for complex updates

### Deployment Failed

**Problem:** GitHub Actions shows failure or error

**Solutions:**

1. **Check Error Message:**
   - Read the error in GitHub Actions
   - Common issues:
     - Invalid HTML
     - Large files (>100MB)
     - Repository size exceeded

2. **Validate HTML:**
   ```bash
   # Use W3C validator
   # https://validator.w3.org/
   ```

3. **Check File Sizes:**
   ```bash
   # Find large files
   find . -type f -size +10M
   
   # GitHub Pages has limits:
   # - Individual files: 100MB max
   # - Repository: 1GB soft limit
   ```

### 404 Errors

**Problem:** Site shows 404 or broken links

**Solutions:**

1. **Check File Paths:**
   - Paths are case-sensitive on servers
   - Use lowercase consistently
   - Relative paths: `./image.png` not `/image.png`

2. **Verify CNAME File:**
   ```bash
   # CNAME should contain just: inosx.com
   cat CNAME
   ```

3. **Check DNS Settings:**
   ```bash
   # Verify DNS points to GitHub:
   nslookup inosx.com
   
   # Should show GitHub Pages IPs or CNAME
   ```

### Rollback Required

**Problem:** Need to undo a deployment

**Solution: Revert Commit:**

```bash
# Find the commit to revert to
git log --oneline

# Option 1: Revert specific commit (creates new commit)
git revert <commit-hash>
git push origin main

# Option 2: Hard reset (use with caution!)
git reset --hard <commit-hash>
git push --force origin main
```

⚠️ **Warning:** Force push can cause issues if others are working on the repository. Communicate with team first!

---

## ✅ Pre-Deployment Checklist

Before pushing to production, verify:

### Content & Functionality
- [ ] All text is accurate and free of typos
- [ ] Links work (internal and external)
- [ ] Images load correctly
- [ ] Forms submit properly (if applicable)
- [ ] No console errors in browser dev tools
- [ ] No broken CSS (visual inspection)

### Responsiveness
- [ ] Test on desktop (1920x1080, 1366x768)
- [ ] Test on tablet (768px width)
- [ ] Test on mobile (375px width, 414px width)
- [ ] Test landscape and portrait orientations

### Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Performance
- [ ] Page loads in < 3 seconds
- [ ] Images are compressed
- [ ] No unnecessary large files
- [ ] Animations are smooth

### SEO & Metadata
- [ ] `<title>` tag is accurate
- [ ] Meta description is present
- [ ] Open Graph tags for social sharing (if applicable)
- [ ] Favicon is present and correct

### Analytics & Tracking
- [ ] Google Analytics code is present (if implemented)
- [ ] Event tracking works (if implemented)
- [ ] No console warnings about analytics

### Legal & Compliance
- [ ] Privacy policy is up-to-date
- [ ] Terms of service are current
- [ ] Cookie notice is present (if using cookies)

---

## 🔧 Advanced Deployment Scenarios

### Deploying with New Images

**Best Practices:**

1. **Optimize Images Before Uploading:**
   ```bash
   # Use tools like:
   # - ImageOptim (Mac)
   # - TinyPNG (online)
   # - Squoosh (online, Google)
   
   # Or command line:
   # For JPEG:
   jpegoptim --max=85 image.jpg
   
   # For PNG:
   optipng -o5 image.png
   
   # Convert to WebP (smaller):
   cwebp -q 80 image.jpg -o image.webp
   ```

2. **Use Descriptive File Names:**
   - Good: `datagpt-dashboard-screenshot.png`
   - Bad: `Screen Shot 2026-01-08.png`

3. **Update HTML References:**
   ```html
   <!-- Add alt text for accessibility -->
   <img src="product-screenshot.png" alt="DataGPT analytics dashboard showing real-time metrics">
   ```

### Deploying Analytics Changes

**When Adding Google Analytics:**

1. **Get Tracking ID from Google Analytics**

2. **Add to `<head>` section of `index.html`:**
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

3. **Test Before Deploying:**
   - Use Google Tag Assistant Chrome extension
   - Or check in browser console: `dataLayer` should exist

4. **Verify After Deployment:**
   - Visit site
   - Open Google Analytics Real-Time reports
   - Should see your visit

### Deploying Form Changes

**When Adding Contact Form:**

1. **Test Locally First:**
   - Forms won't submit locally (no backend)
   - But verify HTML structure and validation

2. **Deploy to Staging First (if available):**
   ```bash
   # Could create a staging branch
   git checkout -b staging
   # Push to staging environment for testing
   ```

3. **Test Form in Production:**
   - Submit test lead
   - Verify email received
   - Check CRM integration (if applicable)

4. **Monitor for Issues:**
   - Check spam folder for notifications
   - Test again in 24 hours to ensure reliability

---

## 🌍 CDN & Caching

### Understanding Caching

**GitHub Pages Caching:**
- HTML: Usually no cache or short cache (5 min)
- CSS/JS: Can be cached longer if external files
- Images: Can be cached for days/weeks

**Browser Caching:**
- Users may see old version until cache expires or manual refresh

### Cache-Busting Strategies

**Option 1: Version Query Parameters:**
```html
<!-- Add ?v=version-number to force reload -->
<link rel="stylesheet" href="style.css?v=1.0.1">
<script src="script.js?v=1.0.1"></script>
<img src="logo.png?v=1.0.1" alt="Logo">
```

**Option 2: Rename Files:**
```html
<!-- Rename file when content changes -->
<link rel="stylesheet" href="style-v2.css">
```

**Option 3: Force Reload Meta Tag (Use Sparingly):**
```html
<meta http-equiv="cache-control" content="no-cache, no-store, must-revalidate">
```

---

## 🔐 Deployment Security

### Secrets Management

**Never Commit:**
- API keys
- Passwords
- Access tokens
- Database credentials

**If Accidentally Committed:**
```bash
# Remove from history (use carefully!)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch path/to/secret-file" \
  --prune-empty --tag-name-filter cat -- --all

# Then force push
git push --force --all
```

**Best Practice:** Use environment variables or GitHub Secrets for any sensitive data needed in deployment scripts.

### HTTPS Enforcement

**GitHub Pages automatically enforces HTTPS:**
- Check: Repository Settings → Pages → "Enforce HTTPS" should be checked

**Verify:**
```bash
curl -I http://inosx.com
# Should see redirect to https://
```

---

## 📊 Post-Deployment Monitoring

### Immediate Checks (Within 5 Minutes)

1. **Visual Inspection:**
   - Visit https://inosx.com
   - Scroll through entire page
   - Click all major links

2. **Console Check:**
   - Open browser dev tools (F12)
   - Check Console tab for errors
   - Check Network tab for failed requests

3. **Mobile Check:**
   - Test on actual mobile device
   - Or use browser dev tools mobile emulation

### Ongoing Monitoring (Daily/Weekly)

1. **Analytics:**
   - Check visitor counts
   - Monitor bounce rate
   - Track conversion events

2. **Uptime Monitoring:**
   - Use service like UptimeRobot (free)
   - Alerts if site goes down

3. **Performance:**
   - Run PageSpeed Insights weekly
   - Monitor Core Web Vitals

---

## 📋 Deployment Log Template

**Keep a deployment log for significant changes:**

```
## Deployment Log

### 2026-01-15 - v1.1.0
**Changes:**
- Added contact form to hero section
- Removed ElevenLabs widget
- Implemented Google Analytics

**Deployed by:** [Name]
**Commit:** abc123def456
**Deployment time:** 14:30 UTC
**Issues:** None
**Rollback plan:** Revert to commit xyz789

### 2026-01-08 - v1.0.1
**Changes:**
- Updated services section copy
- Fixed mobile menu alignment

**Deployed by:** [Name]
**Commit:** def456abc789
**Deployment time:** 09:15 UTC
**Issues:** Minor CSS glitch on Safari, fixed in follow-up
```

---

## 🚀 Future Deployment Enhancements

### Recommended Improvements

1. **Staging Environment:**
   - Create separate staging site for testing
   - Test all changes before production

2. **Automated Testing:**
   - Add HTML validation checks
   - Lighthouse CI for performance testing
   - Link checker automation

3. **Deployment Preview:**
   - Use Netlify/Vercel for preview URLs on PRs
   - Review changes before merge

4. **Automated Rollback:**
   - Script to quickly revert to last known good deployment

5. **Change Notifications:**
   - Slack/Discord notification on deployment
   - Team stays informed automatically

---

*This deployment guide should be updated whenever the deployment process or hosting platform changes.*
