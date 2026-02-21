#!/usr/bin/env node

/**
 * INOSX i18n Audit Tool
 * 
 * Scans HTML files and JSON translation files to identify:
 * - HTML elements without data-i18n attributes that should be translated
 * - Missing translation keys in JSON files
 * - Inconsistencies between language files
 * - Unused translation keys
 */

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

class I18nAuditor {
  constructor(options = {}) {
    this.options = {
      verbose: options.verbose || false,
      format: options.format || 'both',
      file: options.file || null
    };
    
    this.problems = {
      critical: [],
      high: [],
      medium: [],
      low: []
    };
    
    this.stats = {
      totalProblems: 0,
      byFile: {},
      bySeverity: { critical: 0, high: 0, medium: 0, low: 0 }
    };
    
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
    if (this.options.verbose || level !== 'debug') {
      console.log(`[${level.toUpperCase()}] ${message}`);
    }
  }
  
  addProblem(severity, type, file, line, description, suggestion = '') {
    const problem = {
      severity,
      type,
      file,
      line,
      description,
      suggestion
    };
    
    this.problems[severity].push(problem);
    this.stats.totalProblems++;
    this.stats.bySeverity[severity]++;
    
    if (!this.stats.byFile[file]) {
      this.stats.byFile[file] = 0;
    }
    this.stats.byFile[file]++;
  }
  
  async run() {
    this.log('Starting i18n audit...', 'info');
    
    try {
      // Load JSON translation files
      await this.loadTranslations();
      
      // Determine which HTML files to audit
      const filesToAudit = this.options.file 
        ? [this.options.file]
        : this.htmlFiles;
      
      // Audit each HTML file
      for (const file of filesToAudit) {
        await this.auditHtmlFile(file);
      }
      
      // Check for JSON-specific issues
      await this.auditJsonFiles();
      
      // Generate reports
      await this.generateReports();
      
      this.log(`Audit complete. Found ${this.stats.totalProblems} issues.`, 'info');
      
      return this.stats.totalProblems === 0 ? 0 : 1;
    } catch (error) {
      this.log(`Audit failed: ${error.message}`, 'error');
      console.error(error);
      return 1;
    }
  }
  
  async loadTranslations() {
    this.log('Loading translation files...', 'debug');
    
    for (const [lang, filePath] of Object.entries(this.jsonFiles)) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        this.translations[lang] = JSON.parse(content);
        this.log(`Loaded ${lang}.json`, 'debug');
      } catch (error) {
        this.log(`Failed to load ${filePath}: ${error.message}`, 'error');
        throw error;
      }
    }
  }
  
  async auditHtmlFile(file) {
    this.log(`Auditing ${file}...`, 'debug');
    
    try {
      if (!fs.existsSync(file)) {
        this.log(`File not found: ${file}`, 'error');
        return;
      }
      
      const html = fs.readFileSync(file, 'utf8');
      const $ = cheerio.load(html);
      
      // Store the cheerio instance for use in detection methods
      this.$ = $;
      this.currentFile = file;
      
      // Run all detection methods
      await this.detectUntranslatedTextElements($, file);
      await this.detectUntranslatedInputPlaceholders($, file);
      await this.detectUntranslatedSelectOptions($, file);
      await this.detectUntranslatedMetaTags($, file);
      await this.detectHtmlKeysUsage($, file);
      
    } catch (error) {
      this.log(`Error auditing ${file}: ${error.message}`, 'error');
      this.addProblem('high', 'parse_error', file, 0, 
        `Failed to parse HTML: ${error.message}`,
        'Check file syntax and encoding');
    }
  }
  
  // Helper to get line number from cheerio element (approximation)
  getLineNumber(element) {
    // cheerio doesn't provide exact line numbers, return 0 as placeholder
    // In production, could use a more sophisticated parser that preserves line info
    return 0;
  }
  
  // Placeholder methods that will be implemented in next tasks
  async detectUntranslatedTextElements($, file) {
    // Elements that should have translation
    const textElements = $('h1, h2, h3, h4, h5, h6, p, span, div, button, a, li, td, th, label');
    
    textElements.each((i, elem) => {
      const $elem = $(elem);
      const text = $elem.text().trim();
      
      // Skip if:
      // - No text content
      // - Already has data-i18n
      // - Is inside a script or style tag
      // - Text is only whitespace or special characters
      // - Parent has data-i18n (will be translated via parent)
      if (!text || 
          text.length === 0 ||
          $elem.attr('data-i18n') ||
          $elem.closest('script, style').length > 0 ||
          /^[\s\W]*$/.test(text) ||
          $elem.parent().attr('data-i18n')) {
        return;
      }
      
      // Check if text contains meaningful content (at least 2 characters)
      if (text.length < 2) {
        return;
      }
      
      // Get element selector for reporting
      const tag = elem.name;
      const id = $elem.attr('id') ? `#${$elem.attr('id')}` : '';
      const classes = $elem.attr('class') ? `.${$elem.attr('class').split(' ').join('.')}` : '';
      const selector = `${tag}${id}${classes}`;
      
      this.addProblem(
        'critical',
        'missing_data_i18n',
        file,
        this.getLineNumber(elem),
        `Element without data-i18n attribute: ${selector}`,
        `Add data-i18n="<key>" to element. Text content: "${text.substring(0, 50)}${text.length > 50 ? '...' : ''}"`
      );
    });
  }
  
  async detectUntranslatedInputPlaceholders($, file) {
    const inputElements = $('input[placeholder], textarea[placeholder]');
    
    inputElements.each((i, elem) => {
      const $elem = $(elem);
      const placeholder = $elem.attr('placeholder');
      
      if (!placeholder || placeholder.trim().length === 0) {
        return;
      }
      
      // Check if element has data-i18n or data-i18n-placeholder
      const hasDataI18n = $elem.attr('data-i18n');
      const hasDataI18nPlaceholder = $elem.attr('data-i18n-placeholder');
      
      if (!hasDataI18n && !hasDataI18nPlaceholder) {
        const tag = elem.name;
        const id = $elem.attr('id') ? `#${$elem.attr('id')}` : '';
        const name = $elem.attr('name') ? `[name="${$elem.attr('name')}"]` : '';
        const selector = `${tag}${id}${name}`;
        
        this.addProblem(
          'critical',
          'missing_placeholder_translation',
          file,
          this.getLineNumber(elem),
          `Input/textarea without data-i18n or data-i18n-placeholder: ${selector}`,
          `Add data-i18n-placeholder="<key>" to translate placeholder. Current: "${placeholder}"`
        );
      }
    });
  }
  
  async detectUntranslatedSelectOptions($, file) {
    const selectElements = $('select');
    
    selectElements.each((i, select) => {
      const $select = $(select);
      const options = $select.find('option');
      
      options.each((j, option) => {
        const $option = $(option);
        const text = $option.text().trim();
        
        // Skip empty options or those with data-i18n
        if (!text || text.length === 0 || $option.attr('data-i18n')) {
          return;
        }
        
        // Skip if parent select has data-i18n-options (will be handled globally)
        if ($select.attr('data-i18n-options')) {
          return;
        }
        
        const selectId = $select.attr('id') ? `#${$select.attr('id')}` : 'select';
        const optionValue = $option.attr('value') || '';
        const selector = `${selectId} > option[value="${optionValue}"]`;
        
        this.addProblem(
          'high',
          'missing_option_translation',
          file,
          this.getLineNumber(option),
          `Select option without data-i18n: ${selector}`,
          `Add data-i18n="<key>" to option element. Text: "${text}"`
        );
      });
    });
  }
  
  async detectUntranslatedMetaTags($, file) {
    // Check if title and meta description are being translated
    // The i18n system translates these via JavaScript, not via data-i18n attributes
    
    const title = $('title').text().trim();
    const metaDesc = $('meta[name="description"]').attr('content');
    
    // Check if these appear to be hardcoded in English only
    // We look for the meta.title and meta.description keys being used in i18n.js
    
    // For now, just log that meta tags exist - they should be handled by i18n.js
    // This is informational rather than an error
    if (title) {
      this.log(`Found title tag: "${title}"`, 'debug');
    }
    
    if (metaDesc) {
      this.log(`Found meta description: "${metaDesc}"`, 'debug');
    }
    
    // Check if i18n system is properly updating these
    // We'll verify this by checking if the JavaScript code references meta.title and meta.description
    const hasI18nScript = $('script[src*="i18n.js"]').length > 0 ||
                          $('script[src="/i18n/i18n.js"]').length > 0;
    
    if (!hasI18nScript) {
      this.addProblem(
        'high',
        'missing_i18n_script',
        file,
        0,
        'HTML file does not include i18n.js script',
        'Add <script src="/i18n/i18n.js" defer></script> to the <head> section'
      );
    }
  }
  
  async detectHtmlKeysUsage($, file) {
    // Collect all data-i18n keys used in this HTML file
    const keysInHtml = new Set();
    
    // Check all elements with data-i18n attributes
    $('[data-i18n]').each((i, elem) => {
      const key = $(elem).attr('data-i18n');
      if (key && key.trim()) {
        keysInHtml.add(key.trim());
        this.usedKeys.add(key.trim());
      }
    });
    
    // Check data-i18n-placeholder
    $('[data-i18n-placeholder]').each((i, elem) => {
      const key = $(elem).attr('data-i18n-placeholder');
      if (key && key.trim()) {
        keysInHtml.add(key.trim());
        this.usedKeys.add(key.trim());
      }
    });
    
    // Check data-i18n-title
    $('[data-i18n-title]').each((i, elem) => {
      const key = $(elem).attr('data-i18n-title');
      if (key && key.trim()) {
        keysInHtml.add(key.trim());
        this.usedKeys.add(key.trim());
      }
    });
    
    // Check data-i18n-aria-label
    $('[data-i18n-aria-label]').each((i, elem) => {
      const key = $(elem).attr('data-i18n-aria-label');
      if (key && key.trim()) {
        keysInHtml.add(key.trim());
        this.usedKeys.add(key.trim());
      }
    });
    
    this.log(`Found ${keysInHtml.size} unique translation keys in ${file}`, 'debug');
    
    // Store keys by file for later analysis
    if (!this.keysByFile) {
      this.keysByFile = {};
    }
    this.keysByFile[file] = Array.from(keysInHtml);
  }
  
  async auditJsonFiles() {
    this.log('Auditing JSON files...', 'debug');
    
    // Task 2.8: Check if HTML keys exist in JSON
    await this.checkHtmlKeysExistInJson();
    
    // Task 2.9: Check for unused JSON keys
    await this.checkUnusedJsonKeys();
    
    // Task 2.10, 2.11, 2.12: Check cross-language consistency
    await this.checkCrossLanguageConsistency();
    
    // Task 2.13: Check for empty values
    await this.checkEmptyValues();
  }
  
  async checkHtmlKeysExistInJson() {
    // Check if all keys used in HTML exist in all JSON files
    for (const key of this.usedKeys) {
      const keyPath = key.split('.');
      
      for (const [lang, translations] of Object.entries(this.translations)) {
        const exists = this.keyExistsInTranslations(keyPath, translations);
        
        if (!exists) {
          this.addProblem(
            'high',
            'missing_translation_key',
            this.jsonFiles[lang],
            0,
            `Key "${key}" used in HTML but missing in ${lang}.json`,
            `Add "${key}" to ${lang}.json with appropriate translation`
          );
        }
      }
    }
  }
  
  async checkUnusedJsonKeys() {
    // Check for keys in JSON that are never used in any HTML
    for (const [lang, translations] of Object.entries(this.translations)) {
      const allKeys = this.getAllKeysFromObject(translations);
      
      for (const key of allKeys) {
        if (!this.usedKeys.has(key)) {
          this.addProblem(
            'medium',
            'unused_translation_key',
            this.jsonFiles[lang],
            0,
            `Key "${key}" in ${lang}.json is not used in any HTML file`,
            `Consider removing this key if it's truly unused, or add it to HTML if it should be used`
          );
        }
      }
    }
  }
  
  async checkCrossLanguageConsistency() {
    // Get all keys from all languages
    const keysByLang = {};
    for (const [lang, translations] of Object.entries(this.translations)) {
      keysByLang[lang] = new Set(this.getAllKeysFromObject(translations));
    }
    
    // Find keys that exist in one language but not in others
    const allLanguages = Object.keys(this.translations);
    
    for (let i = 0; i < allLanguages.length; i++) {
      for (let j = i + 1; j < allLanguages.length; j++) {
        const lang1 = allLanguages[i];
        const lang2 = allLanguages[j];
        
        // Keys in lang1 but not in lang2
        for (const key of keysByLang[lang1]) {
          if (!keysByLang[lang2].has(key)) {
            this.addProblem(
              'high',
              'inconsistent_keys',
              this.jsonFiles[lang2],
              0,
              `Key "${key}" exists in ${lang1}.json but missing in ${lang2}.json`,
              `Add "${key}" to ${lang2}.json to maintain consistency`
            );
          }
        }
        
        // Keys in lang2 but not in lang1
        for (const key of keysByLang[lang2]) {
          if (!keysByLang[lang1].has(key)) {
            this.addProblem(
              'high',
              'inconsistent_keys',
              this.jsonFiles[lang1],
              0,
              `Key "${key}" exists in ${lang2}.json but missing in ${lang1}.json`,
              `Add "${key}" to ${lang1}.json to maintain consistency`
            );
          }
        }
      }
    }
    
    // Check structure consistency (object vs string)
    await this.checkStructureConsistency();
  }
  
  async checkStructureConsistency() {
    // Check if nested structure is consistent across languages
    const checkStructure = (path, en, pt, es) => {
      const enType = typeof en;
      const ptType = typeof pt;
      const esType = typeof es;
      
      if (enType !== ptType || enType !== esType) {
        const keyPath = path.join('.');
        this.addProblem(
          'high',
          'structure_mismatch',
          'i18n/*.json',
          0,
          `Structure mismatch at "${keyPath}": en=${enType}, pt=${ptType}, es=${esType}`,
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
  
  async checkEmptyValues() {
    // Check for empty, null, or undefined values
    for (const [lang, translations] of Object.entries(this.translations)) {
      const checkValues = (obj, path = []) => {
        for (const [key, value] of Object.entries(obj)) {
          const currentPath = [...path, key];
          const keyPath = currentPath.join('.');
          
          if (value === null || value === undefined) {
            this.addProblem(
              'high',
              'empty_value',
              this.jsonFiles[lang],
              0,
              `Key "${keyPath}" has null/undefined value in ${lang}.json`,
              'Provide a translation value for this key'
            );
          } else if (typeof value === 'string' && value.trim() === '') {
            this.addProblem(
              'high',
              'empty_value',
              this.jsonFiles[lang],
              0,
              `Key "${keyPath}" has empty string value in ${lang}.json`,
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
  
  async generateReports() {
    this.log('Generating reports...', 'debug');
    
    if (this.options.format === 'markdown' || this.options.format === 'both') {
      await this.generateMarkdownReport();
    }
    
    if (this.options.format === 'json' || this.options.format === 'both') {
      await this.generateJsonReport();
    }
  }
  
  async generateMarkdownReport() {
    this.log('Generating Markdown report...', 'debug');
    
    let report = `# INOSX i18n Audit Report\n\n`;
    report += `Generated: ${new Date().toISOString()}\n\n`;
    
    // Summary
    report += `## Summary\n\n`;
    report += `**Total Issues:** ${this.stats.totalProblems}\n\n`;
    report += `**By Severity:**\n`;
    report += `- 🔴 Critical: ${this.stats.bySeverity.critical}\n`;
    report += `- 🟠 High: ${this.stats.bySeverity.high}\n`;
    report += `- 🟡 Medium: ${this.stats.bySeverity.medium}\n`;
    report += `- 🔵 Low: ${this.stats.bySeverity.low}\n\n`;
    
    report += `**By File:**\n`;
    for (const [file, count] of Object.entries(this.stats.byFile)) {
      report += `- ${file}: ${count} issues\n`;
    }
    report += `\n`;
    
    // Issues by severity
    const severities = ['critical', 'high', 'medium', 'low'];
    const severityEmojis = { critical: '🔴', high: '🟠', medium: '🟡', low: '🔵' };
    
    for (const severity of severities) {
      if (this.problems[severity].length === 0) continue;
      
      report += `## ${severityEmojis[severity]} ${severity.toUpperCase()} Issues\n\n`;
      
      // Group by file
      const byFile = {};
      for (const problem of this.problems[severity]) {
        if (!byFile[problem.file]) {
          byFile[problem.file] = [];
        }
        byFile[problem.file].push(problem);
      }
      
      for (const [file, problems] of Object.entries(byFile)) {
        report += `### ${file}\n\n`;
        
        for (const problem of problems) {
          report += `**${problem.type}**\n`;
          report += `- **Description:** ${problem.description}\n`;
          if (problem.suggestion) {
            report += `- **Suggestion:** ${problem.suggestion}\n`;
          }
          report += `\n`;
        }
      }
    }
    
    // Completion percentage
    const totalElementsChecked = this.usedKeys.size;
    const completionRate = totalElementsChecked > 0 
      ? ((totalElementsChecked / (totalElementsChecked + this.stats.bySeverity.critical + this.stats.bySeverity.high)) * 100).toFixed(1)
      : 0;
    
    report += `## Translation Completeness\n\n`;
    report += `**Keys with translations:** ${totalElementsChecked}\n`;
    report += `**Completion rate:** ~${completionRate}%\n\n`;
    
    // Write to file
    fs.writeFileSync('audit-report.md', report, 'utf8');
    this.log('Markdown report saved to audit-report.md', 'info');
  }
  
  async generateJsonReport() {
    this.log('Generating JSON report...', 'debug');
    
    const report = {
      metadata: {
        generated: new Date().toISOString(),
        totalIssues: this.stats.totalProblems,
        bySeverity: this.stats.bySeverity,
        byFile: this.stats.byFile
      },
      problems: {
        critical: this.problems.critical,
        high: this.problems.high,
        medium: this.problems.medium,
        low: this.problems.low
      },
      statistics: {
        keysWithTranslations: this.usedKeys.size,
        filesAudited: this.htmlFiles,
        languagesChecked: Object.keys(this.translations)
      }
    };
    
    // Write to file
    fs.writeFileSync('audit-report.json', JSON.stringify(report, null, 2), 'utf8');
    this.log('JSON report saved to audit-report.json', 'info');
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
    } else if (args[i] === '--help') {
      console.log(`
INOSX i18n Audit Tool

Usage: node i18n/audit.js [options]

Options:
  --file=<filename>       Audit specific HTML file only
  --format=<format>       Output format: json, markdown, both (default: both)
  --verbose               Enable verbose logging
  --help                  Show this help message

Examples:
  node i18n/audit.js
  node i18n/audit.js --file=index.html
  node i18n/audit.js --format=json --verbose
      `);
      process.exit(0);
    }
  }
  
  const auditor = new I18nAuditor(options);
  auditor.run().then(exitCode => process.exit(exitCode));
}

module.exports = I18nAuditor;
