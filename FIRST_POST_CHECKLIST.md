# ✅ First Blog Post Checklist

Use this checklist when publishing your first blog post with the new system.

---

## 📝 Pre-Publishing (WordPress Staging)

- [ ] Blog post written and reviewed
- [ ] Featured image added (recommended: 1200x630px)
- [ ] Category assigned (e.g., "AOV", "Content", "SEO")
- [ ] SEO title and meta description filled (Rank Math)
- [ ] Internal links added where relevant
- [ ] Images optimized and have alt text
- [ ] Post status set to **Published** (not draft)
- [ ] Post slug is clean and SEO-friendly
- [ ] Preview looks good on mobile and desktop

**Post Slug:** `_______________________`

---

## 🔧 Environment Setup (One-Time)

- [ ] `.env.local` file exists in project root
- [ ] `WORDPRESS_API_URL` is set
- [ ] `WORDPRESS_BASE_URL` is set
- [ ] `ANTHROPIC_API_KEY` is set
- [ ] API key has credits available
- [ ] WordPress staging site is accessible

---

## 🚀 Schema Generation

- [ ] Run command: `npm run publish:post <your-slug>`
- [ ] Script successfully fetched the post
- [ ] Schema generated without errors
- [ ] Schema types look correct (Article, FAQPage, etc.)
- [ ] Cache file created in `.schema-cache/`
- [ ] Note the cache file name: `_______________________`

**Schema Types Generated:**
- [ ] Article
- [ ] FAQPage (if applicable)
- [ ] HowTo (if applicable)
- [ ] BreadcrumbList
- [ ] Organization
- [ ] ImageObject

---

## 🧪 Local Testing (Recommended)

- [ ] Run: `npm run dev`
- [ ] Visit: `http://localhost:3000/<category>/<slug>`
- [ ] Post content displays correctly
- [ ] Featured image loads
- [ ] Navigation works
- [ ] View page source
- [ ] Confirm `<script type="application/ld+json">` is present
- [ ] Schema JSON looks valid

---

## 📦 Git Commit

- [ ] Run: `git status` (verify cache file is listed)
- [ ] Run: `git add .schema-cache/<hash>.json`
- [ ] Run: `git commit -m "Add schema for: <Post Title>"`
- [ ] Commit message is descriptive
- [ ] Run: `git push origin main`
- [ ] Push successful

**Commit SHA:** `_______________________`

---

## 🌐 Vercel Deployment

- [ ] Visit Vercel dashboard
- [ ] Deployment triggered automatically
- [ ] Build started (check timestamp)
- [ ] Build logs show no errors
- [ ] Build completed successfully
- [ ] Deployment went live

**Deployment URL:** `_______________________`

**Deployment Time:** `_______________________`

---

## ✅ Production Verification

### 1. Visit Post URL
- [ ] Open: `https://optizenapp.com/<category>/<slug>`
- [ ] Page loads successfully (no 404)
- [ ] Content displays correctly
- [ ] Images load properly
- [ ] Mobile view looks good
- [ ] Desktop view looks good

### 2. Schema Validation
- [ ] Open: `https://validator.schema.org/`
- [ ] Enter your post URL
- [ ] Click "Run Test"
- [ ] No errors shown
- [ ] All schema types detected
- [ ] Screenshot validation results

### 3. Rich Results Test
- [ ] Open: `https://search.google.com/test/rich-results`
- [ ] Enter your post URL
- [ ] Click "Test URL"
- [ ] Rich results detected
- [ ] FAQ/HowTo cards shown (if applicable)
- [ ] No warnings or errors

### 4. Page Source Check
- [ ] Right-click → View Page Source
- [ ] Search for `application/ld+json`
- [ ] Schema JSON is present
- [ ] JSON is properly formatted
- [ ] All expected types are there

---

## 📊 Post-Launch Monitoring

### Immediate (Day 0)
- [ ] Share post on social media
- [ ] Add to internal linking strategy
- [ ] Monitor for any 404 errors

### Week 1
- [ ] Check Google Search Console
- [ ] Verify page is indexed
- [ ] Check for crawl errors
- [ ] Monitor impressions

### Week 2-4
- [ ] Check for rich results in search
- [ ] Monitor CTR in Search Console
- [ ] Track rankings for target keywords
- [ ] Analyze user engagement (GA4)

---

## 🐛 Troubleshooting

If something goes wrong, check:

### Post Not Found
- [ ] Post is published (not draft) in WordPress
- [ ] Slug matches exactly
- [ ] WordPress staging is accessible
- [ ] `WORDPRESS_API_URL` is correct

### Schema Generation Failed
- [ ] `ANTHROPIC_API_KEY` is set
- [ ] API key has credits
- [ ] No API rate limits hit
- [ ] Check console for error messages

### Build Failed on Vercel
- [ ] Check Vercel build logs
- [ ] Verify all env vars are set in Vercel
- [ ] Check for TypeScript errors
- [ ] Verify cache file was committed

### Schema Not Showing
- [ ] Cache file exists in `.schema-cache/`
- [ ] Cache file was committed to git
- [ ] Deployment completed successfully
- [ ] Clear browser cache and retry
- [ ] Check page source for JSON-LD

---

## 📝 Notes & Observations

**What went well:**
```
_______________________________________________________
_______________________________________________________
_______________________________________________________
```

**What could be improved:**
```
_______________________________________________________
_______________________________________________________
_______________________________________________________
```

**Time taken:**
- WordPress: _____ minutes
- Schema generation: _____ minutes
- Testing: _____ minutes
- Deployment: _____ minutes
- **Total:** _____ minutes

---

## 🎉 Success Criteria

Your first post is successful when:

- ✅ Post is live on production
- ✅ Schema validates with no errors
- ✅ Rich results test passes
- ✅ Page loads fast (<3 seconds)
- ✅ Mobile-friendly
- ✅ Indexed by Google (within 24-48 hours)

---

## 🔄 For Your Next Post

Now that you've done it once, the process will be much faster:

1. Write post in WordPress
2. Run: `npm run publish:post <slug>`
3. Copy/paste git commands
4. Deploy and verify

**Estimated time for future posts:** 2-3 minutes

---

**Date Completed:** `_______________________`

**Post URL:** `_______________________`

**Status:** ⬜ In Progress | ⬜ Completed | ⬜ Issues Found

---

**🎊 Congratulations on publishing your first post with the new system!**

Keep this checklist for reference, but you won't need it after a few posts - it'll become second nature!




