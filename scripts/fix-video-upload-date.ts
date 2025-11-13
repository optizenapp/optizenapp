/**
 * Fix missing uploadDate field in VideoObject schemas
 * 
 * This script scans all schema cache files and adds the missing uploadDate
 * field to VideoObject entries that don't have it.
 * 
 * Usage:
 *   npx tsx scripts/fix-video-upload-date.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const CACHE_DIR = path.join(process.cwd(), '.schema-cache');

function findVideoObjectsInSchema(schema: any, articleDate?: string): Array<{ obj: any; path: string[] }> {
  const videoObjects: Array<{ obj: any; path: string[] }> = [];
  
  function traverse(obj: any, currentPath: string[] = []): void {
    if (!obj || typeof obj !== 'object') return;
    
    // Check if this is a VideoObject
    if (obj['@type'] === 'VideoObject') {
      videoObjects.push({ obj, path: currentPath });
    }
    
    // Recursively check all properties
    for (const [key, value] of Object.entries(obj)) {
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          traverse(item, [...currentPath, key, index.toString()]);
        });
      } else if (value && typeof value === 'object') {
        traverse(value, [...currentPath, key]);
      }
    }
  }
  
  traverse(schema);
  return videoObjects;
}

function getArticleDate(schema: any): string | null {
  // Try to find Article datePublished
  function findArticle(obj: any): any {
    if (!obj || typeof obj !== 'object') return null;
    
    if (obj['@type'] === 'Article' && obj.datePublished) {
      return obj.datePublished;
    }
    
    if (obj['@graph'] && Array.isArray(obj['@graph'])) {
      for (const item of obj['@graph']) {
        const result = findArticle(item);
        if (result) return result;
      }
    }
    
    for (const value of Object.values(obj)) {
      if (value && typeof value === 'object') {
        const result = findArticle(value);
        if (result) return result;
      }
    }
    
    return null;
  }
  
  return findArticle(schema);
}

function formatUploadDate(dateStr: string): string {
  // Convert to ISO date format (YYYY-MM-DD or YYYY-MM-DDTHH:mm:ssZ)
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    // Fallback to a reasonable default date
    return '2024-01-15';
  }
  
  // Return as YYYY-MM-DD format (most common format)
  return date.toISOString().split('T')[0];
}

async function fixVideoUploadDates() {
  console.log('🔍 Scanning schema cache files for VideoObject entries...\n');
  
  if (!fs.existsSync(CACHE_DIR)) {
    console.error('❌ Schema cache directory not found:', CACHE_DIR);
    process.exit(1);
  }
  
  const files = fs.readdirSync(CACHE_DIR).filter(f => f.endsWith('.json'));
  console.log(`📁 Found ${files.length} schema cache files\n`);
  
  let fixedCount = 0;
  let totalVideoObjects = 0;
  const fixedFiles: string[] = [];
  
  for (const file of files) {
    const filePath = path.join(CACHE_DIR, file);
    
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const cached = JSON.parse(content);
      const schema = cached.schema;
      
      if (!schema) continue;
      
      // Find Article datePublished for fallback
      const articleDate = getArticleDate(schema);
      
      // Find all VideoObject entries
      const videoObjects = findVideoObjectsInSchema(schema, articleDate || undefined);
      
      if (videoObjects.length === 0) continue;
      
      totalVideoObjects += videoObjects.length;
      let fileModified = false;
      
      for (const { obj } of videoObjects) {
        // Check if uploadDate is missing
        if (!obj.uploadDate) {
          // Use Article datePublished if available, otherwise use a default
          const uploadDate = articleDate 
            ? formatUploadDate(articleDate)
            : cached.contentModified 
              ? formatUploadDate(cached.contentModified)
              : '2024-01-15';
          
          obj.uploadDate = uploadDate;
          fileModified = true;
          fixedCount++;
          
          console.log(`  ✅ Fixed VideoObject in ${file}`);
          console.log(`     Added uploadDate: ${uploadDate}`);
        }
      }
      
      if (fileModified) {
        // Write back the modified schema
        fs.writeFileSync(filePath, JSON.stringify(cached, null, 2), 'utf-8');
        fixedFiles.push(file);
      }
      
    } catch (error: any) {
      console.error(`  ❌ Error processing ${file}:`, error.message);
    }
  }
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 SUMMARY');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Total VideoObject entries found: ${totalVideoObjects}`);
  console.log(`Fixed missing uploadDate: ${fixedCount}`);
  console.log(`Files modified: ${fixedFiles.length}`);
  
  if (fixedFiles.length > 0) {
    console.log('\n📝 Modified files:');
    fixedFiles.forEach(f => console.log(`   - ${f}`));
    
    console.log('\n✅ Next steps:');
    console.log('   1. Review the changes: git diff .schema-cache/');
    console.log('   2. Commit: git add .schema-cache/');
    console.log('   3. Commit message: "Fix missing uploadDate in VideoObject schemas"');
    console.log('   4. Push: git push origin main');
  } else {
    console.log('\n✅ No fixes needed - all VideoObject entries already have uploadDate!');
  }
}

fixVideoUploadDates().catch(console.error);

