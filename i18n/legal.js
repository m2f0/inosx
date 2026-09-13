// Translations of the existing legal text; policy content and effective date are unchanged.
(async () => {
 const requested=new URL(location.href).searchParams.get('lang') || localStorage.getItem('inosx_lang');
 const lang=requested==='es'?'es':'en';
 const response=await fetch('/i18n/'+document.body.dataset.legalPage+'-legal.json?v=4.5.0-es');
 if(!response.ok)throw new Error('Legal translation unavailable');
 const entries=await response.json();
 document.querySelectorAll('[data-legal]').forEach(el=>{el.innerHTML=entries[el.dataset.legal][lang]});
 document.documentElement.lang=lang;localStorage.setItem('inosx_lang',lang);
 document.title=(document.body.dataset.legalPage==='terms'?(lang==='es'?'Términos de servicio':'Terms of Service'):(lang==='es'?'Política de privacidad':'Privacy Policy'))+' | INOSX';
 if(lang==='es'){
  const labels={'Home':'Inicio','Company':'Empresa','Contact':'Contacto','Email':'Correo electrónico','Phone':'Teléfono','Products & Services':'Productos y servicios','Terms':'Términos','Terms of Service':'Términos de servicio','Privacy Policy':'Política de privacidad','INOSX, Inc. • USA Corporation':'INOSX, Inc. • Corporación de Estados Unidos','INOSX, Inc. All rights reserved.':'INOSX, Inc. Todos los derechos reservados.','© 2026 INOSX, Inc. All rights reserved.':'© 2026 INOSX, Inc. Todos los derechos reservados.'};
  document.querySelectorAll('footer a,footer h4,footer strong,footer p,footer span,footer .legal').forEach(el=>{const t=el.textContent.trim();if(labels[t])el.textContent=labels[t]});
  const nav=document.querySelector('footer nav');if(nav)nav.setAttribute('aria-label','Enlaces legales');
 }
 const meta=document.querySelector('meta[name=description]');if(meta)meta.content=document.querySelector('[data-legal="1"]').textContent.trim();
 document.querySelectorAll('.legal-languages a[lang]').forEach(a=>{const u=new URL(location.href);u.searchParams.set('lang',a.lang);a.href=u.href;if(a.lang===lang)a.setAttribute('aria-current','page')});
 document.dispatchEvent(new CustomEvent('inosx-language',{detail:lang}));
})();
