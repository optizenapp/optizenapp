# Schema Generation Scripts

These scripts help you generate and update advanced schema.org markup for blog posts.

## Quick Start

### Update Schema for a Single Post

```bash
npm run schema:update <post-slug>
```

**Example:**
```bash
npm run schema:update how-to-use-video-in-ecommerce
```

This will:
1. ✅ Fetch the post from WordPress
2. ✅ Generate advanced schema with Claude AI (Article, HowTo, FAQPage, etc.)
3. ✅ Cache it locally in `.schema-cache/`
4. ✅ Show you the commit commands to deploy it

### Then Deploy:

```bash
git add .schema-cache/
git commit -m "Update schema for [post-name]"
git push origin main
```

Vercel will automatically deploy and the advanced schema will be live!

## How It Works

### Cache System
- Schema is generated once and cached in `.schema-cache/`
- Cache files are committed to git
- Vercel uses the cached schema (no API calls during build)
- Cache is validated by WordPress `dateModified` field

### When to Regenerate Schema
You need to regenerate schema when:
- ✅ Publishing a new blog post
- ✅ Significantly editing an existing post
- ❌ NOT needed for minor typo fixes (unless you want to)

### Schema Types Generated
The AI analyzes your content and generates appropriate schema types:
- **Article** - Always included
- **HowTo** - If the post contains step-by-step instructions
- **FAQPage** - If the post has Q&A sections
- **ItemList** - For lists and comparisons
- **DefinedTermSet** - For glossaries and definitions
- **WebPage** - Page-level metadata
- **BreadcrumbList** - Navigation breadcrumbs

## Troubleshooting

### "Post not found"
- Check the slug is correct (it's the URL-friendly version)
- Make sure the post is published in WordPress

### "Schema generation failed"
- Check your `ANTHROPIC_API_KEY` in `.env.local`
- Make sure you have Claude API credits

### Schema not showing on live site
1. Check the cache file was committed: `git status`
2. Check Vercel deployment succeeded
3. Verify with: `https://validator.schema.org/#url=YOUR_POST_URL`
4. Clear browser cache and check again

## Files

- `update-post-schema.ts` - Main helper script (use this!)
- `generate-single-post-schema.ts` - Legacy script (still works)
- `generate-all-post-schemas.ts` - Bulk generation (use carefully)
- `generate-page-schemas.ts` - For static pages

