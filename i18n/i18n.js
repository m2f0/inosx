/**
 * INOSX i18n System (Enhanced)
 * Simple, efficient internationalization without dependencies
 * Supports: EN (English), PT (Português), ES (Español)
 * 
 * Features:
 * - Multiple data-i18n-* attributes for different element properties
 * - MutationObserver for dynamic content
 * - Improved error handling and fallbacks
 * - Preserves user input during language changes
 */

class I18n {
  constructor() {
    this.currentLang = null;
    this.translations = {};
    this.supportedLanguages = ['en', 'pt', 'es'];
    this.defaultLanguage = 'en';
    this.observer = null;
    this.debounceTimer = null;
    this.isUpdating = false;
  }

  /**
   * Initialize i18n system
   */
  async init() {
    try {
      // Get saved language or detect browser language
      const savedLang = localStorage.getItem('inosx_lang');
      const browserLang = this.detectBrowserLanguage();
      const initialLang = savedLang || browserLang || this.defaultLanguage;
      
      await this.setLanguage(initialLang);
      this.setupLanguageSelector();
      this.setupMutationObserver();
    } catch (error) {
      console.error('Error initializing i18n:', error);
      // Try fallback to English
      if (this.currentLang !== 'en') {
        await this.setLanguage('en');
      }
    }
  }

  /**
   * Detect browser language with improved handling
   */
  detectBrowserLanguage() {
    try {
      const browserLang = (navigator.language || navigator.userLanguage || '').split('-')[0].toLowerCase();
      
      if (this.supportedLanguages.includes(browserLang)) {
        return browserLang;
      }
      
      // Log unsupported language
      if (browserLang) {
        console.info(`Browser language "${browserLang}" not supported, using "${this.defaultLanguage}"`);
      }
      
      return this.defaultLanguage;
    } catch (error) {
      console.warn('Error detecting browser language:', error);
      return this.defaultLanguage;
    }
  }

  /**
   * Load translation file with validation
   */
  async loadTranslations(lang) {
    try {
      const response = await fetch(`/i18n/${lang}.json`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to load ${lang}.json`);
      }
      
      const data = await response.json();
      
      // Validate JSON structure
      if (!data || typeof data !== 'object' || Array.isArray(data)) {
        throw new Error(`Invalid translation file structure for ${lang}.json`);
      }
      
      this.translations[lang] = data;
      console.info(`Successfully loaded ${lang}.json`);
      return true;
    } catch (error) {
      console.error(`Error loading ${lang} translations:`, error);
      
      // Fallback to English if not already trying English
      if (lang !== 'en' && !this.translations['en']) {
        console.info('Attempting fallback to English...');
        return this.loadTranslations('en');
      }
      
      return false;
    }
  }

  /**
   * Set active language
   */
  async setLanguage(lang) {
    // Validate and normalize language
    lang = lang ? lang.toLowerCase() : this.defaultLanguage;
    
    if (!this.supportedLanguages.includes(lang)) {
      console.warn(`Language "${lang}" not supported, using "${this.defaultLanguage}"`);
      lang = this.defaultLanguage;
    }

    // Load translations if not loaded
    if (!this.translations[lang]) {
      const loaded = await this.loadTranslations(lang);
      if (!loaded) {
        console.error(`Failed to load language: ${lang}`);
        return;
      }
    }

    this.currentLang = lang;
    localStorage.setItem('inosx_lang', lang);
    
    // Update document
    document.documentElement.lang = lang;
    this.updatePage();
    this.updateLanguageSelector();
  }

  /**
   * Get translation by key path with improved fallback
   */
  t(keyPath, fallbackLang = 'en') {
    if (!keyPath) return '';
    
    const keys = keyPath.split('.');
    let value = this.translations[this.currentLang];
    
    // Try current language
    for (const key of keys) {
      if (value && typeof value === 'object') {
        value = value[key];
      } else {
        value = undefined;
        break;
      }
    }
    
    // If not found and not in fallback language, try fallback
    if ((value === undefined || value === null) && 
        this.currentLang !== fallbackLang && 
        this.translations[fallbackLang]) {
      console.warn(`Translation not found for "${keyPath}" in ${this.currentLang}, trying ${fallbackLang}`);
      
      let fallbackValue = this.translations[fallbackLang];
      for (const key of keys) {
        if (fallbackValue && typeof fallbackValue === 'object') {
          fallbackValue = fallbackValue[key];
        } else {
          fallbackValue = undefined;
          break;
        }
      }
      
      if (fallbackValue !== undefined && fallbackValue !== null) {
        return fallbackValue;
      }
    }
    
    // If still not found, return key as fallback
    if (value === undefined || value === null) {
      console.warn(`Translation not found: ${keyPath}`);
      return keyPath;
    }
    
    return value;
  }

  /**
   * Update all elements with data-i18n attributes
   */
  updatePage() {
    if (this.isUpdating) return;
    this.isUpdating = true;
    
    try {
      // Update meta tags first
      this.updateMetaTags();
      
      // Update elements with data-i18n
      this.updateElements('[data-i18n]', (element, key) => {
        const translation = this.t(key);
        
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          // For inputs/textareas, only update if no user value
          if (!element.value || element.value.trim() === '') {
            element.placeholder = translation;
          }
        } else if (element.tagName === 'SELECT') {
          // Skip selects, handled separately
          return;
        } else {
          element.textContent = translation;
        }
      });
      
      // Update data-i18n-placeholder
      this.updateElements('[data-i18n-placeholder]', (element, key) => {
        element.placeholder = this.t(key);
      });
      
      // Update data-i18n-title
      this.updateElements('[data-i18n-title]', (element, key) => {
        element.title = this.t(key);
      });
      
      // Update data-i18n-aria-label
      this.updateElements('[data-i18n-aria-label]', (element, key) => {
        element.setAttribute('aria-label', this.t(key));
      });
      
      // Update select options (preserving selection)
      this.updateSelectOptions();
      
      // Trigger custom event after all updates
      window.dispatchEvent(new CustomEvent('languageChanged', { 
        detail: { language: this.currentLang } 
      }));
    } finally {
      this.isUpdating = false;
    }
  }

  /**
   * Update meta tags
   */
  updateMetaTags() {
    try {
      // Update title
      const titleTranslation = this.t('meta.title');
      if (titleTranslation && titleTranslation !== 'meta.title') {
        document.title = titleTranslation;
      }
      
      // Update meta description
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        const descTranslation = this.t('meta.description');
        if (descTranslation && descTranslation !== 'meta.description') {
          metaDesc.content = descTranslation;
        }
      }
    } catch (error) {
      console.warn('Error updating meta tags:', error);
    }
  }

  /**
   * Generic element updater
   */
  updateElements(selector, updateFn) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      const key = element.getAttribute(selector.slice(1, -1)); // Extract attribute name
      if (key && key.trim()) {
        try {
          updateFn(element, key.trim());
        } catch (error) {
          console.error(`Error updating element with key "${key}":`, error);
        }
      }
    });
  }

  /**
   * Update select options preserving user selection
   */
  updateSelectOptions() {
    // Handle selects with individual option data-i18n
    document.querySelectorAll('select').forEach(select => {
      const selectedValue = select.value; // Save current selection
      const selectedIndex = select.selectedIndex;
      
      const options = select.querySelectorAll('option');
      options.forEach(option => {
        const key = option.getAttribute('data-i18n');
        if (key && key.trim()) {
          option.textContent = this.t(key.trim());
        }
      });
      
      // Restore selection
      if (selectedValue) {
        select.value = selectedValue;
      } else if (selectedIndex >= 0) {
        select.selectedIndex = selectedIndex;
      }
    });
    
    // Handle selects with data-i18n-options
    document.querySelectorAll('select[data-i18n-options]').forEach(select => {
      const selectedValue = select.value;
      const optionsKey = select.getAttribute('data-i18n-options');
      const options = select.querySelectorAll('option');
      
      options.forEach(option => {
        const key = option.getAttribute('data-i18n');
        if (key) {
          option.textContent = this.t(key);
        }
      });
      
      // Restore selection
      if (selectedValue) {
        select.value = selectedValue;
      }
    });
  }

  /**
   * Setup MutationObserver for dynamic content
   */
  setupMutationObserver() {
    // Create observer to watch for new elements
    this.observer = new MutationObserver((mutations) => {
      // Debounce to avoid excessive updates
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }
      
      this.debounceTimer = setTimeout(() => {
        let shouldUpdate = false;
        
        for (const mutation of mutations) {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            // Check if any added nodes have data-i18n attributes
            for (const node of mutation.addedNodes) {
              if (node.nodeType === 1) { // Element node
                if (node.hasAttribute && (
                    node.hasAttribute('data-i18n') ||
                    node.hasAttribute('data-i18n-placeholder') ||
                    node.hasAttribute('data-i18n-title') ||
                    node.hasAttribute('data-i18n-aria-label') ||
                    node.querySelector('[data-i18n], [data-i18n-placeholder], [data-i18n-title], [data-i18n-aria-label]')
                )) {
                  shouldUpdate = true;
                  break;
                }
              }
            }
          }
        }
        
        if (shouldUpdate && !this.isUpdating) {
          console.debug('Detected new translatable content, updating...');
          this.updatePage();
        }
      }, 100); // 100ms debounce
    });
    
    // Start observing
    this.observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  /**
   * Setup language selector
   */
  setupLanguageSelector() {
    const selector = document.getElementById('languageSelector');
    if (!selector) return;

    selector.addEventListener('change', (e) => {
      this.setLanguage(e.target.value);
    });
  }

  /**
   * Update language selector UI
   */
  updateLanguageSelector() {
    const selector = document.getElementById('languageSelector');
    if (selector) {
      selector.value = this.currentLang;
    }

    // Update flag/language display
    const langDisplay = document.getElementById('currentLangDisplay');
    if (langDisplay) {
      const langNames = {
        'en': '🇺🇸 English',
        'pt': '🇧🇷 Português',
        'es': '🇪🇸 Español'
      };
      langDisplay.textContent = langNames[this.currentLang] || this.currentLang;
    }
  }

  /**
   * Get current language
   */
  getCurrentLanguage() {
    return this.currentLang;
  }

  /**
   * Get supported languages
   */
  getSupportedLanguages() {
    return this.supportedLanguages;
  }
  
  /**
   * Cleanup (if needed)
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
  }
}

// Create global instance
window.i18n = new I18n();

// Auto-initialize when DOM is ready (prevent FOUC)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.i18n.init();
  });
} else {
  // DOM already ready
  window.i18n.init();
}
