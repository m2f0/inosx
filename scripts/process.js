(() => {
  function localize(lang) {
    if (!['pt', 'en', 'es'].includes(lang)) lang = 'en';
    document.querySelectorAll('[data-process-link]').forEach(link => {
      const url = new URL(link.getAttribute('href'), location.origin);
      url.searchParams.set('lang', lang);
      link.href = url.pathname + url.search + url.hash;
    });
    if (document.body.dataset.i18nPage === 'process') {
      document.querySelector('meta[property="og:title"]').content = document.title;
      document.querySelector('meta[property="og:description"]').content = document.querySelector('meta[name="description"]').content;
    }
  }
  document.addEventListener('inosx-language', event => localize(event.detail));
  localize(window.i18n?.currentLang || new URL(location.href).searchParams.get('lang') || 'en');
  if (document.body.dataset.i18nPage === 'process') {
    document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => window.i18n.setLanguage(button.dataset.lang)));
  }
})();
