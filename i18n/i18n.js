/**
 * INOSX i18n System
 * Simple, efficient internationalization without dependencies
 * Supports: EN (English), PT (Português), ES (Español)
 */

class I18n {
  constructor() {
    this.currentLang = null;
    this.translations = {};
    this.supportedLanguages = ['en', 'pt', 'es'];
    this.defaultLanguage = 'en';
  }

  /**
   * Initialize i18n system
   */
  async init() {
    // Get saved language or detect browser language
    const savedLang = localStorage.getItem('inosx_lang');
    const browserLang = this.detectBrowserLanguage();
    const initialLang = savedLang || browserLang || this.defaultLanguage;
    
    await this.setLanguage(initialLang);
    this.setupLanguageSelector();
  }

  /**
   * Detect browser language
   */
  detectBrowserLanguage() {
    const browserLang = (navigator.language || navigator.userLanguage).split('-')[0];
    return this.supportedLanguages.includes(browserLang) ? browserLang : this.defaultLanguage;
  }

  /**
   * Load translation file
   */
  async loadTranslations(lang) {
    try {
      const response = await fetch(`/i18n/${lang}.json`);
      if (!response.ok) throw new Error(`Failed to load ${lang}`);
      this.translations[lang] = await response.json();
      return true;
    } catch (error) {
      console.error(`Error loading ${lang} translations:`, error);
      // Fallback to English if error
      if (lang !== 'en') {
        return this.loadTranslations('en');
      }
      return false;
    }
  }

  /**
   * Set active language
   */
  async setLanguage(lang) {
    // Validate language
    if (!this.supportedLanguages.includes(lang)) {
      lang = this.defaultLanguage;
    }

    // Load translations if not loaded
    if (!this.translations[lang]) {
      await this.loadTranslations(lang);
    }

    this.currentLang = lang;
    localStorage.setItem('inosx_lang', lang);
    
    // Update document
    document.documentElement.lang = lang;
    this.updatePage();
    this.updateLanguageSelector();
  }

  /**
   * Get translation by key path (e.g., "hero.headline1")
   */
  t(keyPath) {
    const keys = keyPath.split('.');
    let value = this.translations[this.currentLang];
    
    for (const key of keys) {
      if (value && typeof value === 'object') {
        value = value[key];
      } else {
        console.warn(`Translation not found: ${keyPath}`);
        return keyPath;
      }
    }
    
    return value || keyPath;
  }

  /**
   * Update all elements with data-i18n attribute
   */
  updatePage() {
    // Update meta tags
    document.title = this.t('meta.title');
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = this.t('meta.description');
    }

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.t(key);
      
      // Update text content or placeholder
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = translation;
      } else if (element.tagName === 'SELECT') {
        // Handle select options separately
        return;
      } else {
        element.textContent = translation;
      }
    });

    // Update select options
    document.querySelectorAll('select[data-i18n-options]').forEach(select => {
      const optionsKey = select.getAttribute('data-i18n-options');
      const options = select.querySelectorAll('option');
      
      options.forEach((option, index) => {
        const optionKey = option.getAttribute('data-i18n');
        if (optionKey) {
          option.textContent = this.t(optionKey);
        }
      });
    });

    // Trigger custom event for other components
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: this.currentLang } 
    }));
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
      langDisplay.textContent = langNames[this.currentLang];
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
}

// Create global instance
window.i18n = new I18n();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.i18n.init();
  });
} else {
  window.i18n.init();
}
