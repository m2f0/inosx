// Keep locale, route, unrelated query parameters and anchors across internal navigation.
(() => {
 function localize(link) {
  const raw=link.getAttribute('href'); if(link.hasAttribute('lang')||!raw||raw.startsWith('#')||link.hasAttribute('download'))return;
  const url=new URL(raw,location.href);
  if(url.origin!==location.origin||!/^https?:$/.test(url.protocol)||/\.[a-z0-9]+$/i.test(url.pathname)&&!url.pathname.endsWith('.html'))return;
  const lang=document.documentElement.lang.slice(0,2); if(!['en','pt','es'].includes(lang))return;
  if(url.pathname==='/privacy-policy')url.pathname='/privacy-policy.html';
  url.searchParams.set('lang',lang);link.href=url.href;
 }
 function refresh(){document.querySelectorAll('a[href]').forEach(localize)}
 document.addEventListener('inosx-language',refresh);
 document.addEventListener('click',e=>{const link=e.target.closest('a[href]');if(link)localize(link)},true);
 refresh();
})();
