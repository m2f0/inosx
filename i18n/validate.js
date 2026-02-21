#!/usr/bin/env node

/**
 * INOSX i18n Validation Tool
 * 
 * Validates that:
 * - All JSON translation files have the same structure and keys
 * - All data-i18n keys used in HTML exist in JSON files
 * - No empty or null values in translations
 * - Data types are correct (all values are strings)
 * 
 * Designed for CI/CD integration with proper exit codes
 */

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

class I18nValidator {
  constructor(options = {}) {
    this.options = {
      verbose: options.verbose || false,
      format: options.format || 'console',
      file: options.file || null,
      jsonOnly: options.jsonOnly || false,
      htmlOnly: options.htmlOnly || false,
      strict: options.strict || false,
      changedOnly: options.changedOnly || false
    };
    
    this.errors = [];
    this.warnings = [];
    this.hasErrors = false;
    
    this.htmlFiles = [
      'index.html',
      'surveyflow.html',
      'messiax.html',
      'roi-calculator.html',
      'terms.html'
    ];
    
    this.jsonFiles = {
      en: 'i18n/en.json',
      pt: 'i18n/pt.json',
      es: 'i18n/es.json'
    };
    
    this.translations = {};
    this.usedKeys = new Set();
  }
  
  log(message, level = 'info') {
    if (this.options.verbose) {
      console.log(`[${level.toUpperCase()}] ${message}`);
    }
  }
  
  addError(category, message, file = '', suggestion = '') {
    this.errors.push({ category, message, file, suggestion });
    this.hasErrors = true;
  }
  
  addWarning(category, message, file = '', suggestion = '') {
    this.warnings.push({ category, message, file, suggestion });
    
    // In strict mode, treat warnings as errors
    if (this.options.strict) {
      this.hasErrors = true;
    }
  }
  
  async run() {
    this.log('Starting i18n validation...', 'info');
    
    try {
      // Load JSON translation files
      await this.loadTranslations();
      
      // Validate based on options
      if (!this.options.htmlOnly) {
        await this.validateJsonStructure();
        await this.validateJsonCompleteness();
        await this.validateJsonValues();
        await this.validateDataTypes();
      }
      
      if (!this.options.jsonOnly) {
        await this.validateHtmlJsonMapping();
      }
      
      // Output results
      await this.outputResults();
      
      const exitCode = this.hasErrors ? 1 : 0;
      this.log(`Validation ${this.hasErrors ? 'FAILED' : 'PASSED'}`, this.hasErrors ? 'error' : 'info');
      
      return exitCode;
    } catch (error) {
      console.error(`Validation error: ${error.message}`);
      console.error(error.stack);
      return 1;
    }
  }
  
  async loadTranslations() {
    this.log('Loading translation files...', 'debug');
    
    for (const [lang, filePath] of Object.entries(this.jsonFiles)) {
      try {
        if (!fs.existsSync(filePath)) {
          this.addError('file_missing', `Translation file not found: ${filePath}`, filePath);
          continue;
        }
        
        const content = fs.readFileSync(filePath, 'utf8');
        this.translations[lang] = JSON.parse(content);
        this.log(`Loaded ${lang}.json`, 'debug');
      } catch (error) {
        this.addError('parse_error', `Failed to parse ${filePath}: ${error.message}`, filePath);
      }
    }
  }
  
  async validateJsonStructure() {
    this.log('Validating JSON structure consistency...', 'debug');
    
    // Task 3.3: Check nested structure consistency
    const checkStructure = (path, en, pt, es) => {
      const enType = typeof en;
      const ptType = typeof pt;
      const esType = typeof es;
      
      if (enType !== ptType || enType !== esType) {
        const keyPath = path.join('.');
        this.addError(
          'structure_mismatch',
          `Structure mismatch at "${keyPath}": en=${enType}, pt=${ptType}, es=${esType}`,
          'i18n/*.json',
          'Ensure all languages have the same structure (object vs string) for this key'
        );
        return;
      }
      
      if (enType === 'object' && en !== null) {
        const enKeys = Object.keys(en);
        const ptKeys = Object.keys(pt || {});
        const esKeys = Object.keys(es || {});
        
        const allKeys = new Set([...enKeys, ...ptKeys, ...esKeys]);
        
        for (const key of allKeys) {
          checkStructure(
            [...path, key],
            en[key],
            (pt || {})[key],
            (es || {})[key]
          );
        }
      }
    };
    
    checkStructure([], this.translations.en, this.translations.pt, this.translations.es);
  }
  
  async validateJsonCompleteness() {
    this.log('Validating JSON completeness...', 'debug');
    
    // Task 3.2: Check that all languages have same keys
    const keysByLang = {};
    for (const [lang, translations] of Object.entries(this.translations)) {
      keysByLang[lang] = new Set(this.getAllKeysFromObject(translations));
    }
    
    const allLanguages = Object.keys(this.translations);
    
    // Compare each pair of languages
    for (let i = 0; i < allLanguages.length; i++) {
      for (let j = i + 1; j < allLanguages.length; j++) {
        const lang1 = allLanguages[i];
        const lang2 = allLanguages[j];
        
        // Keys in lang1 but not in lang2
        for (const key of keysByLang[lang1]) {
          if (!keysByLang[lang2].has(key)) {
            this.addError(
              'missing_key',
              `Key "${key}" exists in ${lang1}.json but missing in ${lang2}.json`,
              this.jsonFiles[lang2],
              `Add "${key}" to ${lang2}.json with appropriate translation`
            );
          }
        }
        
        // Keys in lang2 but not in lang1
        for (const key of keysByLang[lang2]) {
          if (!keysByLang[lang1].has(key)) {
            this.addError(
              'missing_key',
              `Key "${key}" exists in ${lang2}.json but missing in ${lang1}.json`,
              this.jsonFiles[lang1],
              `Add "${key}" to ${lang1}.json with appropriate translation`
            );
          }
        }
      }
    }
  }
  
  async validateJsonValues() {
    this.log('Validating JSON values...', 'debug');
    
    // Task 3.4: Check for empty, null, or undefined values
    for (const [lang, translations] of Object.entries(this.translations)) {
      const checkValues = (obj, path = []) => {
        for (const [key, value] of Object.entries(obj)) {
          const currentPath = [...path, key];
          const keyPath = currentPath.join('.');
          
          if (value === null || value === undefined) {
            this.addError(
              'empty_value',
              `Key "${keyPath}" has null/undefined value in ${lang}.json`,
              this.jsonFiles[lang],
              'Provide a translation value for this key'
            );
          } else if (typeof value === 'string' && value.trim() === '') {
            this.addError(
              'empty_value',
              `Key "${keyPath}" has empty string value in ${lang}.json`,
              this.jsonFiles[lang],
              'Provide a translation value for this key'
            );
          } else if (typeof value === 'object' && value !== null) {
            checkValues(value, currentPath);
          }
        }
      };
      
      checkValues(translations);
    }
  }
  
  async validateDataTypes() {
    this.log('Validating data types...', 'debug');
    
    // Task 3.7: Check that all leaf values are strings
    for (const [lang, translations] of Object.entries(this.translations)) {
      const checkTypes = (obj, path = []) => {
        for (const [key, value] of Object.entries(obj)) {
          const currentPath = [...path, key];
          const keyPath = currentPath.join('.');
          
          if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            checkTypes(value, currentPath);
          } else if (value !== null && value !== undefined) {
            // Check if it's a string
            if (typeof value !== 'string') {
              this.addError(
                'invalid_type',
                `Key "${keyPath}" in ${lang}.json has type "${typeof value}" instead of string`,
                this.jsonFiles[lang],
                `Change value to a string. Current value: ${JSON.stringify(value)}`
              );
            }
          }
        }
      };
      
      checkTypes(translations);
    }
  }
  
  async validateHtmlJsonMapping() {
    this.log('Validating HTML-JSON mapping...', 'debug');
    
    // Task 3.5 & 3.6: Check if HTML keys exist in JSON
    const filesToCheck = this.options.file 
      ? [this.options.file]
      : this.htmlFiles;
    
    for (const file of filesToCheck) {
      if (!fs.existsSync(file)) {
        this.log(`Skipping ${file} (not found)`, 'debug');
        continue;
      }
      
      try {
        const html = fs.readFileSync(file, 'utf8');
        const $ = cheerio.load(html);
        
        // Collect all data-i18n keys
        const attributes = ['data-i18n', 'data-i18n-placeholder', 'data-i18n-title', 'data-i18n-aria-label'];
        
        for (const attr of attributes) {
          $(`[${attr}]`).each((i, elem) => {
            const key = $(elem).attr(attr);
            if (!key || !key.trim()) return;
            
            const trimmedKey = key.trim();
            const keyPath = trimmedKey.split('.');
            
            // Check if key exists in all JSON files
            for (const [lang, translations] of Object.entries(this.translations)) {
              const exists = this.keyExistsInTranslations(keyPath, translations);
              
              if (!exists) {
                this.addError(
                  'missing_translation',
                  `Key "${trimmedKey}" used in ${file} but missing in ${lang}.json`,
                  this.jsonFiles[lang],
                  `Add "${trimmedKey}" to ${lang}.json with appropriate translation`
                );
              }
            }
          });
        }
      } catch (error) {
        this.addError(
          'html_parse_error',
          `Failed to parse ${file}: ${error.message}`,
          file,
          'Check HTML syntax'
        );
      }
    }
  }
  
  // Helper methods
  keyExistsInTranslations(keyPath, translations) {
    let current = translations;
    for (const part of keyPath) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        return false;
      }
    }
    return true;
  }
  
  getAllKeysFromObject(obj, prefix = '') {
    const keys = [];
    
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        keys.push(...this.getAllKeysFromObject(value, fullKey));
      } else {
        keys.push(fullKey);
      }
    }
    
    return keys;
  }
  
  async outputResults() {
    if (this.options.format === 'json') {
      this.outputJson();
    } else {
      this.outputConsole();
    }
  }
  
  outputConsole() {
    // Color codes for terminal
    const colors = {
      red: '\x1b[31m',
      yellow: '\x1b[33m',
      green: '\x1b[32m',
      reset: '\x1b[0m',
      bold: '\x1b[1m'
    };
    
    console.log('\n' + colors.bold + '='.repeat(60) + colors.reset);
    console.log(colors.bold + 'i18n Validation Results' + colors.reset);
    console.log(colors.bold + '='.repeat(60) + colors.reset + '\n');
    
    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log(colors.green + '✓ All translations are complete and valid!' + colors.reset);
      console.log();
      return;
    }
    
    // Display errors
    if (this.errors.length > 0) {
      console.log(colors.red + colors.bold + `✗ ${this.errors.length} Error(s) Found` + colors.reset);
      console.log();
      
      // Group errors by category
      const errorsByCategory = this.groupBy(this.errors, 'category');
      
      for (const [category, errors] of Object.entries(errorsByCategory)) {
        console.log(colors.red + `  ${category} (${errors.length})` + colors.reset);
        
        for (const error of errors.slice(0, 5)) {
          console.log(`    ${colors.red}✗${colors.reset} ${error.message}`);
          if (error.file) {
            console.log(`      File: ${error.file}`);
          }
          if (error.suggestion && this.options.verbose) {
            console.log(`      ${colors.yellow}→${colors.reset} ${error.suggestion}`);
          }
        }
        
        if (errors.length > 5) {
          console.log(`    ... and ${errors.length - 5} more`);
        }
        console.log();
      }
    }
    
    // Display warnings
    if (this.warnings.length > 0) {
      console.log(colors.yellow + colors.bold + `⚠ ${this.warnings.length} Warning(s) Found` + colors.reset);
      console.log();
      
      if (this.options.verbose) {
        for (const warning of this.warnings.slice(0, 10)) {
          console.log(`  ${colors.yellow}⚠${colors.reset} ${warning.message}`);
        }
        
        if (this.warnings.length > 10) {
          console.log(`  ... and ${this.warnings.length - 10} more`);
        }
      } else {
        console.log(`  Use --verbose to see details`);
      }
      console.log();
    }
    
    console.log(colors.bold + '='.repeat(60) + colors.reset + '\n');
  }
  
  outputJson() {
    const result = {
      success: !this.hasErrors,
      errors: this.errors,
      warnings: this.warnings,
      summary: {
        errorCount: this.errors.length,
        warningCount: this.warnings.length,
        filesChecked: this.options.jsonOnly ? Object.keys(this.jsonFiles).length : 
                     this.options.htmlOnly ? this.htmlFiles.length :
                     Object.keys(this.jsonFiles).length + this.htmlFiles.length
      }
    };
    
    console.log(JSON.stringify(result, null, 2));
  }
  
  groupBy(array, key) {
    return array.reduce((result, item) => {
      const group = item[key];
      if (!result[group]) {
        result[group] = [];
      }
      result[group].push(item);
      return result;
    }, {});
  }
}

// CLI Entry Point
if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {};
  
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--verbose') {
      options.verbose = true;
    } else if (args[i].startsWith('--format=')) {
      options.format = args[i].split('=')[1];
    } else if (args[i].startsWith('--file=')) {
      options.file = args[i].split('=')[1];
    } else if (args[i] === '--json-only') {
      options.jsonOnly = true;
    } else if (args[i] === '--html-only') {
      options.htmlOnly = true;
    } else if (args[i] === '--strict') {
      options.strict = true;
    } else if (args[i] === '--changed-only') {
      options.changedOnly = true;
    } else if (args[i] === '--help') {
      console.log(`
INOSX i18n Validation Tool

Usage: node i18n/validate.js [options]

Options:
  --file=<filename>       Validate specific HTML file only
  --format=<format>       Output format: console (default) or json
  --json-only             Validate only JSON structure and consistency
  --html-only             Validate only HTML-JSON mapping
  --verbose               Enable verbose logging and detailed errors
  --strict                Treat warnings as errors (fail validation)
  --changed-only          Only validate changed files (via git diff)
  --help                  Show this help message

Exit Codes:
  0 - All validations passed
  1 - Validation failed (errors found)

Examples:
  node i18n/validate.js
  node i18n/validate.js --json-only
  node i18n/validate.js --format=json --strict
  node i18n/validate.js --file=index.html --verbose
      `);
      process.exit(0);
    }
  }
  
  const validator = new I18nValidator(options);
  validator.run().then(exitCode => process.exit(exitCode));
}

module.exports = I18nValidator;
