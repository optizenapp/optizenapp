import { getAllPostSlugs, getPostBySlug } from '@/lib/wordpress';
import { generateSchemaOrg } from '@/lib/schema-generator';

async function generateBlogSchema() {
  console.log('🚀 Starting blog post schema generation...\n');
  
  const postSlugs = await getAllPostSlugs();
  console.log(`📝 Fetching blog posts from WordPress...`);
  console.log(`✅ Found ${postSlugs.length} blog posts\n`);

  let totalGenerated = 0;
  let totalSkipped = 0;

  for (let i = 0; i < postSlugs.length; i++) {
    const [category, slug] = postSlugs[i].split('/');
    
    if (!category || !slug) continue;

    const post = await getPostBySlug(category, slug);
    if (!post) continue;

    const url = `https://optizenapp.com/${category}/${slug}`;
    
    console.log(`[${i + 1}/${postSlugs.length}] Generating schema for: ${post.title.rendered}`);

    const schema = await generateSchemaOrg({
      url,
      title: post.title.rendered,
      content: post.content.rendered,
      excerpt: post.excerpt.rendered,
      author: 'OptizenAI',
      datePublished: post.date,
      dateModified: post.modified,
      category,
      siteInfo: {
        name: 'OptizenAI',
        url: 'https://optizenapp.com',
        logoUrl: 'https://optizenapp.com/optizen-logo.png',
      },
    });
    
    if (schema) {
      totalGenerated++;
      console.log(`  ✅ Schema generated and cached\n`);
    } else {
      totalSkipped++;
      console.log(`  ⏭️  Skipped (cached or error)\n`);
    }
  }

  console.log('\n🎉 Blog schema generation complete!');
  console.log(`✅ Generated: ${totalGenerated}`);
  console.log(`⏭️  Skipped (cached): ${totalSkipped}`);
}

generateBlogSchema().catch(console.error);
