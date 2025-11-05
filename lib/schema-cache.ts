/**
 * Schema Cache System
 * Stores generated schema.org JSON-LD to avoid regenerating for unchanged content
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Store cache in committed directory (not in .next which is gitignored)
const CACHE_DIR = path.join(process.cwd(), '.schema-cache');

export interface CachedSchema {
  schema: object;
  generatedAt: string; // ISO timestamp
  contentModified: string; // WordPress modified date
  contentHash: string; // Hash of content to detect changes
}

/**
 * Ensure cache directory exists
 */
function ensureCacheDir() {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
}

/**
 * Generate a cache key from URL
 */
function getCacheKey(url: string): string {
  return crypto.createHash('md5').update(url).digest('hex');
}

/**
 * Generate a hash of content to detect changes
 */
function hashContent(content: string): string {
  return crypto.createHash('md5').update(content).digest('hex');
}

/**
 * Get cached schema if it exists and is still valid
 */
export async function getCachedSchema(
  url: string,
  contentModified: string,
  content: string
): Promise<object | null> {
  try {
    ensureCacheDir();
    
    const cacheKey = getCacheKey(url);
    const cachePath = path.join(CACHE_DIR, `${cacheKey}.json`);
    
    if (!fs.existsSync(cachePath)) {
      console.log(`📦 No cache found for: ${url}`);
      return null;
    }
    
    const cached: CachedSchema = JSON.parse(fs.readFileSync(cachePath, 'utf-8'));
    
    // Check if content was modified since schema was generated
    const cachedDate = new Date(cached.contentModified);
    const currentDate = new Date(contentModified);
    
    if (currentDate > cachedDate) {
      console.log(`♻️  Content updated since cache: ${url}`);
      return null;
    }
    
    // Also check content hash (in case modified date wasn't updated)
    // Normalize content the same way schema-generator does before hashing
    const normalizedContent = content
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/<style[^>]*>.*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    const currentHash = hashContent(normalizedContent);
    if (cached.contentHash !== currentHash) {
      console.log(`♻️  Content hash changed: ${url}`);
      return null;
    }
    
    console.log(`✅ Using cached schema for: ${url}`);
    return cached.schema;
    
  } catch (error) {
    console.error(`❌ Error reading cache for ${url}:`, error);
    return null;
  }
}

/**
 * Save generated schema to cache
 */
export async function setCachedSchema(
  url: string,
  schema: object,
  contentModified: string,
  content: string
): Promise<void> {
  try {
    ensureCacheDir();
    
    const cacheKey = getCacheKey(url);
    const cachePath = path.join(CACHE_DIR, `${cacheKey}.json`);
    
    const cached: CachedSchema = {
      schema,
      generatedAt: new Date().toISOString(),
      contentModified,
      contentHash: hashContent(content),
    };
    
    fs.writeFileSync(cachePath, JSON.stringify(cached, null, 2), 'utf-8');
    console.log(`💾 Cached schema for: ${url}`);
    
  } catch (error) {
    console.error(`❌ Error caching schema for ${url}:`, error);
  }
}

/**
 * Clear all cached schema (useful for full regeneration)
 */
export async function clearSchemaCache(): Promise<void> {
  try {
    if (fs.existsSync(CACHE_DIR)) {
      fs.rmSync(CACHE_DIR, { recursive: true });
      console.log('🗑️  Schema cache cleared');
    }
  } catch (error) {
    console.error('❌ Error clearing cache:', error);
  }
}

/**
 * Get cache statistics
 */
export async function getCacheStats(): Promise<{
  totalCached: number;
  cacheSize: string;
  oldestCache: string | null;
  newestCache: string | null;
}> {
  try {
    ensureCacheDir();
    
    const files = fs.readdirSync(CACHE_DIR);
    const totalCached = files.length;
    
    if (totalCached === 0) {
      return {
        totalCached: 0,
        cacheSize: '0 KB',
        oldestCache: null,
        newestCache: null,
      };
    }
    
    // Calculate total size
    let totalSize = 0;
    let oldestDate = new Date();
    let newestDate = new Date(0);
    
    files.forEach(file => {
      const filePath = path.join(CACHE_DIR, file);
      const stats = fs.statSync(filePath);
      totalSize += stats.size;
      
      if (stats.mtime < oldestDate) oldestDate = stats.mtime;
      if (stats.mtime > newestDate) newestDate = stats.mtime;
    });
    
    return {
      totalCached,
      cacheSize: `${(totalSize / 1024).toFixed(2)} KB`,
      oldestCache: oldestDate.toISOString(),
      newestCache: newestDate.toISOString(),
    };
    
  } catch (error) {
    console.error('❌ Error getting cache stats:', error);
    return {
      totalCached: 0,
      cacheSize: '0 KB',
      oldestCache: null,
      newestCache: null,
    };
  }
}

