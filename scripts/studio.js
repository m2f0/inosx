import { mountLiquidGlass, unmountLiquidGlass } from '../assets/studio/liquid-glass/index.js';

let filterNumber = 0;
function mountOptic(control) {
  if (control.dataset.filterId) return;
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  const defs = document.createElementNS(ns, 'defs');
  const filter = document.createElementNS(ns, 'filter');
  filter.id = 'studio-optic-' + (++filterNumber);
  filter.setAttribute('color-interpolation-filters', 'sRGB');
  svg.setAttribute('aria-hidden', 'true');
  svg.classList.add('liquid-glass-filter');
  defs.append(filter);
  svg.append(defs);
  control.append(svg);
  Object.assign(control.dataset, { filterId: filter.id, radius: '23', scale: '-32', blur: '3', gOffset: '1', bOffset: '2', alpha: '1' });
  control.classList.add('liquid-glass-effect');
  mountLiquidGlass(control);
}
document.querySelectorAll('[data-optic]').forEach(mountOptic);
const motion = matchMedia('(prefers-reduced-motion: reduce)');
document.addEventListener('pointermove', event => {
  const control = event.target.closest('.liquid-glass-effect');
  if (!control || motion.matches || event.pointerType !== 'mouse') return;
  const box = control.getBoundingClientRect();
  control.style.setProperty('--gx', (100 * (event.clientX - box.left) / box.width) + '%');
  control.style.setProperty('--gy', (100 * (event.clientY - box.top) / box.height) + '%');
});

const filters = [...document.querySelectorAll('[data-format]')];
function selectFormat(format) {
  for (const button of filters) {
    const selected = button.dataset.format === format;
    button.setAttribute('aria-pressed', String(selected));
    if (selected) {
      mountOptic(button);
    } else if (button.dataset.filterId) {
      unmountLiquidGlass(button);
      button.querySelector('.liquid-glass-filter').remove();
      button.classList.remove('liquid-glass-effect');
      delete button.dataset.filterId;
      button.style.removeProperty('--liquid-glass-filter');
    }
  }
  document.querySelectorAll('[data-category]').forEach(item => {
    item.hidden = format !== 'all' && item.dataset.category !== format;
  });
}
if (filters.length) {
  selectFormat('all');
  filters.forEach(button => button.addEventListener('click', () => selectFormat(button.dataset.format)));
  document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => window.i18n.setLanguage(button.dataset.lang)));
}

const interest = new URLSearchParams(location.search).get('parceria');
const form = document.getElementById('leadForm');
if (form && ['ebook', 'course', 'software', 'ai'].includes(interest)) {
  const context = document.getElementById('partner-context');
  const label = form.querySelector('label[for="lf-msg"]');
  const message = form.elements.message;
  function translateInterest() {
    if (!window.i18n?.currentLang) return;
    context.querySelector('strong').textContent = window.i18n.t('studio.' + interest);
    context.hidden = false;
    label.dataset.i18n = 'studio.audience';
    label.textContent = window.i18n.t('studio.audience');
    message.placeholder = label.textContent;
  }
  document.addEventListener('inosx-language', translateInterest);
  translateInterest();
  form.addEventListener('formdata', event => {
    event.formData.set('message', context.textContent.trim() + '\n\n' + message.value);
  });
}
