# LLM-Powered Schema.org Generation Setup

This project uses **Claude Sonnet 4.5** to automatically generate contextually-aware schema.org markup for all content.

## 🎯 What It Does

The system analyzes every page (blog posts, WordPress pages, documentation) and automatically generates rich schema.org markup including:

- **Article/HowTo schemas** - Main content structure
- **FAQPage schemas** - Automatically extracted Q&A
- **DefinedTerm schemas** - Key concepts and definitions
- **WebPage + Breadcrumb schemas** - Navigation structure
- **Organization schema** - Site identity

## 🔧 Setup

### 1. Get Your Anthropic API Key

1. Go to [https://console.anthropic.com/](https://console.anthropic.com/)
2. Sign up or log in
3. Navigate to API Keys
4. Create a new API key

### 2. Add to Environment Variables

**For local development:**
Create a `.env.local` file in the project root:

```bash
ANTHROPIC_API_KEY=your_actual_api_key_here
```

**For Vercel deployment:**
1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add:
   - Key: `ANTHROPIC_API_KEY`
   - Value: Your Anthropic API key
   - Environment: Production (and Preview if desired)

### 3. Deploy

The schema generation will automatically run during build time for all pages.

## 📊 How It Works

```
Content → Claude Analysis → Schema Generation → Page Render
```

1. **Content Analysis**: Claude analyzes the HTML content
2. **Entity Extraction**: Identifies key concepts, questions, steps
3. **Schema Building**: Constructs appropriate schema.org types
4. **Injection**: Adds JSON-LD to page `<head>`

## 💰 Cost Considerations

- **Per page**: ~$0.02-0.08 (depending on content length)
- **Caching**: Permanent cache - only regenerates on deploy
- **Typical blog** (100 pages): ~$2-8 per deploy
- **Monthly cost**: $2-15/month (assuming 3-5 deploys/month)
- **Value**: Massive SEO improvement, rich search results

### Cost Savings Strategy
Schema is generated once at build time and cached permanently. It only regenerates when:
1. You deploy new code
2. You manually trigger revalidation
3. WordPress content is updated (if using webhooks)

See `REVALIDATION_GUIDE.md` for more details.

## 🎨 Schema Types Generated

### Blog Posts
- Article
- FAQPage (if Q&A found)
- DefinedTerm (for key concepts)
- BreadcrumbList
- Organization

### Documentation
- HowTo (if steps found)
- FAQPage (if Q&A found)
- Article (fallback)
- DefinedTerm
- BreadcrumbList
- Organization

### Regular Pages
- Article/WebPage
- DefinedTerm (if definitions found)
- BreadcrumbList
- Organization

## 🔍 Example Output

For a blog post about "Upsell vs Downsell", the system generates:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "Upsell vs Downsell...",
      "keywords": ["upsell", "downsell", "AOV"],
      "about": [
        {
          "@type": "Thing",
          "name": "Upselling",
          "description": "Sales technique..."
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [...]
    }
  ]
}
```

## ⚠️ Without API Key

If no API key is provided:
- Pages will build successfully
- Basic fallback schema will be used
- No LLM analysis
- Console warnings will show

## 🚀 Benefits

1. **Automatic rich results** in Google Search
2. **FAQ cards** in search results
3. **How-to step cards** in search
4. **Better CTR** from enhanced snippets
5. **Improved SEO rankings**
6. **Zero manual work** - fully automatic

## 📝 Files

- `lib/claude-api.ts` - Claude API client
- `lib/schema-generator.ts` - Main generation logic
- Applied in:
  - `app/[category]/[slug]/page.tsx` (Blog posts)
  - `app/[...slug]/page.tsx` (WordPress pages)
  - `app/support-docs/[app]/[...slug]/page.tsx` (Documentation)

## 🐛 Troubleshooting

**Schema not appearing:**
- Check `ANTHROPIC_API_KEY` is set
- Check build logs for API errors
- Verify API key has credits

**Build failing:**
- API rate limits? Wait and rebuild
- Invalid API key? Check console settings
- Network issues? Check Vercel logs

## 📊 Monitoring

Check your Anthropic dashboard for:
- API usage
- Token consumption
- Cost tracking
- Rate limits

