const price = document.getElementById('preco');
const copies = document.getElementById('vendas');
const priceLabel = document.getElementById('preco-atual');
const copiesLabel = document.getElementById('vendas-atuais');
const gross = document.getElementById('bruto');
const presets = document.querySelectorAll('[data-copias]');
const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'USD' });
const quantity = new Intl.NumberFormat('pt-BR');

function updateScenario() {
  const units = copies.valueAsNumber;
  const cents = Math.round(price.valueAsNumber * 100);
  priceLabel.textContent = currency.format(cents / 100);
  copiesLabel.textContent = quantity.format(units);
  price.setAttribute('aria-valuetext', priceLabel.textContent);
  copies.setAttribute('aria-valuetext', copiesLabel.textContent + (units === 1 ? ' exemplar' : ' exemplares'));
  gross.textContent = currency.format(cents * units / 100);
  for (const preset of presets) {
    preset.setAttribute('aria-pressed', String(Number(preset.dataset.copias) === units));
  }
}

price.addEventListener('input', updateScenario);
copies.addEventListener('input', updateScenario);
for (const preset of presets) {
  preset.addEventListener('click', () => {
    copies.value = preset.dataset.copias;
    updateScenario();
  });
}
updateScenario();
