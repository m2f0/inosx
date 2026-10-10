(() => {
  function updateAccessLinks() {
    document.querySelectorAll('[data-agentos-access]').forEach(link => {
      link.href = 'https://app.inosx.com';
    });
  }
  document.addEventListener('inosx-language', updateAccessLinks);
  updateAccessLinks();
})();
