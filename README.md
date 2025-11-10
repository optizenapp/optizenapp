# OptizenApp - Next.js Marketing Site

Marketing website for OptizenApp's Shopify apps (Video Upsell & SEO Tools) with integrated WordPress blog and advanced Schema.org markup.

## 🚀 Quick Start

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### 📝 Publish a New Blog Post

```bash
npm run schema:update <post-slug>
```

**Example:**
```bash
npm run schema:update how-to-increase-shopify-aov
```

This will:
1. ✅ Fetch post from WordPress staging
2. ✅ Generate advanced Schema.org markup with Claude AI
3. ✅ Cache schema locally (prevents duplicates!)
4. ✅ Show deployment instructions

**Safe to run multiple times** - uses cache, won't create duplicates

**See [QUICK_PUBLISH_GUIDE.md](./QUICK_PUBLISH_GUIDE.md) for details**

---

## 📚 Documentation

| Guide | Purpose |
|-------|---------|
| [QUICK_PUBLISH_GUIDE.md](./QUICK_PUBLISH_GUIDE.md) | Quick reference for publishing posts |
| [PUBLISHING_WORKFLOW.md](./PUBLISHING_WORKFLOW.md) | Complete publishing guide |
| [WORKFLOW_DIAGRAM.md](./WORKFLOW_DIAGRAM.md) | Visual workflow diagrams |
| [PUBLISHING_SUMMARY.md](./PUBLISHING_SUMMARY.md) | System overview and setup |
| [SCHEMA_SETUP.md](./SCHEMA_SETUP.md) | Schema system architecture |

---

## 🎯 Key Features

- **WordPress Integration** - Headless CMS via REST API
- **Advanced Schema.org** - AI-generated structured data (Article, FAQPage, HowTo, etc.)
- **Incremental Static Regeneration** - Fast, SEO-optimized pages
- **Google Analytics & Ads** - Conversion tracking
- **Mobile-Responsive** - Tailwind CSS design
- **Schema Caching** - Pre-generated schemas for fast builds

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS
- **CMS:** WordPress (headless)
- **Schema:** Claude AI + Schema.org
- **Deployment:** Vercel
- **Analytics:** Google Analytics 4 + Google Ads

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
