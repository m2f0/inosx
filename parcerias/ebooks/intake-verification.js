(() => {
  const containers = document.querySelectorAll('[data-turnstile-container]');
  const scriptId = 'intake-turnstile-sdk';
  const english = {
    "loading": "Loading the security check…",
    "pending": "Complete the check below if prompted.",
    "complete": "Verification complete.",
    "unavailable": "The security check could not finish. Check your connection and try again."
  };
  let loadTimer;

  function status(container, state) {
    const section = container.parentElement;
    const message = section.querySelector('[data-check-status]');
    const key = 'verification.' + state;
    message.dataset.i18n = key;
    const translation = window.i18n?.t(key);
    message.textContent = translation && translation !== key ? translation : english[state];
    section.querySelector('[data-check-retry]').hidden = state !== 'unavailable';
  }

  function render() {
    clearTimeout(loadTimer);
    for (const container of containers) {
      if (container.hasAttribute('data-widget-id') || container.closest('[hidden]')) continue;
      status(container, 'pending');
      try {
        const id = window.turnstile.render(container, {
          sitekey: container.dataset.sitekey,
          action: 'public_intake',
          theme: 'dark',
          appearance: 'always',
          size: container.clientWidth < 300 ? 'compact' : 'normal',
          callback: () => status(container, 'complete'),
          'expired-callback': () => status(container, 'pending'),
          'timeout-callback': () => status(container, 'unavailable'),
          'error-callback': () => {
            status(container, 'unavailable');
            return true;
          }
        });
        container.dataset.widgetId = id;
      } catch {
        status(container, 'unavailable');
      }
    }
  }

  function failedLoad() {
    if (!window.turnstile) containers.forEach(container => status(container, 'unavailable'));
  }

  function watchLoad() {
    clearTimeout(loadTimer);
    loadTimer = setTimeout(failedLoad, 15000);
  }

  window.inosxTurnstileReady = render;
  document.addEventListener('error', event => {
    if (event.target.id === scriptId) failedLoad();
  }, true);

  for (const container of containers) {
    container.addEventListener('intake-reset', () => {
      status(container, 'pending');
      window.turnstile.reset(container.dataset.widgetId);
    });
    container.parentElement.querySelector('[data-check-retry]').addEventListener('click', () => {
      if (window.turnstile) {
        if (container.hasAttribute('data-widget-id')) {
          container.dispatchEvent(new Event('intake-reset'));
        } else {
          render();
        }
        return;
      }
      const script = document.getElementById(scriptId);
      if (!script) return;
      containers.forEach(item => status(item, 'loading'));
      const replacement = document.createElement('script');
      replacement.id = scriptId;
      replacement.src = script.src;
      watchLoad();
      script.replaceWith(replacement);
    });
  }
  watchLoad();
})();
