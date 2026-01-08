# Google Analytics Setup - INOSX Website

**Status:** Ready to configure  
**Priority:** HIGH ⚠️  
**Estimated Time:** 15 minutes

---

## 🎯 Overview

Google Analytics 4 (GA4) has been added to the INOSX website code but requires configuration with your actual tracking ID.

---

## 📋 Setup Steps

### Step 1: Create Google Analytics Property

1. **Go to Google Analytics:**
   - Visit https://analytics.google.com/
   - Sign in with your Google account

2. **Create GA4 Property:**
   - Click "Admin" (gear icon, bottom left)
   - Click "+ Create Property"
   - Enter property name: "INOSX Website"
   - Select timezone and currency
   - Click "Next"

3. **Provide Business Information:**
   - Industry: Technology/Software
   - Business size: Select appropriate
   - How you intend to use Analytics: Select all that apply
   - Click "Create"

4. **Accept Terms of Service**

5. **Set Up Data Stream:**
   - Choose platform: "Web"
   - Enter website URL: https://inosx.com
   - Stream name: "INOSX Main Site"
   - Click "Create stream"

6. **Get Your Tracking ID:**
   - You'll see "Measurement ID" at top right
   - Format: `G-XXXXXXXXXX`
   - **Copy this ID** - you'll need it next

---

### Step 2: Update Website Code

1. **Open `index.html`**

2. **Find Analytics Section** (lines ~9-18):

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', {
    'anonymize_ip': true
  });
</script>
```

3. **Replace BOTH instances of `G-XXXXXXXXXX`** with your actual Measurement ID

4. **Save the file**

---

### Step 3: Deploy & Verify

1. **Deploy Changes:**
   ```bash
   git add index.html
   git commit -m "Configure Google Analytics with tracking ID"
   git push origin main
   ```

2. **Wait 2-3 minutes** for GitHub Pages deployment

3. **Verify Tracking:**
   - Visit https://inosx.com
   - Open Google Analytics
   - Go to **Reports → Real-time**
   - You should see your visit within 30 seconds

4. **Test Events:**
   - Click "Get Free Consultation" button
   - Fill out part of the form
   - Scroll down the page
   - Click on a product
   - Check Real-time → Events to see tracking

---

## 📊 Events Being Tracked

### Automatic Events (GA4 Default)
- `page_view` - Page loads
- `first_visit` - New visitor
- `session_start` - Session begins
- `scroll` - User scrolls (90% depth)

### Custom Events (Implemented)

**Engagement:**
- `open_contact_form` - User opens lead capture modal
- `form_step_2` - User completes step 1 of form
- `generate_lead` - Form submission (CONVERSION)
- `scroll_to_products` - User clicks "Explore Products"
- `scroll_depth` - 25%, 50%, 75%, 100% scroll milestones

**Products:**
- `product_click` - User clicks on product in carousel
- `carousel_next` / `carousel_prev` - Carousel navigation

**Services:**
- `service_view` - Service card comes into viewport

---

## 🎯 Setting Up Conversion Goals

### Create Lead Generation Goal

1. **In GA4, go to:** Admin → Events → Create event

2. **Or use existing events** and mark as conversions:
   - Go to: Admin → Events
   - Find `generate_lead` event
   - Toggle "Mark as conversion"

3. **Set Value (Optional):**
   - Go to event details
   - Add conversion value (e.g., $100 per lead)

---

## 📈 Recommended Dashboard Setup

### Create Custom Reports

1. **Conversion Funnel:**
   - Page views → Form opens → Step 2 reached → Leads generated
   - Calculate conversion rate

2. **Engagement Report:**
   - Time on page
   - Scroll depth
   - Product clicks
   - Service views

3. **Traffic Sources:**
   - Which channels drive most leads
   - UTM campaign performance

---

## 🔒 Privacy & Compliance

### Current Configuration

✅ **IP Anonymization:** Enabled (`anonymize_ip: true`)  
✅ **GDPR Compliant:** With proper cookie notice (see next steps)  
✅ **No PII Collected:** Forms don't send data to GA

### Recommended Additions

1. **Cookie Consent Banner:**
   - Required for EU visitors (GDPR)
   - Use: Cookiebot, OneTrust, or Cookie Notice plugin

2. **Update Privacy Policy:**
   - Mention Google Analytics usage
   - Link to GA privacy policy
   - Explain what data is collected
   - Provide opt-out instructions

3. **Data Retention Settings:**
   - GA4 Admin → Data Settings → Data Retention
   - Recommended: 14 months
   - Enable "Reset user data on new activity"

---

## 🔧 Advanced Configuration (Optional)

### Google Tag Manager

**Consider using GTM if:**
- You want to add more tracking tools
- Need to manage multiple tags
- Want marketing team to add tags without code changes

**Setup:**
1. Create GTM account
2. Add GTM container to site
3. Move GA4 tag to GTM
4. Manage all tags from GTM dashboard

### Enhanced Measurement

Enable additional automatic events in GA4:
- Admin → Data Streams → Your stream
- Toggle "Enhanced measurement"
- Configure: Scrolls, Outbound clicks, Site search, Video engagement, File downloads

### User Properties

Track custom user attributes:
```javascript
gtag('set', 'user_properties', {
  'company_size': companySize,
  'industry': industry
});
```

---

## 📊 Key Metrics to Monitor

### Daily
- [ ] Active users
- [ ] Form submissions (leads)
- [ ] Conversion rate

### Weekly
- [ ] Traffic sources performance
- [ ] Top performing products
- [ ] Average engagement time
- [ ] Bounce rate by page

### Monthly
- [ ] Month-over-month growth
- [ ] Lead quality (sales feedback)
- [ ] Campaign ROI
- [ ] Device/browser trends

---

## 🚨 Troubleshooting

### "No data appearing in Real-time"

**Check:**
1. Tracking ID is correct (no typos)
2. Both instances replaced in code
3. Code is deployed (check view-source on live site)
4. Ad blocker is disabled (for testing)
5. Browser console has no errors (F12)

**Test:**
```javascript
// In browser console on live site:
console.log(dataLayer);
// Should show array with events
```

### "Events not firing"

**Debug:**
1. Open browser console (F12)
2. Type: `gtag('event', 'test_event')`
3. Check Real-time → Events for `test_event`
4. If works, issue is with specific event code

**Enable Debug Mode:**
```javascript
gtag('config', 'G-XXXXXXXXXX', {
  'debug_mode': true
});
```

### "Seeing my own visits"

**Exclude Internal Traffic:**
1. GA4 Admin → Data Filters
2. Create filter for your IP address
3. Or use GA Opt-out Browser Extension

---

## 📞 Support Resources

- **GA4 Help Center:** https://support.google.com/analytics
- **GA4 Community:** https://support.google.com/analytics/community
- **Measurement Protocol:** https://developers.google.com/analytics/devguides/collection/protocol/ga4

---

## ✅ Post-Setup Checklist

After configuring GA4:

- [ ] Tracking ID updated in code
- [ ] Code deployed to production
- [ ] Verified in Real-time reports
- [ ] Test all custom events
- [ ] Set up conversion goals
- [ ] Create initial reports
- [ ] Add cookie consent banner
- [ ] Update privacy policy
- [ ] Train team on GA4 interface
- [ ] Schedule weekly metric reviews

---

*Keep this document updated as analytics implementation evolves.*
