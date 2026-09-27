(() => {
  function localize(lang) {
    const language = ['pt', 'en', 'es'].includes(lang) ? lang : 'en';
    document.querySelectorAll('[data-agentos-access]').forEach(link => {
      link.href = `https://app.agentos.inosx.com/${language}/sign-in`;
    });
  }
  document.addEventListener('inosx-language', event => localize(event.detail));
  localize(window.i18n?.currentLang || new URL(location.href).searchParams.get('lang') || 'en');
})();
