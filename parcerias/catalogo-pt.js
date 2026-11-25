// The approved Portuguese catalog shares its public URL with the existing EN/ES pages.
(() => {
  const supported = ['en', 'es', 'pt'];
  const requested = new URL(location.href).searchParams.get('lang');
  let saved;
  try {
    saved = localStorage.getItem('inosx_lang');
  } catch {
    // The query and browser language also work when storage is unavailable.
  }
  const language = [requested, saved, navigator.language.split('-')[0]]
    .find(value => supported.includes(value)) || 'en';
  if (language !== 'pt') {
    document.addEventListener('inosx-language', event => {
      if (event.detail === 'pt') location.reload();
    });
    return;
  }

  const template = document.getElementById('catalog-pt');
  const stylesheet = document.getElementById('catalog-pt-style');
  document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
    if (link !== stylesheet) link.disabled = true;
  });
  stylesheet.media = 'all';
  document.documentElement.lang = 'pt';
  document.body.classList.remove('catalog-page');
  document.body.replaceChildren(template.content);
  function updateMetadata() {
    document.title = 'Parcerias de produtos | INOSX';
    document.querySelector('meta[name="description"]').content = document.querySelector('.lead').textContent.trim();
  }
  updateMetadata();
  document.addEventListener('inosx-language', updateMetadata);

  const filters = document.querySelectorAll('[data-filter]');
  const labels = {
    all: '1 parceria disponível · 3 em estudo',
    pub: '1 publicação disponível',
    course: '1 curso em estudo',
    tech: '2 parcerias de tecnologia em estudo'
  };
  function selectFilter(key) {
    for (const button of filters) {
      button.setAttribute('aria-pressed', String(button.dataset.filter === key));
    }
    document.querySelector('.feature').hidden = key !== 'all' && key !== 'pub';
    document.querySelector('.paper').hidden = key === 'pub';
    for (const card of document.querySelectorAll('.proposal')) {
      const format = card.id === 'course' ? 'course' : 'tech';
      card.hidden = key !== 'all' && key !== format;
    }
    const count = document.querySelector('.counts');
    count.textContent = labels[key];
    if (key !== 'all') {
      const link = document.createElement('a');
      link.href = key === 'pub' ? '#criacao-editorial' : '#em-estudo';
      link.textContent = key === 'pub' ? 'Ver a publicação' : 'Ver resultados';
      count.append(' · ', link);
    }
  }
  for (const button of filters) {
    button.addEventListener('click', () => selectFilter(button.dataset.filter));
  }
  document.querySelector('.jump').addEventListener('click', () => selectFilter('all'));
})();
