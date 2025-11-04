# Content Update Workflow with LLM Schema Generation

## 🎯 How It Works (INCREMENTAL!)

### First Build (One-Time Setup):
1. **Fetch all posts/pages** from WordPress (130 pages)
2. **For each page**: Generate LLM-powered schema.org using Claude
3. **Cache schema** with content hash + modified date
4. **Bake into static HTML** (~15-20 min for initial build)
5. **Deploy** → Pages load instantly

### Subsequent Builds (Fast!):
1. **Fetch all posts/pages** from WordPress
2. **Check cache** for each page
3. **Skip regeneration** if content unchanged ✅
4. **Only generate schema** for new/updated posts 🆕
5. **Deploy** → Build takes 2-5 min instead of 20 min!

### After Content Updates:
When you add/edit content in WordPress, rebuild triggers automatically (webhook) or manually. **Only changed content regenerates schema!**

---

## 🔄 Three Ways to Update Content

### Option 1: Manual Vercel Redeploy (Easiest)
**When to use:** Occasional updates (few times per week)

**Steps:**
1. Update content in WordPress
2. Go to [Vercel Dashboard](https://vercel.com/optizenapp/optizenapp/deployments)
3. Click **"..."** on latest deployment
4. Click **"Redeploy"**
5. Wait ~15-20 minutes for build
6. ✅ Site updated with new schema

**Pros:**
- Simple, no setup
- Free
- Full control

**Cons:**
- Manual process
- Takes 15-20 minutes

---

### Option 2: WordPress Webhook (Automated) ⭐ RECOMMENDED
**When to use:** Frequent updates (daily+)

**Setup Once:**

1. **Install "WP Webhooks" plugin** in WordPress:
```
https://wordpress.org/plugins/wp-webhooks/
```

2. **Create Vercel Deploy Hook:**
   - Go to Vercel → Project Settings → Git → Deploy Hooks
   - Create hook named: "WordPress Content Update"
   - Copy the URL (looks like: `https://api.vercel.com/v1/integrations/deploy/...`)

3. **Configure WordPress Webhook:**
   - In WordPress: WP Webhooks → Send Data → Add Webhook
   - **URL:** Paste Vercel deploy hook URL
   - **Trigger:** `post_updated`, `post_publish`, `post_trash`
   - **Method:** POST
   - Save

4. **Test:**
   - Update a post in WordPress
   - Check Vercel dashboard - new deployment should start automatically
   - Wait ~15-20 minutes
   - ✅ Content updated with fresh schema!

**Pros:**
- Automatic
- No manual work
- Fresh schema on every update

**Cons:**
- Initial setup required
- Every edit triggers rebuild (can disable for drafts)

---

### Option 3: Scheduled Rebuilds (Hybrid)
**When to use:** Predictable update schedule (e.g., daily at 6am)

**Setup with GitHub Actions:**

Create `.github/workflows/daily-rebuild.yml`:
```yaml
name: Daily Content Rebuild

on:
  schedule:
    # Runs every day at 6:00 AM UTC
    - cron: '0 6 * * *'
  workflow_dispatch: # Allow manual trigger

jobs:
  rebuild:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Vercel Deploy
        run: |
          curl -X POST "YOUR_VERCEL_DEPLOY_HOOK_URL"
```

**Pros:**
- Automatic daily updates
- Predictable build times
- Can batch multiple WordPress updates

**Cons:**
- Delay between WordPress edit and site update
- Requires GitHub Actions setup

---

## 💾 How the Cache System Works

### Smart Detection:
The system detects if content changed using **two checks**:

1. **Modified Date:** Compares WordPress `modified` timestamp
2. **Content Hash:** MD5 hash of content to detect edits even if date unchanged

### Cache Storage:
- **Location:** `.next/cache/schema/` (local builds) or Vercel build cache
- **Format:** JSON files with schema + metadata
- **Persistent:** Survives across deployments (Vercel caches build artifacts)

### Example Flow:

**First Build:**
```
Post: "How to optimize Shopify SEO"
Modified: 2025-11-01
Content Hash: abc123

1. No cache found
2. Generate schema via Claude API (~8s)
3. Save to cache: abc123.json
4. ✅ Schema generated
```

**Second Build (No Changes):**
```
Post: "How to optimize Shopify SEO"
Modified: 2025-11-01 (same)
Content Hash: abc123 (same)

1. Cache found!
2. Dates match, hash matches
3. ✅ Use cached schema (instant!)
4. Skip Claude API = $0.00
```

**Third Build (Post Updated):**
```
Post: "How to optimize Shopify SEO"
Modified: 2025-11-04 (changed!)
Content Hash: xyz789 (changed!)

1. Cache found but outdated
2. Regenerate schema via Claude API (~8s)
3. Update cache: xyz789.json
4. ✅ Fresh schema generated
```

### Force Full Regeneration:

If you need to regenerate ALL schema (e.g., after changing schema template):

**Option 1:** Clear cache via environment variable
```bash
# In Vercel, add env var:
FORCE_SCHEMA_REGENERATION=true

# Or locally:
npm run build
```

**Option 2:** Delete cache manually (not recommended for Vercel)

---

## ⚡ Build Time Comparison

### Before Caching:
- **Every build:** 130 pages × 8s = ~17 minutes
- **Cost:** $2-4 per build
- **API calls:** 130 per build

### After Caching (Typical):
- **New post only:** 1 page × 8s = ~8 seconds
- **10 posts updated:** 10 pages × 8s = ~80 seconds
- **Unchanged:** 120 pages = instant (cached)
- **Total:** ~2-3 minutes
- **Cost:** $0.02-0.20 (95% savings!)
- **API calls:** 1-10 per build (99% reduction!)

---

## 🚨 Emergency: Disable Schema Generation

If builds are failing or taking too long:

### Quick Fix:
1. Add to Vercel Environment Variables:
   ```
   DISABLE_SCHEMA_GENERATION=true
   ```

2. Redeploy → Site works with basic schema (still valid!)

3. Investigate and re-enable when ready

---

## 📊 Monitoring Build Performance

### Check Build Logs for:

```bash
# Good signs:
✅ ANTHROPIC_API_KEY configured
📚 Fetched 49 posts for static generation
📄 Fetched 81 pages for static generation
🔍 Analyzing content for schema generation...
⏱️  Claude API call completed in 4.23s
✅ Content analysis complete
✓ Generated static page: /category/slug

# Bad signs:
❌ Claude API timeout after 15 seconds
❌ Build exceeded maximum duration
⚠️  Too many requests (rate limit)
```

### Vercel Build Metrics:
- **Ideal:** 15-20 minutes
- **Warning:** 25-30 minutes (close to timeout)
- **Critical:** >30 minutes (will fail)

---

## 🔮 Future Enhancements

### 1. **Incremental Schema Generation**
- Only regenerate schema for changed posts
- Store schema in database/CDN
- **Reduces build time to 2-5 minutes**

### 2. **Background Schema Jobs**
- Generate schema async via serverless function
- Store in Vercel KV or external DB
- Fetch at runtime (cached)
- **Instant deploys, schema updates separately**

### 3. **Smart Caching**
```typescript
// Check if content changed
const lastModified = post.modified;
const cachedSchema = await getSchemaFromCache(post.slug);

if (cachedSchema && cachedSchema.timestamp >= lastModified) {
  return cachedSchema.data; // Skip Claude API
}

// Generate new schema
const newSchema = await generateSchemaOrg(...);
await cacheSchema(post.slug, newSchema, lastModified);
```

---

## ✅ Best Practice Workflow

### Daily Routine:
1. Morning: Update/create WordPress content
2. Trigger rebuild (manual or webhook)
3. Wait 15-20 minutes
4. Verify: Check new posts have schema

### Monthly:
- Review build times in Vercel
- Check Claude API usage (should be ~$5-10/month)
- Optimize if builds exceed 20 minutes

### Quarterly:
- Implement caching if content grows significantly
- Consider incremental schema generation

---

## 🆘 Troubleshooting

### "Build taking 30+ minutes"
→ Add `DISABLE_SCHEMA_GENERATION=true`, investigate
→ Check WordPress API is responding fast
→ Consider reducing content or implementing caching

### "Schema not appearing on new posts"
→ Check Vercel build logs for that specific URL
→ Verify `generateStaticParams()` returned that post
→ Check WordPress API is returning the post

### "Getting 404s for new content"
→ New content requires rebuild (by design)
→ Trigger manual redeploy in Vercel
→ Or set up webhook for automatic rebuilds

---

## 📞 Quick Reference

**Manual Rebuild:**
1. [Vercel Dashboard](https://vercel.com/optizenapp/optizenapp/deployments)
2. "..." → "Redeploy"
3. Wait ~20 min

**Check Build Status:**
https://vercel.com/optizenapp/optizenapp/deployments

**Emergency Disable:**
Vercel → Settings → Environment Variables:
`DISABLE_SCHEMA_GENERATION=true`

