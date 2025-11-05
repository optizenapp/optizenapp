/**
 * LLM-Powered Schema.org Generator
 * Based on Patent US9152623B2 principles
 * 
 * Dynamically analyzes content and generates contextually-aware schema.org markup
 */

import { getClaudeAPI } from './claude-api';
import { getCachedSchema, setCachedSchema } from './schema-cache';

export interface ContentAnalysis {
  contentType: 'article' | 'howto' | 'faq' | 'definition' | 'comparison' | 'guide' | 'documentation';
  mainEntities: Array<{
    name: string;
    type: string;
    description: string;
  }>;
  questions: Array<{
    question: string;
    answer: string;
  }>;
  steps: Array<{
    name: string;
    text: string;
  }>;
  definitions: Array<{
    term: string;
    definition: string;
  }>;
  keywords: string[];
  estimatedReadTime: string;
  hasTables: boolean;
  hasImages: boolean;
  hasComparisons: boolean;
}

export interface SchemaGenerationInput {
  url: string;
  title: string;
  content: string;
  excerpt?: string;
  author?: string;
  datePublished: string;
  dateModified: string;
  category?: string;
  featuredImage?: {
    url: string;
    width: number;
    height: number;
    alt?: string;
  };
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
  siteInfo: {
    name: string;
    url: string;
    logoUrl: string;
  };
}

// Detect if this is the homepage
function isHomepage(input: SchemaGenerationInput): boolean {
  const url = input.url.toLowerCase();
  return url === 'https://optizenapp.com' || url === 'https://optizenapp.com/';
}

// Detect if this is a blog post
function isBlogPost(input: SchemaGenerationInput): boolean {
  // Blog posts have categories like 'aov', 'content', 'optizen-ai', etc.
  // They're NOT support docs, NOT homepage, NOT tool pages
  const url = input.url.toLowerCase();
  
  // Exclude homepage and support docs
  if (isHomepage(input) || url.includes('/support-docs/')) {
    return false;
  }
  
  // Blog posts typically have a category in the URL structure
  // e.g., https://optizenapp.com/aov/post-slug or https://optizenapp.com/content/post-slug
  const pathParts = url.replace('https://optizenapp.com/', '').split('/');
  return pathParts.length >= 2 && !!input.category && input.category !== 'shopify';
}

// Detect if a page is a tool/utility page based on URL and content
function isToolPage(input: SchemaGenerationInput): boolean {
  const urlLower = input.url.toLowerCase();
  const titleLower = input.title.toLowerCase();
  
  // Exclude homepage and support docs
  if (isHomepage(input) || urlLower.includes('/support-docs/')) {
    return false;
  }
  
  // If it's not a blog post (no category structure), treat it as a tool/page
  // WordPress pages are typically informational/utility pages
  if (!isBlogPost(input)) {
    return true; // WordPress pages are tool pages
  }
  
  // Also check for explicit tool keywords
  const toolKeywords = ['tool', 'generator', 'calculator', 'utility', 'converter', 'checker'];
  return toolKeywords.some(keyword => 
    urlLower.includes(keyword) || titleLower.includes(keyword)
  );
}

// Detect if a page is a support docs page
function isSupportDocsPage(input: SchemaGenerationInput): boolean {
  return input.url.includes('/support-docs/');
}

// Get appropriate prompt based on page type
function getSchemaPrompt(input: SchemaGenerationInput, plainText: string): string {
  // Check for support docs first (video tutorials)
  if (isSupportDocsPage(input)) {
    return `You are an advanced schema markup generator for VIDEO SUPPORT DOCUMENTATION pages based on US Patent 9152623B2.

## Page Type Detection:
This is a VIDEO-BASED SUPPORT/TUTORIAL page. Prioritize schema types that emphasize learning, instruction, and video content.

## Required Schema Types for Video Support Pages:

### 1. VideoObject (PRIMARY)
- name, description, thumbnailUrl
- uploadDate, duration, contentUrl, embedUrl
- interactionStatistic (view count)
- about (what the video teaches)
- teaches (link to HowTo)
- transcript (if available)
- regionsAllowed

### 2. TechArticle or Article (CONTAINER)
- headline, description
- articleSection: "Support Documentation"
- hasPart (contains VideoObject)
- mainEntity (points to VideoObject)
- teaches (array of learning outcomes)
- isPartOf (documentation series)

### 3. HowTo (INSTRUCTIONAL STRUCTURE)
- Link to video in each step
- video property at HowTo level
- video clips for individual steps using time fragments (#t=start,end)
- tool and supply requirements
- totalTime and performTime

### 4. LearningResource
- learningResourceType: "Video Tutorial"
- educationalLevel (Beginner/Intermediate/Advanced)
- timeRequired
- teaches, assesses, competencyRequired
- educationalUse array
- isAccessibleForFree

### 5. FAQPage
- Questions about the tutorial/feature
- Link video property in answers
- Common troubleshooting questions

### 6. WebPage (PAGE METADATA)
- Breadcrumb to support section
- mainEntity pointing to VideoObject
- speakable content

### 7. SoftwareApplication (if documenting an app)
- The software being demonstrated
- featureList covered in video
- operatingSystem
- screenshot

### 8. CreativeWorkSeries (for documentation sets)
- Series of support videos
- hasPart listing all tutorials
- issn or identifier

### 9. Course (if part of training)
- Educational framing
- courseMode: "online"
- courseWorkload
- provider

### 10. DefinedTermSet
- Technical terms used in video
- Feature names and definitions
- Platform-specific terminology

## Three-Level Analysis for Video Support Pages:

### WORD LEVEL - Feature & Action Extraction
- Identify software features demonstrated
- Extract action verbs (click, select, configure, update)
- List UI elements mentioned (buttons, menus, settings)
- Capture technical terminology

### PHRASE LEVEL - Procedure Mapping
- Map step-by-step procedures shown in video
- Identify prerequisite knowledge/tools
- Extract time segments for each major action
- Document expected outcomes

### CLAUSE LEVEL - Complete Learning Journey
- Connect video to broader documentation
- Link to related tutorials
- Map feature relationships
- Establish learning progression

## Video-Specific Requirements:

1. **Time-Based Structure**: Use video fragments (#t=start,end) to link HowTo steps to video segments
2. **Transcript Integration**: Include transcript if available (improves accessibility & SEO)
3. **Visual Metadata**: Thumbnail URLs, screenshot URLs
4. **Duration**: Precise video duration in ISO 8601 format (PT5M30S)
5. **Interaction Data**: View counts, engagement metrics if available
6. **Accessibility**: Captions, transcripts, audio description mentions
7. **Video Platform**: Specify if YouTube, Vimeo, self-hosted
8. **Embedding**: Provide embedUrl for player integration

## Support Documentation Best Practices:

1. **Link Everything**: Video → HowTo → FAQ → LearningResource → Article
2. **Progressive Disclosure**: Structure from overview to detailed steps
3. **Prerequisite Chain**: Specify required knowledge and tools
4. **Outcome Focus**: Emphasize what users will learn/achieve
5. **Troubleshooting**: Include common issues in FAQ
6. **Series Context**: Show how this video fits in documentation series
7. **Multi-format**: Support both video learners and text readers
8. **Search Optimization**: Rich metadata for video SEO

## Special Considerations:

- If video has chapters/sections, map to HowTo steps
- If demonstrating software, include SoftwareApplication schema
- If part of certification/training, add Course schema
- If user-generated or tutorial, add appropriate creator info
- Link to related documentation pages
- Include calls-to-action (install app, try feature)

## Content Extraction Strategy:

Even if page has minimal text:
1. Extract all information from page title
2. Infer steps from video context
3. Generate comprehensive HowTo from video purpose
4. Create logical FAQ based on topic
5. Define terms used in video title/description
6. Estimate video duration and structure

URL: ${input.url}
Title: ${input.title}
Category: ${input.category || 'Support Documentation'}

CONTENT:
${plainText}

Return ONLY a valid JSON-LD with @graph array including VideoObject, TechArticle, HowTo, LearningResource, FAQPage, and all supporting schema types.`;
  }
  
  // Check for homepage
  if (isHomepage(input)) {
    return `You are an advanced schema markup generator for HOMEPAGE/LANDING pages based on US Patent 9152623B2.

## Page Type Detection:
This is a HOMEPAGE - the main entry point representing an organization and its products/services. Prioritize authority, trust signals, and comprehensive product information.

## Required Schema Types for Homepage:

### 1. Organization (PRIMARY - MOST IMPORTANT)
- Complete company information: name, alternateName, url, logo
- description, slogan, contactPoint, sameAs, aggregateRating, review, makesOffer

### 2. WebSite - url, name, description, publisher, potentialAction (SearchAction)

### 3. WebPage - URL, about, primaryImageOfPage, breadcrumb, speakable

### 4. SoftwareApplication (for each product) - Complete details, offers, featureList, aggregateRating

### 5. Offer (for each pricing plan) - Detailed pricing information

### 6. FAQPage - Common questions about products/services

### 7. ItemList - Key features, benefits, use cases

### 8. Review - Customer testimonials as Review entities

### 9. Brand - Brand identity, logo, slogan

### 10. OfferCatalog - Comprehensive catalog

### 11. ImageObject - Badges, awards, trust markers

## Three-Level Analysis:
- **WORD LEVEL**: Company/product names, pricing, statistics, trust indicators
- **PHRASE LEVEL**: Value propositions, features, competitive advantages
- **CLAUSE LEVEL**: Business ecosystem, product relationships, customer journey

URL: ${input.url}
Title: ${input.title}

CONTENT:
${plainText}

Return ONLY a valid JSON-LD with @graph array including Organization, WebSite, SoftwareApplication entities, and all supporting schema types.`;
  }
  
  const isToolPageType = isToolPage(input);
  
  if (isToolPageType) {
    return `You are an advanced schema markup generator for TOOL/UTILITY pages based on US Patent 9152623B2.

## Page Type Detection:
This is an interactive TOOL/UTILITY page. Prioritize schema types that emphasize functionality and user actions.

## Required Schema Types for Tool Pages:

### 1. WebApplication (PRIMARY)
- name, alternateName, description
- applicationCategory, applicationSubCategory
- operatingSystem, browserRequirements
- featureList (detailed array of capabilities)
- offers (price: 0 for free tools)
- potentialAction (UseAction with EntryPoint)
- isAccessibleForFree: true
- serviceType, audience (target users)

### 2. HowTo (USAGE INSTRUCTIONS)
- Step-by-step guide to using the tool
- Include tool requirements, time/cost estimates

### 3. FAQPage (COMMON QUESTIONS)
- Technical questions about the tool
- Usage scenarios, compatibility questions, troubleshooting

### 4. WebPage (PAGE METADATA)
- Breadcrumb navigation
- mainEntity pointing to WebApplication
- speakable content for voice search

### 5. DefinedTermSet (TECHNICAL GLOSSARY)
- Define technical terms used in tool
- Feature definitions

### 6. ItemList (USE CASES)
- List practical applications
- Real-world scenarios, integration examples

## Three-Level Analysis:
- **WORD LEVEL**: Feature extraction, technical terms, integration points
- **PHRASE LEVEL**: User workflows, configuration options, use case scenarios
- **CLAUSE LEVEL**: Tool ecosystem, related tools, user journey

URL: ${input.url}
Title: ${input.title}
Category: ${input.category || 'Tool'}
Date Published: ${input.datePublished}

CONTENT:
${plainText}

Return ONLY a valid JSON-LD with @graph array for WebApplication and supporting schema types.`;
  }
  
  // Default: Article-based schema prompt
  return `You are an advanced schema markup generator based on US Patent 9152623B2 - Natural Language Processing System.

Your task is to analyze the provided blog post content and generate comprehensive JSON-LD schema markup following these principles:

## Patent-Based Three-Level Analysis:

### Level 1: WORD LEVEL - Entity Identification
- Identify key terminology, concepts, and defined terms
- Extract proper nouns, technical terms, acronyms
- Create DefinedTerm entities for each significant concept
- Link entities to external knowledge bases (Wikipedia, Wikidata) using sameAs

### Level 2: PHRASE LEVEL - Relationship Mapping
- Identify main topics and subtopics
- Determine relationships between concepts (about, mentions, isPartOf)
- Extract procedural knowledge (HowTo steps)
- Identify comparative elements (tables, lists, comparisons)

### Level 3: CLAUSE LEVEL - Complete Knowledge Structure
- Map overall article structure and hierarchy
- Establish connections between all entities
- Create FAQ structures from questions in content
- Build comprehensive knowledge graph

## Required Schema Types to Include:
1. **Article** (primary content) - Include: headline, description, author, publisher, datePublished, about, mentions, citation, hasPart
2. **FAQPage** (if Q&A content exists) - Extract all questions and answers
3. **HowTo** (if instructional content exists) - Break down processes into steps
4. **DefinedTermSet** (glossary of terms) - Create definitions for all key terms
5. **ItemList** (for lists and enumerations) - Structure all bullet points and numbered lists
6. **WebPage** (page-level metadata) - Include breadcrumbs and speakable content
7. **Additional Types** (context-dependent) - ComparisonTable, Course, ClaimReview, Organization/Person entities

## Schema Generation Rules:
1. **Entity Linking**: Every significant entity should have an @id and be referenced throughout
2. **Semantic Relationships**: Use about/mentions/teaches/isPartOf to connect entities
3. **External References**: Include sameAs links to Wikipedia/Wikidata when applicable
4. **Hierarchical Structure**: Use @graph for multiple top-level entities
5. **Bidirectional Links**: Reference parent entities from child entities
6. **Rich Metadata**: Include images, citations, alternative names
7. **Accessibility**: Add speakable selectors for voice search
8. **Actionability**: Include potentialAction for user interactions

URL: ${input.url}
Title: ${input.title}
Category: ${input.category || 'General'}
Date Published: ${input.datePublished}
Date Modified: ${input.dateModified}

CONTENT:
${plainText}

Return ONLY a valid JSON object (no markdown, no code blocks) with proper @context, @graph, and all schema types identified through the three-level analysis.`;
}

export async function analyzeContent(input: SchemaGenerationInput): Promise<ContentAnalysis | null> {
  const claude = getClaudeAPI();
  
  if (!claude.isConfigured()) {
    console.log('⚠️  Claude not configured, skipping content analysis for:', input.url);
    return null;
  }
  
  console.log('🔍 Analyzing content for schema generation:', input.url);

  // Strip HTML tags for analysis (keep structure)
  const plainText = input.content
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<style[^>]*>.*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 15000); // Limit for token optimization

  const systemPrompt = `You are an advanced schema markup generator based on US Patent 9152623B2 - Natural Language Processing System.

Your task is to analyze the provided blog post content and generate comprehensive JSON-LD schema markup.

Return ONLY valid JSON with no markdown formatting or explanations.`;

  const prompt = getSchemaPrompt(input, plainText);

  try {
    const response = await claude.sendMessage(prompt, systemPrompt, {
      maxTokens: 4096,
      temperature: 0.2, // Low temperature for consistent structured output
    });

    // Parse the JSON response
    const cleaned = response.trim().replace(/```json\n?/g, '').replace(/```\n?/g, '');
    const analysis: ContentAnalysis = JSON.parse(cleaned);
    console.log('✅ Content analysis complete:', input.url, '- Type:', analysis.contentType);
    
    return analysis;
  } catch (error) {
    console.error('❌ Content analysis failed:', error);
    return null;
  }
}

export async function generateSchemaOrg(input: SchemaGenerationInput): Promise<object | null> {
  // 🔥 Check cache first - only regenerate if content changed
  const cachedSchema = await getCachedSchema(
    input.url,
    input.dateModified,
    input.content
  );
  
  if (cachedSchema) {
    return cachedSchema; // ✅ Using cached schema - no API call needed!
  }
  
  // Skip LLM schema generation if disabled OR if building on Vercel without cache
  // This prevents build failures when schema hasn't been pre-generated locally
  const isVercelBuild = process.env.VERCEL === '1';
  const schemaDisabled = process.env.DISABLE_SCHEMA_GENERATION === 'true';
  
  if (schemaDisabled || (isVercelBuild && !cachedSchema)) {
    if (isVercelBuild) {
      console.log('⏭️  Vercel build detected with no cache - using basic schema (generate locally first)');
    } else {
      console.log('⏭️  Schema generation disabled via env var, using basic schema');
    }
    return generateBasicArticleSchema(input);
  }
  
  console.log('🆕 Generating new schema (not in cache or content changed)');
  
  // Use direct JSON-LD generation for homepage, tool pages, blog posts, and support docs
  if (isHomepage(input) || isToolPage(input) || isBlogPost(input) || isSupportDocsPage(input)) {
    const claude = getClaudeAPI();
    
    if (!claude.isConfigured()) {
      console.log('⚠️  Claude not configured, using basic schema');
      return generateBasicArticleSchema(input);
    }
    
    const plainText = input.content
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/<style[^>]*>.*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 15000);
    
    const systemPrompt = `You are an advanced schema markup generator based on US Patent 9152623B2. Return ONLY valid JSON-LD with no markdown formatting.`;
    const prompt = getSchemaPrompt(input, plainText);
    
    try {
      const response = await claude.sendMessage(prompt, systemPrompt, {
        maxTokens: 4096,
        temperature: 0.2,
      });
      
      const cleaned = response.trim().replace(/```json\n?/g, '').replace(/```\n?/g, '');
      const schema = JSON.parse(cleaned);
      
      // Cache the generated schema (correct parameter order: url, schema, contentModified, content)
      await setCachedSchema(input.url, schema, input.dateModified, plainText);
      
      return schema;
    } catch (error) {
      console.error('❌ Direct schema generation failed:', error);
      return generateBasicArticleSchema(input);
    }
  }
  
  // For blog posts and regular pages, use the old analysis-based approach
  const analysis = await analyzeContent(input);
  
  if (!analysis) {
    // Return basic Article schema as fallback
    return generateBasicArticleSchema(input);
  }

  // Build the schema graph based on analysis
  const schemaGraph: any[] = [];

  // 1. Main Article/HowTo schema
  if (analysis.contentType === 'howto' && analysis.steps.length > 0) {
    schemaGraph.push(buildHowToSchema(input, analysis));
  } else {
    schemaGraph.push(buildArticleSchema(input, analysis));
  }

  // 2. FAQPage schema if questions found
  if (analysis.questions?.length > 0) {
    schemaGraph.push(buildFAQSchema(input, analysis));
  }

  // 3. DefinedTerm schemas for key concepts
  if (analysis.definitions?.length > 0) {
    analysis.definitions.forEach((def, index) => {
      schemaGraph.push(buildDefinedTermSchema(input, def, index));
    });
  }

  // 4. WebPage schema with breadcrumbs
  schemaGraph.push(buildWebPageSchema(input));

  // 5. Organization schema
  schemaGraph.push(buildOrganizationSchema(input.siteInfo));

  const schema = {
    '@context': 'https://schema.org',
    '@graph': schemaGraph,
  };
  
  // 🔥 NEW: Cache the generated schema for future builds
  await setCachedSchema(
    input.url,
    schema,
    input.dateModified,
    input.content
  );
  
  return schema;
}

function buildArticleSchema(input: SchemaGenerationInput, analysis: ContentAnalysis): object {
  return {
    '@type': 'Article',
    '@id': `${input.url}#article`,
    headline: input.title,
    description: input.excerpt || (analysis.mainEntities?.length ? `Learn about ${analysis.mainEntities.map(e => e.name).join(', ')}` : input.title),
    image: input.featuredImage ? {
      '@type': 'ImageObject',
      url: input.featuredImage.url,
      width: input.featuredImage.width,
      height: input.featuredImage.height,
    } : undefined,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    author: input.author ? {
      '@type': 'Person',
      name: input.author,
    } : undefined,
    publisher: {
      '@type': 'Organization',
      '@id': `${input.siteInfo.url}/#organization`,
      name: input.siteInfo.name,
      logo: {
        '@type': 'ImageObject',
        url: input.siteInfo.logoUrl,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': input.url,
    },
    articleSection: input.category,
    keywords: analysis.keywords?.join(', ') || input.category,
    about: analysis.mainEntities?.map(entity => ({
      '@type': entity.type,
      name: entity.name,
      description: entity.description,
    })),
    timeRequired: analysis.estimatedReadTime || 'PT5M',
  };
}

function buildHowToSchema(input: SchemaGenerationInput, analysis: ContentAnalysis): object {
  return {
    '@type': 'HowTo',
    '@id': `${input.url}#howto`,
    name: input.title,
    description: input.excerpt || '',
    image: input.featuredImage?.url,
    totalTime: analysis.estimatedReadTime || 'PT5M',
    step: analysis.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

function buildFAQSchema(input: SchemaGenerationInput, analysis: ContentAnalysis): object {
  return {
    '@type': 'FAQPage',
    '@id': `${input.url}#faq`,
    mainEntity: analysis.questions.map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };
}

function buildDefinedTermSchema(input: SchemaGenerationInput, definition: { term: string; definition: string }, index: number): object {
  return {
    '@type': 'DefinedTerm',
    '@id': `${input.url}#term-${index}`,
    name: definition.term,
    description: definition.definition,
  };
}

function buildWebPageSchema(input: SchemaGenerationInput): object {
  return {
    '@type': 'WebPage',
    '@id': input.url,
    url: input.url,
    name: input.title,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${input.siteInfo.url}/#website`,
    },
    breadcrumb: input.breadcrumbs ? {
      '@type': 'BreadcrumbList',
      itemListElement: input.breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url,
      })),
    } : undefined,
  };
}

function buildOrganizationSchema(siteInfo: { name: string; url: string; logoUrl: string }): object {
  return {
    '@type': 'Organization',
    '@id': `${siteInfo.url}/#organization`,
    name: siteInfo.name,
    url: siteInfo.url,
    logo: {
      '@type': 'ImageObject',
      url: siteInfo.logoUrl,
    },
  };
}

function generateBasicArticleSchema(input: SchemaGenerationInput): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.excerpt,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    author: input.author ? {
      '@type': 'Person',
      name: input.author,
    } : undefined,
    publisher: {
      '@type': 'Organization',
      name: input.siteInfo.name,
      logo: {
        '@type': 'ImageObject',
        url: input.siteInfo.logoUrl,
      },
    },
  };
}

