(() => {
  const videoIds={en:'OfGoz1e91vs',pt:'YTfa8ARhq28',es:'pVIdO-RPf64'};
  const video=document.getElementById('agentos-launch-video');
  const selector=document.getElementById('agentos-video-language');
  function setVideo(lang){const id=videoIds[lang];const src=`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&playsinline=1&rel=0`;if(video.getAttribute('src')!==src)video.src=src;selector.value=lang;}
  function setCommercial(lang){
    const frame=document.getElementById('agentos-commercial-video');
    const link=document.getElementById('agentos-commercial-youtube');
    if(!frame||!link)return;
    const id=lang==='pt'?'KvdfqKYER9g':'vOsdKmG0hGQ';
    const src=`https://www.youtube-nocookie.com/embed/${id}?hl=${lang}&rel=0`;
    if(frame.getAttribute('src')!==src)frame.src=src;
    link.href=`https://youtu.be/${id}`;
  }
  function localize(lang) {
    const language = Object.hasOwn(videoIds, lang) ? lang : 'en';
    setVideo(language);
    setCommercial(language);
    document.querySelectorAll('[data-agentos-link]').forEach(link => {
      link.href = 'https://agentos.inosx.com/?lang=' + language;
    });
  }
  selector.addEventListener('change', () => setVideo(selector.value));
  document.addEventListener('inosx-language', event => localize(event.detail));
  localize(window.i18n?.currentLang || document.documentElement.lang.slice(0, 2));
})();
