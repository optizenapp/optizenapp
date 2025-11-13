/**
 * Fix schema errors:
 * 1. Remove invalid teaches property from VideoObject (HowTo is not valid target)
 * 2. Remove invalid .video-description CSS selector from speakable
 * 
 * Usage:
 *   npx tsx scripts/fix-schema-errors.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const CACHE_DIR = path.join(process.cwd(), '.schema-cache');

// Build a map of @id -> @type for the entire schema
function buildIdTypeMap(schema: any): Map<string, string> {
  const idTypeMap = new Map<string, string>();
  
  function traverse(obj: any): void {
    if (!obj || typeof obj !== 'object') return;
    
    // If object has @id and @type, add to map
    if (obj['@id'] && obj['@type']) {
      idTypeMap.set(obj['@id'], obj['@type']);
    }
    
    // Recursively check all properties
    for (const value of Object.values(obj)) {
      if (Array.isArray(value)) {
        value.forEach(item => traverse(item));
      } else if (value && typeof value === 'object') {
        traverse(value);
      }
    }
  }
  
  traverse(schema);
  return idTypeMap;
}

function fixTeachesProperty(obj: any, idTypeMap: Map<string, string>, schemaType: string): boolean {
  let modified = false;
  
  if (!obj.teaches) return false;
  
  const teachesValue = obj.teaches;
  
  // Check if teaches references HowTo
  let referencesHowTo = false;
  
  if (typeof teachesValue === 'string') {
    // String URL ending with #howto
    if (teachesValue.includes('#howto') || teachesValue.includes('HowTo')) {
      referencesHowTo = true;
    }
  } else if (Array.isArray(teachesValue)) {
    // Array of objects or strings
    for (const item of teachesValue) {
      if (typeof item === 'string' && (item.includes('#howto') || item.includes('HowTo'))) {
        referencesHowTo = true;
        break;
      } else if (item && typeof item === 'object' && item['@id']) {
        // Check if @id resolves to HowTo
        const referencedType = idTypeMap.get(item['@id']);
        if (referencedType === 'HowTo') {
          referencesHowTo = true;
          break;
        }
      }
    }
  } else if (teachesValue && typeof teachesValue === 'object') {
    // Single object with @id
    if (teachesValue['@id']) {
      const referencedType = idTypeMap.get(teachesValue['@id']);
      if (referencedType === 'HowTo') {
        referencesHowTo = true;
      }
    }
  }
  
  // Remove teaches if it references HowTo
  // Schema.org: teaches should reference DefinedTerm, Course, or string learning outcomes
  // HowTo is NOT a valid target for teaches property
  if (referencesHowTo) {
    delete obj.teaches;
    modified = true;
  }
  
  return modified;
}

function fixSpeakableCssSelector(obj: any): boolean {
  let modified = false;
  
  if (obj.speakable && obj.speakable.cssSelector && Array.isArray(obj.speakable.cssSelector)) {
    // Remove .video-description selector
    const originalLength = obj.speakable.cssSelector.length;
    obj.speakable.cssSelector = obj.speakable.cssSelector.filter((selector: string) => 
      selector !== '.video-description'
    );
    
    if (obj.speakable.cssSelector.length < originalLength) {
      modified = true;
    }
    
    // If no selectors left, remove speakable entirely or keep at least h1
    if (obj.speakable.cssSelector.length === 0) {
      // Keep at least h1 for speakable
      obj.speakable.cssSelector = ['h1'];
    }
  }
  
  return modified;
}

function traverseAndFix(obj: any, idTypeMap: Map<string, string>, path: string[] = []): boolean {
  let modified = false;
  
  if (!obj || typeof obj !== 'object') return false;
  
  const schemaType = obj['@type'] || '';
  
  // Fix teaches property for VideoObject (and potentially other types)
  if (obj.teaches) {
    if (fixTeachesProperty(obj, idTypeMap, schemaType)) {
      modified = true;
    }
  }
  
  // Fix speakable cssSelector
  if (obj.speakable) {
    if (fixSpeakableCssSelector(obj)) {
      modified = true;
    }
  }
  
  // Recursively check all properties
  for (const [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (traverseAndFix(item, idTypeMap, [...path, key, index.toString()])) {
          modified = true;
        }
      });
    } else if (value && typeof value === 'object') {
      if (traverseAndFix(value, idTypeMap, [...path, key])) {
        modified = true;
      }
    }
  }
  
  return modified;
}

async function fixSchemaErrors() {
  console.log('🔍 Scanning schema cache files for errors...\n');
  
  if (!fs.existsSync(CACHE_DIR)) {
    console.error('❌ Schema cache directory not found:', CACHE_DIR);
    process.exit(1);
  }
  
  const files = fs.readdirSync(CACHE_DIR).filter(f => f.endsWith('.json'));
  console.log(`📁 Found ${files.length} schema cache files\n`);
  
  let fixedTeachesCount = 0;
  let fixedCssSelectorCount = 0;
  const fixedFiles: string[] = [];
  
  for (const file of files) {
    const filePath = path.join(CACHE_DIR, file);
    
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const cached = JSON.parse(content);
      const schema = cached.schema;
      
      if (!schema) continue;
      
      // Build @id -> @type map first
      const idTypeMap = buildIdTypeMap(schema);
      
      // Track original state
      const originalContent = JSON.stringify(schema);
      
      // Fix errors
      const modified = traverseAndFix(schema, idTypeMap);
      
      if (modified) {
        // Count fixes - check for teaches that reference HowTo
        const newContent = JSON.stringify(schema);
        // Count teaches properties that might reference HowTo
        let teachesMatches = 0;
        const teachesRegex = /"teaches"\s*:\s*\[?\s*\{?\s*"@id"\s*:\s*"[^"]*"/g;
        const matches = originalContent.match(teachesRegex) || [];
        // Check each match to see if it references HowTo
        for (const match of matches) {
          const idMatch = match.match(/"@id"\s*:\s*"([^"]*)"/);
          if (idMatch && idTypeMap.get(idMatch[1]) === 'HowTo') {
            teachesMatches++;
          }
        }
        // Also count string references
        teachesMatches += (originalContent.match(/"teaches"\s*:\s*"[^"]*#howto/gi) || []).length;
        const cssMatches = (originalContent.match(/\.video-description/gi) || []).length;
        
        fixedTeachesCount += teachesMatches;
        fixedCssSelectorCount += cssMatches;
        
        // Write back the modified schema
        fs.writeFileSync(filePath, JSON.stringify(cached, null, 2), 'utf-8');
        fixedFiles.push(file);
        
        console.log(`  ✅ Fixed errors in ${file}`);
        if (teachesMatches > 0) {
          console.log(`     - Removed ${teachesMatches} invalid teaches property(ies)`);
        }
        if (cssMatches > 0) {
          console.log(`     - Removed ${cssMatches} invalid .video-description selector(s)`);
        }
      }
      
    } catch (error: any) {
      console.error(`  ❌ Error processing ${file}:`, error.message);
    }
  }
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 SUMMARY');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Fixed invalid teaches properties: ${fixedTeachesCount}`);
  console.log(`Fixed invalid CSS selectors: ${fixedCssSelectorCount}`);
  console.log(`Files modified: ${fixedFiles.length}`);
  
  if (fixedFiles.length > 0) {
    console.log('\n📝 Modified files:');
    fixedFiles.forEach(f => console.log(`   - ${f}`));
    
    console.log('\n✅ Next steps:');
    console.log('   1. Review the changes: git diff .schema-cache/');
    console.log('   2. Commit: git add .schema-cache/');
    console.log('   3. Commit message: "Fix schema errors: remove invalid teaches and CSS selectors"');
    console.log('   4. Push: git push origin main');
  } else {
    console.log('\n✅ No fixes needed - all schemas are valid!');
  }
}

fixSchemaErrors().catch(console.error);

