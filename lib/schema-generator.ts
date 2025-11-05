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

// Detect if a page is a tool/utility page based on URL and content
function isToolPage(input: SchemaGenerationInput): boolean {
  const toolKeywords = ['tool', 'generator', 'calculator', 'utility', 'converter', 'checker'];
  const urlLower = input.url.toLowerCase();
  const titleLower = input.title.toLowerCase();
  
  return toolKeywords.some(keyword => 
    urlLower.includes(keyword) || titleLower.includes(keyword)
  );
}

// Detect if this is the homepage
function isHomepage(input: SchemaGenerationInput): boolean {
  const url = input.url.toLowerCase();
  return url === 'https://optizenapp.com' || url === 'https://optizenapp.com/';
}

// Get appropriate prompt based on page type
function getSchemaPrompt(input: SchemaGenerationInput, plainText: string): string {
  // Check for homepage first
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

