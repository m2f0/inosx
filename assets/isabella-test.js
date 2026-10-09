(() => {
  "use strict";
  if (location.origin !== "https://inosx.com" || document.getElementById("inosx-isabella-test")) return;
  const match = /^#isabella-test=([A-Za-z0-9_-]{43})$/.exec(location.hash);
  if (!match) return;
  const token = match[1];
  history.replaceState(null, "", location.pathname + location.search);
  const host = document.createElement("div"); host.id = "inosx-isabella-test";
  document.body.append(host); const root = host.attachShadow({mode:"closed"});
  root.innerHTML = `<style>
    :host{all:initial;position:fixed;bottom:18px;right:18px;z-index:2147483000;font:15px Arial,sans-serif;color:#effaff}
    *{box-sizing:border-box}button,textarea,select{font:inherit}button{cursor:pointer;border:1px solid #68d9e7;border-radius:20px;background:#12384a;color:#effaff;padding:12px}button:disabled{opacity:.6;cursor:wait}button:focus-visible,textarea:focus-visible,select:focus-visible{outline:3px solid #68d9e7;outline-offset:2px}
    .toggle{display:flex;align-items:center;gap:10px;margin-left:auto}.toggle img{width:38px;height:38px;border-radius:50%}
    .panel{width:min(390px,calc(100vw - 36px));height:min(620px,calc(100dvh - 112px));display:flex;flex-direction:column;border:1px solid #68d9e7;border-radius:16px;background:#102738;margin-bottom:10px;overflow:hidden}.panel[hidden]{display:none}
    header{display:flex;justify-content:space-between;align-items:center;padding:12px;border-bottom:1px solid #526f85}h2{font-size:17px;margin:0}small{display:block;font-size:12px;margin-top:5px}select{background:#12384a;color:#fff;border:1px solid #526f85;border-radius:8px;padding:5px;max-width:110px}
    .history{flex:1;min-height:0;overflow:auto;padding:12px}.bubble{padding:10px;border-radius:12px;background:#173d50;margin:0 0 10px;white-space:pre-wrap;overflow-wrap:anywhere}.customer{background:#185d61;margin-left:25px}.hint{font-size:12px;color:#c9dce6;margin:0 0 12px;line-height:1.5}
    form{padding:10px;border-top:1px solid #526f85;display:flex;gap:8px;align-items:flex-end}textarea{resize:vertical;max-height:130px;min-height:50px;width:100%;padding:10px;border:1px solid #526f85;border-radius:10px;background:#12384a;color:#fff} .status{font-size:12px;padding:0 12px;margin:6px 0;color:#ffe1a0}
  </style><section class="panel" role="region" aria-label="Teste da Isabella" hidden>
   <header><div><h2>Isabella Duarte</h2><small>INOSX · Teste com IA</small></div><select aria-label="Idioma da conversa"><option value="pt">Português</option><option value="en">English</option><option value="es">Español</option></select></header>
   <div class="history" role="log" aria-live="polite"><p class="hint">Teste temporário. As mensagens ficam no ambiente de teste do AgentOS e usam créditos da conta que criou o convite. Evite dados pessoais ou confidenciais. Não há transferência para atendimento humano neste teste.</p></div>
   <p class="status" role="status"></p><form><textarea aria-label="Sua mensagem para Isabella" placeholder="Escreva sua mensagem" maxlength="4000" rows="2" required></textarea><button type="submit">Enviar</button></form>
  </section><button class="toggle" type="button" aria-expanded="false"><img src="/assets/isabella-duarte.png" alt=""/><span>Fale com a Isabella · teste</span></button>`;
  const panel=root.querySelector('.panel'),toggle=root.querySelector('.toggle'),form=root.querySelector('form'),text=root.querySelector('textarea'),send=root.querySelector('button[type=submit]'),locale=root.querySelector('select'),status=root.querySelector('.status'),log=root.querySelector('.history');
  toggle.onclick=()=>{panel.hidden=!panel.hidden;toggle.setAttribute('aria-expanded',String(!panel.hidden));if(!panel.hidden)text.focus();};
  root.addEventListener('keydown',e=>{if(e.key==='Escape'){panel.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.focus();}});
  function bubble(label,value,customer=false){const item=document.createElement('p');item.className='bubble'+(customer?' customer':'');const strong=document.createElement('strong');strong.textContent=label+': ';item.append(strong,document.createTextNode(value));log.append(item);log.scrollTop=log.scrollHeight;}
  let busy=false;
  async function call(body){const r=await fetch('https://inosx-isabella-test.vercel.app/api/chat',{method:'POST',credentials:'omit',referrerPolicy:'no-referrer',headers:{'content-type':'application/json'},body:JSON.stringify({...body,token}),signal:AbortSignal.timeout(90000)});if(!r.ok)throw Error(r.status===429?'Limite atingido. Aguarde ou gere outro convite no AgentOS.':r.status===401||r.status===403||r.status===404?'Convite indisponível, expirado ou revogado. Gere um novo link no AgentOS.':'Não foi possível concluir. Consulte o status no AgentOS antes de repetir.');return r.json();}
  form.onsubmit=async e=>{e.preventDefault();if(busy||!text.value.trim())return;busy=true;send.disabled=true;locale.disabled=true;const question=text.value.trim(),id=crypto.randomUUID();text.value='';bubble('Você',question,true);status.textContent='Isabella está preparando a resposta…';
   try{await call({action:'send',id,question,locale:locale.value});let complete=false;
    for(let i=0;i<45;i++){await new Promise(r=>setTimeout(r,2000));const result=await call({action:'status',id});if(result.state==='completed'){bubble('Isabella',result.answer);status.textContent='';complete=true;break;}if(result.state==='failed')throw Error('A resposta não pôde ser concluída. Confira o teste no AgentOS.');}
    if(!complete)throw Error('A resposta demorou mais que o esperado. Confira o teste no AgentOS antes de repetir.');
   }catch(error){status.textContent=error.message||'Teste indisponível.';}finally{busy=false;send.disabled=false;locale.disabled=false;text.focus();}
  };
})();
