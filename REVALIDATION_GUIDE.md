# Content Revalidation Guide

## 🎯 Current Setup

**Schema generation now runs:**
- ✅ Once at build/deploy time
- ✅ Cached permanently (no automatic regeneration)
- ✅ Only regenerates on manual trigger or redeploy

**Cost Impact:**
- **Before:** $30-60/month (hourly regeneration)
- **After:** $2-8/month (only on deploys)

---

## 🔄 When to Regenerate Content

### Automatic Regeneration Triggers:
1. **New Deploy** - Any git push triggers full site rebuild
2. **Vercel Redeploy** - Manual redeploy from Vercel dashboard

### Manual Regeneration (When WordPress Content Changes):

#### Option 1: Vercel Dashboard (Easiest)
1. Go to: https://vercel.com/optizenapp/optizenapp/deployments
2. Click "Redeploy" on the latest deployment
3. Select "Use existing build cache" for faster rebuild

#### Option 2: Git Push (Trigger rebuild)
```bash
cd /Users/jonofarrington/Documents/Cursor\ Project/optizenapp2
git commit --allow-empty -m "Trigger rebuild for content updates"
git push origin main
```

#### Option 3: On-Demand Revalidation (Advanced)

Create a WordPress webhook that triggers revalidation when content is published/updated:

**Step 1: Add Revalidation API Route**

Create `app/api/revalidate/route.ts`:
```typescript
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Verify secret to prevent abuse
  const secret = request.nextUrl.searchParams.get('secret');
  
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { path, type } = body;

    // Revalidate the specific path
    if (path) {
      await revalidatePath(path);
      return NextResponse.json({ revalidated: true, path });
    }

    // Or revalidate by type
    if (type === 'post') {
      await revalidatePath('/blog', 'page');
      await revalidatePath('/[category]/[slug]', 'page');
    } else if (type === 'page') {
      await revalidatePath('/[...slug]', 'page');
    }

    return NextResponse.json({ revalidated: true, type });
  } catch (err) {
    return NextResponse.json({ error: 'Error revalidating' }, { status: 500 });
  }
}
```

**Step 2: Add to WordPress (functions.php or plugin)**
```php
// Hook into WordPress post save
add_action('save_post', 'trigger_nextjs_revalidation', 10, 3);

function trigger_nextjs_revalidation($post_id, $post, $update) {
    // Only trigger on published posts/pages
    if ($post->post_status !== 'publish') {
        return;
    }
    
    // Only trigger on actual updates (not auto-saves)
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    $revalidation_url = 'https://optizenapp.com/api/revalidate';
    $secret = 'YOUR_SECRET_KEY'; // Match REVALIDATION_SECRET in Vercel
    
    // Determine the path to revalidate
    $path = '';
    if ($post->post_type === 'post') {
        $categories = get_the_category($post_id);
        if (!empty($categories)) {
            $category_slug = $categories[0]->slug;
            $path = "/{$category_slug}/{$post->post_name}";
        }
    } elseif ($post->post_type === 'page') {
        $path = "/{$post->post_name}";
    }

    // Trigger revalidation
    wp_remote_post($revalidation_url . "?secret={$secret}", [
        'body' => json_encode([
            'path' => $path,
            'type' => $post->post_type
        ]),
        'headers' => [
            'Content-Type' => 'application/json',
        ],
    ]);
}
```

**Step 3: Add Secret to Vercel**
1. Go to Vercel → Settings → Environment Variables
2. Add `REVALIDATION_SECRET` = `your-random-secret-key`

---

## 📊 Cost Comparison

### Before (Hourly ISR):
- 100 pages × 24 hours × 30 days = 72,000 regenerations/month
- Cost: $30-60/month in Claude API calls

### After (Deploy-Only):
- 100 pages × ~5 deploys/month = 500 regenerations/month
- Cost: $2-8/month in Claude API calls

### With On-Demand Webhooks:
- 100 pages × ~10 content updates/month = 1,000 regenerations/month
- Cost: $4-15/month in Claude API calls

**Savings: 90-95% reduction in API costs!** 🎉

---

## 🚀 Recommended Workflow

### For Quick Content Updates:
Just edit in WordPress. Users will see the new content on next redeploy.

### For Urgent SEO Schema Updates:
1. Edit content in WordPress
2. Run: `git commit --allow-empty -m "Content update" && git push`
3. Wait 2-3 minutes for Vercel deploy
4. New schema is live!

### For Automated Updates (Optional):
Implement the webhook system above for automatic revalidation when content is published in WordPress.

---

## ⚡ Quick Commands

```bash
# Trigger immediate rebuild
git commit --allow-empty -m "Rebuild site" && git push origin main

# Check latest Vercel deployment status
# Visit: https://vercel.com/optizenapp/optizenapp
```

