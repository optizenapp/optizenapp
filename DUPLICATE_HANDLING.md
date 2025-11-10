# 🔒 Duplicate Detection & Schema Caching

## ✅ Yes, the System Prevents Duplicates!

The schema caching system is **smart** and prevents regenerating schemas for posts that already exist on the site.

---

## 🎯 How It Works

### 1. **URL-Based Cache Keys**

Each post gets a unique cache file based on its URL:

```
URL: https://optizenapp.com/aov/increase-shopify-revenue
      ↓
MD5 Hash: abc123def456...
      ↓
Cache File: .schema-cache/abc123def456.json
```

**Same URL = Same cache file = No duplicates**

### 2. **Automatic Cache Check**

When you run `npm run publish:post <slug>`, the system:

```
1. Fetches post from WordPress
2. Builds URL: https://optizenapp.com/<category>/<slug>
3. Checks if .schema-cache/<hash>.json exists
4. If exists AND content hasn't changed → Uses cached schema ✅
5. If exists BUT content changed → Regenerates schema 🔄
6. If doesn't exist → Generates new schema ✨
```

### 3. **Content Change Detection**

The cache is invalidated when:

- ✅ WordPress `dateModified` is newer than cached date
- ✅ Post content has been edited
- ✅ Post metadata has changed

The cache is **NOT** invalidated for:

- ❌ Minor formatting changes
- ❌ WordPress HTML variations
- ❌ Whitespace differences

---

## 📊 Real-World Examples

### Example 1: Publishing a New Post

```bash
$ npm run publish:post how-to-increase-aov

🚀 Publishing post: how-to-increase-aov

📥 STEP 1: Fetching post from WordPress staging...
✅ Post found!

🤖 STEP 2: Generating Schema.org markup with Claude AI...
🔍 Checking cache for: https://optizenapp.com/aov/how-to-increase-aov
   Cache key: abc123def456
   File exists: false
📦 No cache found for: https://optizenapp.com/aov/how-to-increase-aov
⚠️ No cached schema found - generating new schema...

✅ Schema generated successfully!
💾 Cached to: .schema-cache/abc123def456.json
```

**Result:** New schema generated and cached ✨

---

### Example 2: Running Script Again (No Changes)

```bash
$ npm run publish:post how-to-increase-aov

🚀 Publishing post: how-to-increase-aov

📥 STEP 1: Fetching post from WordPress staging...
✅ Post found!

🤖 STEP 2: Generating Schema.org markup with Claude AI...
🔍 Checking cache for: https://optizenapp.com/aov/how-to-increase-aov
   Cache key: abc123def456
   File exists: true
   Cached date: 2024-11-09T10:30:00Z
   Current date: 2024-11-09T10:30:00Z
   ✅ Modified date matches, using cached schema
✅ Using cached schema for: https://optizenapp.com/aov/how-to-increase-aov

✅ Schema generated successfully! (from cache)
```

**Result:** Cached schema used, no API call, no duplicate ✅

---

### Example 3: Post Was Updated in WordPress

```bash
$ npm run publish:post how-to-increase-aov

🚀 Publishing post: how-to-increase-aov

📥 STEP 1: Fetching post from WordPress staging...
✅ Post found!

🤖 STEP 2: Generating Schema.org markup with Claude AI...
🔍 Checking cache for: https://optizenapp.com/aov/how-to-increase-aov
   Cache key: abc123def456
   File exists: true
   Cached date: 2024-11-09T10:30:00Z
   Current date: 2024-11-09T14:45:00Z  ← NEWER!
♻️ Content updated since cache - regenerating...

✅ Schema generated successfully!
💾 Cached to: .schema-cache/abc123def456.json (UPDATED)
```

**Result:** Schema regenerated because content changed 🔄

---

## 🔐 Cache File Structure

Each cache file stores:

```json
{
  "schema": {
    "@context": "https://schema.org",
    "@graph": [...]
  },
  "generatedAt": "2024-11-09T10:30:00.000Z",
  "contentModified": "2024-11-09T10:30:00Z",
  "contentHash": "abc123..."
}
```

**Key fields:**
- `schema` - The actual Schema.org JSON-LD
- `generatedAt` - When the schema was generated
- `contentModified` - WordPress post's last modified date
- `contentHash` - MD5 hash of content (backup validation)

---

## 💡 What This Means for You

### ✅ Safe to Run Multiple Times

You can run the script as many times as you want:

```bash
npm run publish:post my-post
npm run publish:post my-post  # Safe! Uses cache
npm run publish:post my-post  # Safe! Uses cache
```

**No duplicates will be created.**

### ✅ No Wasted API Calls

If the post hasn't changed:
- ❌ No Claude API call
- ❌ No API costs
- ✅ Instant response from cache

### ✅ Automatic Updates

If you edit a post in WordPress:
- ✅ System detects the change
- ✅ Regenerates schema automatically
- ✅ Updates the cache file

---

## 🎯 Production Behavior

### During Vercel Build

When Vercel builds your site:

```
1. Fetches all posts from WordPress
2. For each post, checks .schema-cache/
3. If cached → Uses cached schema (fast!)
4. If not cached → Generates new schema
5. Renders pages with schema
```

**Same URL = Same cache file = No duplicates on production**

### ISR (Incremental Static Regeneration)

Your blog posts use ISR with 5-minute revalidation:

```typescript
// In app/[category]/[slug]/page.tsx
export const revalidate = 300; // 5 minutes
```

This means:
- ✅ Pages regenerate every 5 minutes if visited
- ✅ New content appears automatically
- ✅ Schema is always in sync with WordPress
- ✅ No manual intervention needed

---

## 🔍 How to Check for Duplicates

### Check Cache Directory

```bash
ls -la .schema-cache/

# Output:
# abc123def456.json  ← Post 1
# def456ghi789.json  ← Post 2
# ghi789jkl012.json  ← Post 3
```

Each file = one unique post URL

### Check Cache for Specific Post

```bash
# Calculate cache key for a URL
echo -n "https://optizenapp.com/aov/my-post" | md5

# Check if cache file exists
ls .schema-cache/<hash>.json
```

### View Cache Stats

```bash
# Count cached schemas
ls .schema-cache/ | wc -l

# Total cache size
du -sh .schema-cache/
```

---

## 🚨 Edge Cases

### Same Slug, Different Category

These are **different URLs**, so they get **different cache files**:

```
URL 1: https://optizenapp.com/aov/increase-revenue
       → Cache: .schema-cache/abc123.json

URL 2: https://optizenapp.com/seo/increase-revenue
       → Cache: .schema-cache/def456.json
```

**No conflict!** ✅

### Post Moved to Different Category

If you change a post's category in WordPress:

```
Old URL: https://optizenapp.com/aov/my-post
         → Cache: .schema-cache/abc123.json

New URL: https://optizenapp.com/seo/my-post
         → Cache: .schema-cache/def456.json
```

**Result:** Two cache files exist (old and new)

**Solution:** The old cache file is harmless (unused), or you can manually delete it.

---

## 🧹 Cache Management

### Clear All Cache (Rare)

```bash
rm -rf .schema-cache/
```

**When to do this:**
- Never needed in normal operation
- Only if you want to regenerate all schemas
- Costs API credits for all posts!

### Clear Single Post Cache

```bash
# Find the cache key
echo -n "https://optizenapp.com/aov/my-post" | md5

# Delete the cache file
rm .schema-cache/<hash>.json

# Regenerate
npm run publish:post my-post
```

### View Cache Stats (Future Feature)

```bash
npm run schema:stats

# Would show:
# Total cached: 45 posts
# Cache size: 2.3 MB
# Oldest: 2024-10-01
# Newest: 2024-11-09
```

---

## ✅ Summary

**Q: Will this create duplicate schemas?**
**A: No! The system prevents duplicates through:**

1. ✅ **URL-based cache keys** (same URL = same cache file)
2. ✅ **Automatic cache checking** (uses existing schema if available)
3. ✅ **Content change detection** (only regenerates if post changed)
4. ✅ **One cache file per URL** (no duplicates possible)

**Q: What if I run the script twice?**
**A: Safe! The second run will use the cached schema.**

**Q: What if I edit the post in WordPress?**
**A: The system detects the change and regenerates automatically.**

**Q: Can I have the same slug in different categories?**
**A: Yes! Different URLs = different cache files = no conflict.**

---

## 🎉 You're Protected!

The caching system is designed to:
- ✅ Prevent duplicates
- ✅ Save API costs
- ✅ Speed up builds
- ✅ Keep schemas in sync

**You can run the publishing script as many times as you want without worrying about duplicates!**

---

**For more details, see:**
- [PUBLISHING_WORKFLOW.md](./PUBLISHING_WORKFLOW.md) - Complete publishing guide
- [SCHEMA_SETUP.md](./SCHEMA_SETUP.md) - How schema generation works




