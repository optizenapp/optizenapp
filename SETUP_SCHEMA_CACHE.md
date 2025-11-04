# One-Time Schema Cache Setup

## 🎯 Goal
Generate schema for all 130 existing posts/pages **once locally**, commit it to git, then only generate schema for NEW or UPDATED content going forward.

## ✅ Benefits
- **First Vercel build:** 2-5 minutes (not 20!)
- **No WordPress API load** during initial build
- **Cost:** $0 for existing content (already cached)
- **Future builds:** Only generate schema for new/updated posts

---

## 📋 Setup Steps

### Step 1: Install Dependencies
```bash
npm install --save-dev tsx
```

### Step 2: Set Environment Variable Locally
Create `.env.local` file:
```bash
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

**Note:** Get your API key from [Anthropic Console](https://console.anthropic.com/)

### Step 3: Run Schema Generation Script
This will take ~20 minutes and generate schema for all 130 pages:
```bash
npx tsx scripts/generate-initial-schema.ts
```

**What happens:**
- Fetches all 49 posts from WordPress
- Fetches all 81 pages from WordPress  
- For each one:
  - Calls Claude API to analyze content
  - Generates schema.org JSON-LD
  - Saves to `.schema-cache/[hash].json`
- Total: ~130 API calls × 8s = ~17 minutes

**Cost:** ~$4 (one-time only!)

### Step 4: Review Generated Cache
```bash
# Check how many schemas were generated
ls -la .schema-cache/ | wc -l

# Should show ~130 files
```

### Step 5: Commit to Git
```bash
git add .schema-cache/
git add scripts/generate-initial-schema.ts
git add lib/schema-cache.ts
git commit -m "Add pre-generated schema cache for all existing content"
git push origin main
```

### Step 6: Deploy to Vercel
The next Vercel build will:
- ✅ Use cached schema for all 130 existing pages (instant!)
- ✅ Only generate schema for NEW posts you add
- ✅ Build completes in 2-5 minutes

---

## 🔄 Future Workflow

### When You Add a NEW Post in WordPress:
```
1. Write post in WordPress
2. Trigger Vercel rebuild (webhook or manual)
3. Build process:
   - Fetch 50 posts (1 new)
   - Check cache:
     ✅ 49 posts: Cache hit!
     📦 1 new post: Generate schema
   - Build in ~3 minutes
4. Cost: $0.03 (one new post)
```

### When You EDIT an Existing Post:
```
1. Edit post in WordPress
2. Trigger Vercel rebuild
3. Build process:
   - Fetch posts
   - Check cache:
     ✅ 48 posts: Cache hit!
     ♻️  1 post: Modified date changed, regenerate
   - Build in ~3 minutes
4. Cost: $0.03 (one updated post)
```

---

## 🔍 Troubleshooting

### "Module not found: tsx"
Run: `npm install --save-dev tsx`

### "ANTHROPIC_API_KEY not set"
Create `.env.local` with your API key

### "No cache found" on Vercel build
The `.schema-cache/` directory should be committed to git.  
Check: `git ls-files .schema-cache/`

### Want to regenerate all schema?
```bash
rm -rf .schema-cache/
npx tsx scripts/generate-initial-schema.ts
git add .schema-cache/
git commit -m "Regenerate all schema"
git push origin main
```

---

## 💰 Cost Breakdown

### Traditional Approach (Every Build):
- Every build: 130 pages × $0.03 = $3.90
- 5 builds/month = $19.50/month
- Annual: $234

### New Approach (Incremental):
- One-time setup: $3.90
- Average build (2 new/updated): $0.06
- 20 builds/month = $1.20/month
- Annual: $3.90 + $14.40 = $18.30

**Savings: $216/year (92%!)**

---

## ✅ Ready to Run?

```bash
# 1. Install
npm install --save-dev tsx

# 2. Create .env.local with API key

# 3. Run script
npx tsx scripts/generate-initial-schema.ts

# 4. Commit
git add .schema-cache/ scripts/ lib/schema-cache.ts
git commit -m "Add pre-generated schema cache"
git push origin main

# 5. Done! Next build will be fast.
```

