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

  const systemPrompt = `You are an expert at analyzing web content and extracting structured data for schema.org markup.
Analyze the provided content and return ONLY valid JSON with no markdown formatting or explanations.`;

  const prompt = `Analyze this web content and extract structured data for schema.org:

URL: ${input.url}
Title: ${input.title}
Content Type: Determine if this is an article, how-to guide, FAQ, definition, comparison, or documentation
Category: ${input.category || 'General'}

CONTENT:
${plainText}

Return ONLY a valid JSON object (no markdown, no code blocks) with this EXACT structure:
{
  "contentType": "article|howto|faq|definition|comparison|guide|documentation",
  "mainEntities": [
    {"name": "EntityName", "type": "Thing|Product|Concept", "description": "Brief description"}
  ],
  "questions": [
    {"question": "Extracted question?", "answer": "Extracted answer"}
  ],
  "steps": [
    {"name": "Step name", "text": "Step description"}
  ],
  "definitions": [
    {"term": "Term", "definition": "Definition"}
  ],
  "keywords": ["keyword1", "keyword2"],
  "estimatedReadTime": "PT15M",
  "hasTables": true,
  "hasImages": true,
  "hasComparisons": true
}

Rules:
- Extract ALL FAQ questions found in the content
- Identify step-by-step instructions if present
- Extract key terms and their definitions
- Identify main entities (products, concepts, people, organizations)
- Return 5-10 relevant keywords
- Calculate read time in ISO 8601 duration format (PT15M = 15 minutes)
- Detect if content has tables, images, or comparisons

Return ONLY the JSON, nothing else.`;

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
  // Skip LLM schema generation if disabled (useful for faster builds)
  if (process.env.DISABLE_SCHEMA_GENERATION === 'true') {
    console.log('⏭️  Schema generation disabled via env var, using basic schema');
    return generateBasicArticleSchema(input);
  }
  
  // 🔥 NEW: Check cache first - only regenerate if content changed
  const cachedSchema = await getCachedSchema(
    input.url,
    input.dateModified,
    input.content
  );
  
  if (cachedSchema) {
    return cachedSchema; // ✅ Using cached schema - no API call needed!
  }
  
  console.log('🆕 Generating new schema (not in cache or content changed)');
  
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
  if (analysis.questions.length > 0) {
    schemaGraph.push(buildFAQSchema(input, analysis));
  }

  // 3. DefinedTerm schemas for key concepts
  if (analysis.definitions.length > 0) {
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
    description: input.excerpt || `Learn about ${analysis.mainEntities.map(e => e.name).join(', ')}`,
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
    keywords: analysis.keywords.join(', '),
    about: analysis.mainEntities.map(entity => ({
      '@type': entity.type,
      name: entity.name,
      description: entity.description,
    })),
    timeRequired: analysis.estimatedReadTime,
  };
}

function buildHowToSchema(input: SchemaGenerationInput, analysis: ContentAnalysis): object {
  return {
    '@type': 'HowTo',
    '@id': `${input.url}#howto`,
    name: input.title,
    description: input.excerpt || '',
    image: input.featuredImage?.url,
    totalTime: analysis.estimatedReadTime,
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

