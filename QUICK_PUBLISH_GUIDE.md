# ⚡ Quick Publish Guide - TL;DR

## 🎯 Publish a New Blog Post in 3 Steps

### 1️⃣ Generate Schema
```bash
npm run schema:update <post-slug>
```

### 2️⃣ Deploy to Production
```bash
git add .schema-cache/*.json
git commit -m "Add schema for: Post Title"
git push origin main
```

### 3️⃣ Verify (after 2-3 min)
```
https://optizenapp.com/<category>/<slug>
https://validator.schema.org/#url=https://optizenapp.com/<category>/<slug>
```

---

## 📋 Common Commands

| Task | Command |
|------|---------|
| Publish new post | `npm run schema:update <slug>` |
| Update existing post | `npm run schema:update <slug>` |
| Test locally | `npm run dev` |
| Build production | `npm run build` |

---

## 🔍 Find Your Post Slug

Your post slug is in the WordPress URL:

```
https://staging.optizenapp.com/category/my-post-slug/
                                        ^^^^^^^^^^^^^^
                                        This is your slug
```

---

## ✅ Pre-Flight Checklist

Before running `publish:post`:

- [ ] Post is **published** on WordPress staging
- [ ] Featured image is set
- [ ] Category is assigned
- [ ] SEO meta is filled (Rank Math)
- [ ] `.env.local` has API keys

---

## 🔒 Duplicate Protection

✅ **Safe to run multiple times** - System uses cache, won't create duplicates
✅ **Automatic cache checking** - Uses existing schema if post hasn't changed
✅ **Smart updates** - Only regenerates if WordPress content was modified

**See [DUPLICATE_HANDLING.md](./DUPLICATE_HANDLING.md) for details**

---

## 🚨 Quick Troubleshooting

| Error | Fix |
|-------|-----|
| "Post not found" | Check post is published, verify slug |
| "Schema generation failed" | Check `ANTHROPIC_API_KEY` in `.env.local` |
| "Build failing" | Check Vercel logs, verify env vars |

---

## 📊 What Gets Generated?

✅ Article schema with SEO metadata
✅ FAQPage (if Q&A detected)
✅ HowTo (if steps detected)
✅ BreadcrumbList
✅ Organization
✅ ImageObject

---

## 🎯 One-Line Deploy

Copy from script output:
```bash
git add .schema-cache/<hash>.json && git commit -m "Add schema for: Title" && git push origin main
```

---

**Need more details?** See [PUBLISHING_WORKFLOW.md](./PUBLISHING_WORKFLOW.md)

