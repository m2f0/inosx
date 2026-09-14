(() => {
  const strip=document.querySelector('.launch-celebration');
  if(!strip)return;
  const pause=strip.querySelector('.party-pause');
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  let paused=false,timer,language='en';
  const labels={en:['Pause the party','Resume the party'],pt:['Pausar a festa','Retomar a festa'],es:['Pausar la fiesta','Reanudar la fiesta']};
  const videoIds={en:'OfGoz1e91vs',pt:'YTfa8ARhq28',es:'pVIdO-RPf64'};
  const video=document.getElementById('agentos-launch-video');
  const selector=document.getElementById('agentos-video-language');
  function setVideo(lang){const id=videoIds[lang];const src=`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&playsinline=1&rel=0`;if(video.getAttribute('src')!==src)video.src=src;selector.value=lang;}
  function localize(lang){language=videoIds[lang]?lang:'en';pause.textContent=labels[language][paused?1:0];setVideo(language);document.querySelectorAll('[data-agentos-beta]').forEach(a=>a.href=`https://agentos.inosx.com/?lang=${language}#closed-beta`);document.querySelectorAll('[data-agentos-link]').forEach(a=>a.href=`https://agentos.inosx.com/?lang=${language}`);}
  function burst(){const layer=document.createElement('div');layer.className='launch-confetti';layer.setAttribute('aria-hidden','true');for(let i=0;i<64;i++){const piece=document.createElement('i');piece.style.cssText=`--left:${(i*37+3)%100}%;--delay:${(i%11)*.09}s;--duration:${2.5+(i%7)*.17}s;--drift:${(i*43)%220-110}px;--color:${['#35c9ff','#8d83ff','#ffd78c','#f7f9ff','#2979ff'][i%5]}`;layer.append(piece);}strip.append(layer);setTimeout(()=>layer.remove(),4800);}
  function sync(){clearInterval(timer);strip.querySelectorAll('.launch-confetti').forEach(e=>e.remove());strip.classList.toggle('party-paused',paused||document.hidden);pause.setAttribute('aria-pressed',String(paused));pause.textContent=labels[language][paused?1:0];if(!paused&&!motion.matches&&!document.hidden){burst();timer=setInterval(burst,5000);}}
  pause.addEventListener('click',()=>{paused=!paused;sync();});motion.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);
  document.addEventListener('inosx-language',e=>localize(e.detail));selector.addEventListener('change',()=>setVideo(selector.value));
  localize(window.i18n?.currentLang||document.documentElement.lang?.slice(0,2));sync();
})();
