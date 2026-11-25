import { mountLiquidGlass } from './liquid-glass/index.js';

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
document.querySelectorAll('.glass').forEach(mountOptic);
const motion = matchMedia('(prefers-reduced-motion: reduce)');
document.addEventListener('pointermove', event => {
  const control = event.target.closest('.liquid-glass-effect');
  if (!control || motion.matches || event.pointerType !== 'mouse') return;
  const box = control.getBoundingClientRect();
  control.style.setProperty('--gx', (100 * (event.clientX - box.left) / box.width) + '%');
  control.style.setProperty('--gy', (100 * (event.clientY - box.top) / box.height) + '%');
});
