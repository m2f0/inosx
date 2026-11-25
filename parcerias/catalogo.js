(() => {
  const filters = document.querySelectorAll('[data-filter]');
  const count = document.querySelector('.counts');
  const messages = {
    all: ['allResults', '1 available partnership · 3 under consideration'],
    pub: ['pubResults', '1 publication available'],
    course: ['courseResults', '1 course under consideration'],
    tech: ['techResults', '2 technology partnerships under consideration'],
    publication: ['showPublication', 'View publication'],
    results: ['showResults', 'View results']
  };
  let selected = 'all';

  function label(key) {
    const [name, fallback] = messages[key];
    return window.i18n?.currentLang ? window.i18n.t('partnerCatalog.' + name) : fallback;
  }
  function renderCount() {
    count.textContent = label(selected);
    if (selected === 'all') return;
    const publication = selected === 'pub';
    const link = document.createElement('a');
    link.href = publication ? '#criacao-editorial' : '#em-estudo';
    link.textContent = label(publication ? 'publication' : 'results');
    count.append(' · ', link);
  }
  function selectFilter(key) {
    selected = key;
    for (const button of filters) {
      button.setAttribute('aria-pressed', String(button.dataset.filter === key));
    }
    document.querySelector('.feature').hidden = key !== 'all' && key !== 'pub';
    document.querySelector('.paper').hidden = key === 'pub';
    for (const card of document.querySelectorAll('.proposal')) {
      const format = card.id === 'course' ? 'course' : 'tech';
      card.hidden = key !== 'all' && key !== format;
    }
    renderCount();
  }
  function refreshLanguage() {
    for (const link of document.querySelectorAll('.langs a')) {
      if (link.lang === document.documentElement.lang) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    }
    renderCount();
  }
  for (const button of filters) {
    button.addEventListener('click', () => selectFilter(button.dataset.filter));
  }
  document.querySelector('.jump').addEventListener('click', () => selectFilter('all'));
  document.addEventListener('inosx-language', refreshLanguage);
  refreshLanguage();
})();
