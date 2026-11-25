const verificationText = {
  'verification.loading': 'Carregando verificação…',
  'verification.pending': 'Conclua a verificação abaixo se solicitado.',
  'verification.complete': 'Verificação concluída.',
  'verification.unavailable': 'A verificação não foi concluída. Confira sua conexão e tente novamente.'
};
window.i18n = { t: key => verificationText[key] || key };

const form = document.getElementById('editorialForm');
const response = document.getElementById('resposta');
const apoio = form.elements.apoio;
for (const link of document.querySelectorAll('[data-path]')) {
  link.addEventListener('click', () => {
    apoio.value = link.dataset.path;
    response.textContent = '';
    requestAnimationFrame(() => apoio.focus({ preventScroll: true }));
  });
}
form.addEventListener('input', () => { response.textContent = ''; });
const submit = document.getElementById('enviar');
submit.disabled = false;
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (submit.disabled || !form.reportValidity()) return;
  const data = new FormData(form);
  if (data.get('_gotcha')) return;
  const token = data.get('cf-turnstile-response');
  if (!token) {
    response.textContent = 'Conclua a verificação de segurança antes de enviar.';
    return;
  }
  submit.disabled = true;
  response.textContent = 'Enviando sua solicitação…';
  const mensagem = [
    'Apoio editorial: ' + (data.get('apoio') ? apoio.selectedOptions[0].textContent : 'A definir'),
    'Tema: ' + data.get('topic').trim(),
    'Público: ' + data.get('audience').trim(),
    'Projeto: ' + data.get('message').trim()
  ].join('\n');
  try {
    const envio = await fetch(form.action, {
      method: 'POST',
      headers: {'Content-Type':'application/json','Accept':'application/json'},
      body: JSON.stringify({
        type: 'contact', name: data.get('name').trim(), email: data.get('email').trim(),
        phone: data.get('phone').trim(), message: mensagem, source: 'inosx.com',
        sourceRef: 'parcerias-editoriais-ebook', consent: data.has('consent'),
        locale: 'pt-BR', turnstileToken: token
      })
    });
    const resultado = await envio.json();
    if (!envio.ok || !['accepted','duplicate'].includes(resultado.status)) throw new Error();
    response.textContent = resultado.status === 'duplicate'
      ? 'Já recebemos uma solicitação editorial com este contato.'
      : 'Proposta recebida. A equipe editorial avaliará o seu projeto.';
    form.reset();
  } catch {
    response.textContent = 'Não foi possível confirmar o envio. Seus dados continuam no formulário. Verifique a conexão e tente novamente.';
  } finally {
    const widget = form.querySelector('[data-turnstile-container]');
    if (widget.hasAttribute('data-widget-id')) widget.dispatchEvent(new Event('intake-reset'));
    submit.disabled = false;
  }
});
