# 📝 Blog Post Publishing Workflow

This guide explains how to publish a new blog post from WordPress staging to your Next.js production site with automatic Schema.org generation.

## 🎯 Overview

When you publish a new blog post on WordPress staging, you need to:
1. ✅ Generate Schema.org markup for SEO
2. ✅ Cache the schema locally
3. ✅ Deploy to Vercel production

**The `publish:post` script automates all of this!**

---

## 🚀 Quick Start

### Prerequisites

Make sure you have:
- ✅ `.env.local` file with `WORDPRESS_API_URL` and `ANTHROPIC_API_KEY`
- ✅ Blog post published on WordPress staging
- ✅ Git repository initialized

### Step 1: Publish Post on WordPress Staging

1. Write your blog post in WordPress staging
2. Add featured image, category, and SEO meta (Rank Math)
3. Click **Publish**
4. Note the post slug (from the URL)

### Step 2: Run the Publishing Script

```bash
npm run schema:update <your-post-slug>
```

**Example:**
```bash
npm run schema:update how-to-increase-shopify-aov
```

### Step 3: Review the Output

The script will:
- ✅ Fetch the post from WordPress staging
- ✅ Generate advanced Schema.org markup using Claude AI
- ✅ Cache the schema locally in `.schema-cache/`
- ✅ Show you what to commit

### Step 4: Test Locally (Optional but Recommended)

```bash
npm run dev
```

Visit: `http://localhost:3000/<category>/<slug>`

View page source to verify schema is present.

### Step 5: Deploy to Production

```bash
git add .schema-cache/<hash>.json
git commit -m "Add schema for: Your Post Title"
git push origin main
```

**Or use the quick command from the script output:**
```bash
git add .schema-cache/abc123.json && git commit -m "Add schema for: Your Post Title" && git push origin main
```

### Step 6: Verify on Production

After Vercel deploys (~2-3 minutes):

1. **Visit your post:**
   ```
   https://optizenapp.com/<category>/<slug>
   ```

2. **Validate schema:**
   ```
   https://validator.schema.org/#url=https://optizenapp.com/<category>/<slug>
   ```

3. **Test rich results:**
   ```
   https://search.google.com/test/rich-results?url=https://optizenapp.com/<category>/<slug>
   ```

---

## 📊 What Schema Types Are Generated?

The script automatically generates rich Schema.org markup based on your content:

### For Blog Posts:
- **Article** - Main article schema with headline, author, dates
- **FAQPage** - If Q&A content is detected
- **HowTo** - If step-by-step instructions are found
- **DefinedTerm** - For key concepts and terminology
- **BreadcrumbList** - Navigation breadcrumbs
- **Organization** - Publisher information
- **ImageObject** - Featured image metadata

### Example Schema Output:
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "How to Increase Shopify AOV with Video Upsells",
      "author": { "@type": "Person", "name": "OptizenApp" },
      "datePublished": "2024-11-09T00:00:00Z",
      "image": { "@type": "ImageObject", "url": "..." }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [...]
    }
  ]
}
```

---

## 🔧 Troubleshooting

### Post Not Found

**Error:** `Post with slug "..." not found on WordPress staging`

**Solutions:**
1. Check the post is **published** (not draft)
2. Verify the slug is correct (check WordPress post URL)
3. Ensure `WORDPRESS_API_URL` is set in `.env.local`

### Schema Generation Failed

**Error:** `Schema generation failed`

**Solutions:**
1. Check `ANTHROPIC_API_KEY` is set in `.env.local`
2. Verify you have API credits available
3. Check console for API errors

### Build Failing on Vercel

**Error:** Build fails after pushing to production

**Solutions:**
1. Ensure `.schema-cache/` directory is committed
2. Check Vercel environment variables are set
3. Review build logs for specific errors

---

## 🎨 Advanced Usage

### Update Existing Post Schema

If you've updated a blog post and need to regenerate schema:

```bash
npm run schema:update <post-slug>
```

This will:
- Fetch the latest content from WordPress
- Regenerate schema with updated content
- Update the cached schema file

### Generate Schema for All Posts

To regenerate schema for all blog posts:

```bash
npm run schema:blog
```

⚠️ **Warning:** This will use Claude API credits for each post!

### Test Schema Locally

To test schema generation without committing:

```bash
npm run dev
```

Then visit any blog post URL. Schema is generated on-demand in development mode.

---

## 📁 File Structure

```
optizenapp2/
├── .schema-cache/           # Cached schema files (commit these!)
│   └── abc123.json          # Schema for each post (MD5 hash of URL)
├── scripts/
│   ├── publish-new-post.ts  # Main publishing workflow script
│   ├── update-post-schema.ts # Update existing post schema
│   └── generate-blog-schema.ts # Batch generate all schemas
├── lib/
│   ├── schema-generator.ts  # Schema generation logic
│   ├── schema-cache.ts      # Schema caching system
│   └── wordpress.ts         # WordPress API client
└── PUBLISHING_WORKFLOW.md   # This file
```

---

## 🔄 How It Works

### 1. WordPress Staging → Next.js

Your WordPress staging site acts as a headless CMS:
- Posts are created/edited in WordPress
- Next.js fetches posts via WordPress REST API
- Content is rendered in Next.js with Tailwind CSS

### 2. Schema Generation

When you run `publish:post`:
1. Script fetches post from WordPress API
2. Claude AI analyzes content and generates contextual schema
3. Schema is cached locally in `.schema-cache/`
4. Next.js reads cached schema at build time

### 3. Deployment

When you push to GitHub:
1. Vercel detects changes
2. Runs Next.js build (includes ISR for blog posts)
3. Deploys to production
4. Blog post is live with rich schema!

### 4. Schema Caching Strategy

- **Build time:** Schema is read from `.schema-cache/`
- **No API calls:** Schema is pre-generated, no runtime API costs
- **ISR (Incremental Static Regeneration):** Posts revalidate every 5 minutes
- **Cost savings:** Generate once, serve forever

---

## 💡 Best Practices

### 1. Always Test Locally First

```bash
npm run dev
```

Visit the post locally and verify:
- Content renders correctly
- Images load properly
- Schema is present in page source

### 2. Use Descriptive Commit Messages

```bash
git commit -m "Add schema for: How to Increase AOV with Video Upsells"
```

This helps track which posts have been published.

### 3. Validate Schema After Deployment

Always check:
- Schema Validator: https://validator.schema.org/
- Rich Results Test: https://search.google.com/test/rich-results

### 4. Monitor Vercel Deployments

Watch the deployment in Vercel dashboard:
- Build logs for errors
- Deployment preview URL
- Production deployment status

---

## 🎯 SEO Benefits

By using this workflow, you get:

✅ **Rich Search Results** - FAQ cards, How-to steps, Article snippets
✅ **Better CTR** - Enhanced snippets attract more clicks
✅ **Improved Rankings** - Structured data helps Google understand content
✅ **Knowledge Graph** - Potential inclusion in Google's Knowledge Graph
✅ **Voice Search** - Optimized for voice assistants

---

## 📞 Support

If you encounter issues:

1. Check this guide first
2. Review the script output for specific errors
3. Check Vercel build logs
4. Verify environment variables are set

---

## 🔗 Related Documentation

- [SCHEMA_SETUP.md](./SCHEMA_SETUP.md) - Schema system architecture
- [REVALIDATION_GUIDE.md](./REVALIDATION_GUIDE.md) - ISR and caching strategy
- [scripts/README.md](./scripts/README.md) - All available scripts

---

**Happy Publishing! 🚀**

