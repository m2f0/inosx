const copy={
en:{education:'Courses & e-books',partners:'Partnerships',skip:'Skip to products',home:'About INOSX',help:'Get help',language:'Language',headline:"INOSX Store",intro:"Explore software, AI products, courses and e-books created by INOSX.",browse:'Explore the collection ↓',featured:'In the spotlight',stash:'Give your saved WhatsApp links, videos and discoveries a home you can actually find things in.',trial:'7 days free',price:'Then US$ 4/month',preparing:'Subscriptions in preparation. Payments are not open yet.',discover:'Discover Stashmunk ↗',keep:'Save. Organize. Rediscover.',collection:'iThe collection',catalog:"Product catalog",searchLabel:'Search products',placeholder:'Name or idea…',empty:'Nothing here yet.',try:'Try another search or show all products.',reset:'Clear filters',how:"One store. Each product’s own space.",howBody:"Explore here, then continue on the product’s website for its plans, account and support. Prices and availability are confirmed there. No payment is collected on this page.",footer:'Thoughtfully built. Yours to explore.',terms:'Terms',privacy:'Privacy',all:'All products',personal:'Personal',work:'Work & productivity',business:'Business',details:'View details →',visit:'Visit product website ↗',plans:'See plans on product website',back:'← Back to collection',count:'products',trialTerms:'One trial per account. Payment details required when subscriptions open. Cancel before the trial ends to avoid the first charge. Eligible currency conversion and the final amount are shown at checkout.',open:'Open application ↗',notfound:'Product not found.',description:"Explore software, AI products, courses and e-books created by INOSX."},
pt:{education:'Cursos e e-books',partners:'Parcerias',skip:'Ir para os produtos',home:'Sobre a INOSX',help:'Precisa de ajuda?',language:'Idioma',headline:"INOSX Store",intro:"Explore os softwares, produtos de IA, cursos e e-books criados pela INOSX.",browse:'Explore a coleção ↓',featured:'Em destaque',stash:'Dê aos links, vídeos e descobertas salvos no WhatsApp um lugar onde você consegue reencontrá-los.',trial:'7 dias grátis',price:'Depois, US$ 4/mês',preparing:'Assinaturas em preparação. Os pagamentos ainda não estão disponíveis.',discover:'Conheça o Stashmunk ↗',keep:'Guarde. Organize. Reencontre.',collection:'iA coleção',catalog:"Catálogo de produtos",searchLabel:'Buscar produtos',placeholder:'Nome ou ideia…',empty:'Nenhum resultado por aqui.',try:'Tente outra busca ou veja todos os produtos.',reset:'Limpar filtros',how:'Uma Store. O espaço de cada produto.',howBody:'Explore aqui e continue no site do produto para conhecer os planos, acessar sua conta e obter suporte. Preços e disponibilidade são confirmados lá. Esta página não realiza cobranças.',footer:'Feito com cuidado. Pronto para descobrir.',terms:'Termos',privacy:'Privacidade',all:'Todos os produtos',personal:'Pessoal',work:'Trabalho e produtividade',business:'Negócios',details:'Ver detalhes →',visit:'Visitar o site do produto ↗',plans:'Consulte os planos no site do produto',back:'← Voltar à coleção',count:'produtos',trialTerms:'Um teste por conta. Quando as assinaturas abrirem, serão necessários dados de pagamento. Cancele antes do fim do teste para evitar a primeira cobrança. A conversão de moeda elegível e o valor final são exibidos no checkout.',open:'Abrir aplicativo ↗',notfound:'Produto não encontrado.',description:"Explore os softwares, produtos de IA, cursos e e-books criados pela INOSX."},
es:{education:'Cursos y libros digitales',partners:'Alianzas',skip:'Ir a los productos',home:'Sobre INOSX',help:'¿Necesitas ayuda?',language:'Idioma',headline:"INOSX Store",intro:"Explora el software, los productos de IA, los cursos y los libros digitales creados por INOSX.",browse:'Explora la colección ↓',featured:'Destacado',stash:'Dale a tus enlaces, videos y descubrimientos guardados en WhatsApp un lugar donde puedas encontrarlos de nuevo.',trial:'7 días gratis',price:'Después, US$ 4/mes',preparing:'Suscripciones en preparación. Los pagos aún no están disponibles.',discover:'Conoce Stashmunk ↗',keep:'Guarda. Organiza. Redescubre.',collection:'iLa colección',catalog:"Catálogo de productos",searchLabel:'Buscar productos',placeholder:'Nombre o idea…',empty:'No hay resultados.',try:'Prueba otra búsqueda o muestra todos los productos.',reset:'Borrar filtros',how:'Una Store. El espacio de cada producto.',howBody:'Explora aquí y continúa en el sitio del producto para conocer sus planes, acceder a tu cuenta y obtener soporte. Los precios y la disponibilidad se confirman allí. Esta página no realiza cobros.',footer:'Hecho con cuidado. Listo para descubrir.',terms:'Términos',privacy:'Privacidad',all:'Todos los productos',personal:'Personal',work:'Trabajo y productividad',business:'Negocios',details:'Ver detalles →',visit:'Visitar el sitio del producto ↗',plans:'Consulta los planes en el sitio del producto',back:'← Volver a la colección',count:'productos',trialTerms:'Una prueba por cuenta. Al abrir las suscripciones, se requerirán datos de pago. Cancela antes de que termine la prueba para evitar el primer cobro. La conversión de moneda elegible y el importe final se muestran al pagar.',open:'Abrir aplicación ↗',notfound:'Producto no encontrado.',description:"Explora el software, los productos de IA, los cursos y los libros digitales creados por INOSX."}
};
const products=[
{"id": "gda", "name": "Global Dollar Academy", "category": "education", "mark": "GDA", "url": "https://gda.inosx.com/", "desc": ["A course on dollarization and international diversification, with downloadable lesson maps.", "Curso sobre dolarização e diversificação internacional, com mapas de estudo para baixar.", "Curso sobre dolarización y diversificación internacional, con mapas de estudio descargables."]},
{"id": "psf", "name": "Patrimônio sem Fronteiras", "category": "education", "mark": "PSF", "url": "https://psf.gda.inosx.com/", "desc": ["An illustrated e-book by Mario Mayerle on currency exposure and international wealth planning.", "E-book ilustrado de Mario Mayerle sobre exposição cambial e planejamento patrimonial internacional.", "Libro digital ilustrado de Mario Mayerle sobre exposición cambiaria y planificación patrimonial internacional."]},
{"id": "gpa", "name": "Global Pricing Academy", "category": "education", "mark": "GPA", "url": "https://gpa.inosx.com/", "desc": ["A pricing course for digital businesses, with a practical laboratory in the first module.", "Curso de precificação para negócios digitais, com laboratório prático no primeiro módulo.", "Curso de precios para negocios digitales, con un laboratorio práctico en el primer módulo."]},
{id:'stashmunk',name:'Stashmunk',category:'work',url:'https://stashmunk.inosx.com/',desc:['Your WhatsApp self-chat, organized into a personal library. Tags, search, favorites and original links.','Sua conversa consigo mesmo no WhatsApp organizada em uma biblioteca pessoal. Etiquetas, busca, favoritos e links originais.','Tu conversación contigo mismo en WhatsApp organizada en una biblioteca personal. Etiquetas, búsqueda, favoritos y enlaces originales.']},
{id:'agentos',name:'INOSX AgentOS',category:'work',url:'https://agentos.inosx.com/',desc:['Explore the INOSX platform for coordinated AI agent workflows.','Conheça a plataforma INOSX para fluxos de trabalho coordenados com agentes de IA.','Conoce la plataforma INOSX para flujos de trabajo coordinados con agentes de IA.']},
{id:'tubelens',name:'TubeLens',category:'work',url:'https://tubelens.app/',desc:['Explore editorial analysis of YouTube videos, with a focus on clarity, density and credibility.','Explore análises editoriais de vídeos do YouTube com foco em clareza, densidade e credibilidade.','Explora análisis editoriales de videos de YouTube con foco en claridad, densidad y credibilidad.']},
{id:'surveyflow',name:'SurveyFlow',category:'business',url:'https://surveyflow.ai/',desc:['Create surveys and explore feedback with AI-assisted analysis.','Crie pesquisas e explore feedback com análise assistida por IA.','Crea encuestas y explora comentarios con análisis asistido por IA.']},
{id:'datagpt',name:'DataGPT',category:'business',url:'https://datagpt.com.br/',desc:['Explore your business data through natural-language questions.','Explore dados do seu negócio com perguntas em linguagem natural.','Explora los datos de tu negocio con preguntas en lenguaje natural.']},
{id:'messiax',name:'Messiax',category:'personal',url:'https://messiax.ai/',desc:['A space for spiritual reflection and guided conversation.','Um espaço para reflexão espiritual e conversas guiadas.','Un espacio para la reflexión espiritual y las conversaciones guiadas.']},
{id:'psychox',name:'PsychoX',category:'personal',url:'https://psychox.app/',desc:['Explore digital tools for psychological support and well-being.','Explore ferramentas digitais de apoio psicológico e bem-estar.','Explora herramientas digitales de apoyo psicológico y bienestar.']},
{id:'ccoinx',name:'Ccoinx',category:'personal',url:'https://ccoinx.ai/',desc:['Discover camera-assisted currency conversion for prices around you.','Conheça a conversão de moedas com câmera para os preços ao seu redor.','Descubre la conversión de monedas con cámara para los precios a tu alrededor.']},
{id:'tranquilopa',name:'Tranquilopa',category:'personal',url:'https://tranquilopa.com/',desc:['Discover local businesses and services in Paraguay.','Descubra negócios e serviços locais no Paraguai.','Descubre negocios y servicios locales en Paraguay.']}
];
let url=new URL(location.href),lang=Object.hasOwn(copy,url.searchParams.get('lang'))?url.searchParams.get('lang'):'en',category=url.searchParams.get('category')||'all';
const categories = ['all', 'education', 'personal', 'work', 'business'];
if(!categories.includes(category))category='all';
const $=s=>document.querySelector(s),text=k=>copy[lang][k],description=p=>p.desc[['en','pt','es'].indexOf(lang)],normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
function link(path,params={}){const u=new URL(path,location.href);u.hash='';u.searchParams.set('lang',lang);Object.entries(params).forEach(([k,v])=>v?u.searchParams.set(k,v):u.searchParams.delete(k));return u.href}
function node(tag,content,cls){const n=document.createElement(tag);if(content)n.textContent=content;if(cls)n.className=cls;return n}
function anchor(label,href,cls){const n=node('a',label,cls);n.href=href;return n}
function sync(){const u=new URL(location.href);u.searchParams.set('lang',lang);category==='all'?u.searchParams.delete('category'):u.searchParams.set('category',category);$('#search').value?u.searchParams.set('q',$('#search').value):u.searchParams.delete('q');history.replaceState(null,'',u)}
function artwork(product) {
  if (product.mark) {
    const mark = node('span', product.mark, 'book-mark ' + product.id);
    mark.setAttribute('aria-hidden', 'true');
    return mark;
  }
  const img = node('img');
  img.src = product.id === 'stashmunk' ? './stashmunk.png'
    : './icons/' + product.id + (product.id === 'tubelens' ? '.svg' : '.png') + '?v=original';
  img.alt = '';
  img.width = img.height = 80;
  return img;
}

function renderList() {
  const query = normalize($('#search').value.trim());
  const list = products.filter(p =>
    (category === 'all' || p.category === category) &&
    normalize([p.name, p.mark, description(p), text(p.category)].join(' ')).includes(query)
  );
  $('#products').replaceChildren();
  for (const p of list) {
    const detail = link(location.href, {product: p.id}) + '#detail';
    const destination = p.category === 'education' ? p.url : detail;
    const row = node('article', null, 'product');
    const icon = anchor('', destination, 'app-icon ' + p.id);
    icon.setAttribute('aria-label', p.name);
    icon.append(artwork(p));
    const body = node('div');
    const heading = node('h3');
    heading.append(anchor(p.name, destination));
    body.append(heading, node('p', description(p)), node('p', text(p.category), 'category'));
    const actions = node('div', null, 'buy');
    if (p.category === 'education') {
      actions.append(anchor(text('visit'), p.url));
    } else {
      const plans = p.id === 'stashmunk' ? text('trial') + ' · ' + text('price') : text('plans');
      actions.append(node('span', plans), anchor(text('details'), detail));
    }
    row.append(icon, body, actions);
    $('#products').append(row);
  }
  const singular = {en:'product', pt:'produto', es:'producto'};
  $('#count').textContent = list.length + ' ' + (list.length === 1 ? singular[lang] : text('count'));
  $('#empty').hidden = list.length > 0;
  $('.filters').replaceChildren();
  for (const c of categories) {
    const button = node('button', text(c));
    button.type = 'button';
    button.setAttribute('aria-pressed', String(c === category));
    button.onclick = () => {
      category = c;
      sync();
      renderList();
      $('.filters [aria-pressed="true"]').focus({preventScroll:true});
    };
    $('.filters').append(button);
  }
}
function renderDetail(){const id=new URL(location.href).searchParams.get('product');$('#detail').hidden=!id;if(!id)return;const p=products.find(p=>p.id===id);$('#detail').replaceChildren(anchor(text('back'),link(location.href,{product:null})+'#catalog'));if(!p){$('#detail').append(node('h2',text('notfound')));return}const icon=artwork(p);icon.classList.add('detail-icon');$('#detail').append(icon);$('#detail').append(node('h2',p.name),node('p',description(p)));if(p.id==='stashmunk')$('#detail').append(node('p',text('trial')+' · '+text('price')),node('p',text('preparing'),'status'),node('p',text('trialTerms')));else $('#detail').append(node('p',text('plans')));const actions=node('div',null,'detail-actions');actions.append(anchor(text('visit'),p.id==='stashmunk'?link(p.url):p.url,'button'));if(p.id==='stashmunk')actions.append(anchor(text('open'),link('https://web.stashmunk.inosx.com/account')));$('#detail').append(actions);document.title=p.name+' | INOSX Store'}
function render(){document.querySelector('nav').setAttribute('aria-label',{en:'Main navigation',pt:'Navegação principal',es:'Navegación principal'}[lang]);document.querySelectorAll('header .brand,header [data-copy="home"],header [data-copy="partners"],footer .brand,footer [data-copy="terms"],footer [data-copy="privacy"]').forEach(a=>a.href=link(a.getAttribute('href')));document.documentElement.lang={en:'en',pt:'pt-BR',es:'es'}[lang];document.title='INOSX Store';document.querySelector('meta[name=description]').content=text('description');document.querySelectorAll('[data-copy]').forEach(n=>{n.textContent=text(n.dataset.copy)});$('#language').value=lang;$('#search').placeholder=text('placeholder');$('.filters').setAttribute('aria-label',text('all'));$('#featured-link').href=link(location.href,{product:'stashmunk'})+'#detail';renderList();renderDetail()}
$('#search').value=(url.searchParams.get('q')||'').slice(0,120);$('#language').onchange=e=>{lang=e.target.value;sync();render()};$('#search').oninput=()=>{sync();renderList()};$('#reset').onclick=()=>{category='all';$('#search').value='';sync();renderList();$('#search').focus()};render();
