const livros = {
  "vida": {
    "titulo": "Utilizando o ChatGPT para Transformar Sua Vida",
    "autor": "Mario Mayerle Filho",
    "descricao": "Aplicações do ChatGPT em tarefas do dia a dia, da formulação de perguntas à revisão de textos.",
    "url": "https://clubedeautores.com.br/livro/utilizando-o-chatgpt-para-mudar-sua-vida",
    "link": "Conhecer a edição"
  },
  "planta": {
    "titulo": "Entre quatro paredes",
    "autor": "Lívia Valença Prado",
    "descricao": "Duas plantas para um mesmo apartamento. Ao acompanhar o percurso da porta de entrada à mesa de jantar, o leitor descobre como circulação, luz e mobiliário mudam o uso de uma casa."
  },
  "prompts": {
    "titulo": "+ de Mil Prompts: O Guia Definitivo para Dominar o ChatGPT",
    "autor": "Mario Mayerle Filho",
    "descricao": "Uma coleção de comandos para aplicar o ChatGPT à escrita, ao ensino e a atividades de diferentes profissões.",
    "url": "https://hotmart.com/pt-br/marketplace/produtos/de-1-000-prompts-para-o-chat-gpt/Y84052364Y",
    "link": "Ver o e-book"
  },
  "operacao": {
    "titulo": "Onde a fila começa",
    "autor": "Caio Souto Veras",
    "descricao": "Um pedido chega atrasado mesmo depois de sair da fábrica no horário previsto. A investigação percorre o balcão, o estoque e a expedição para ensinar a localizar o gargalo antes de contratar mais gente."
  },
  "api": {
    "titulo": "API ChatGPT: Guia Prático Para Integrar a API do ChatGPT em Seus Projetos",
    "autor": "Mario Mayerle Filho",
    "descricao": "Guia de integração da API do ChatGPT a projetos de software, com exemplos de aplicações e orientações de implementação.",
    "url": "https://mariomayerle.com/pt#publications",
    "link": "Ver no catálogo do autor"
  },
  "patrimonio": {
    "titulo": "Patrimônio sem Fronteiras",
    "autor": "Mario Mayerle",
    "descricao": "Em 16 capítulos ilustrados, Mario Mayerle usa situações do cotidiano para falar de patrimônio.",
    "url": "https://psf.gda.inosx.com/",
    "link": "Conhecer a edição"
  },
  "ensino": {
    "titulo": "Depois da aula",
    "autor": "Elisa Noronha Vale",
    "descricao": "Uma professora recolhe três respostas para a mesma pergunta. A partir delas, redesenha a aula seguinte. Um guia para transformar rascunhos, erros e perguntas dos alunos em decisões de ensino."
  },
  "mapas": {
    "titulo": "Mapas Mentais do ChatGPT: Coleção Completa",
    "autor": "Mario Mayerle Filho",
    "descricao": "Coleção visual de mapas mentais para consultar conceitos do ChatGPT, organizar perguntas e explorar aplicações.",
    "url": "https://mariomayerle.com/pt#publications",
    "link": "Ver no catálogo do autor"
  },
  "curso": {
    "titulo": "Curso de Inteligência Artificial e Aprendizado de Máquina: Fundamentos e Aplicações",
    "autor": "Mario Mayerle Filho",
    "descricao": "Uma introdução aos fundamentos da inteligência artificial e do aprendizado de máquina e a suas aplicações.",
    "url": "https://mariomayerle.com/pt#publications",
    "link": "Ver no catálogo do autor"
  }
};

const ficha = document.querySelector('#ficha');
document.querySelectorAll('[data-livro]').forEach(capa => {
  capa.addEventListener('click', () => {
    const livro = livros[capa.dataset.livro];
    ficha.querySelector('#ficha-titulo').textContent = livro.titulo;
    ficha.querySelector('#ficha-autor').textContent = livro.autor;
    ficha.querySelector('#ficha-tipo').textContent = livro.url ? 'Livro publicado' : 'Conceito editorial · autoria fictícia';
    ficha.querySelector('#ficha-descricao').textContent = livro.descricao;
    const link = ficha.querySelector('#ficha-link');
    link.hidden = !livro.url;
    if (livro.url) {
      link.href = livro.url;
      link.textContent = livro.link + ' ↗';
    } else {
      link.removeAttribute('href');
      link.textContent = '';
    }
    ficha.showModal();
  });
});

const estante = document.querySelector('.shelf-scroll');
const anterior = document.querySelector('#anterior');
const proximo = document.querySelector('#proximo');
function sincronizarSetas() {
  anterior.disabled = estante.scrollLeft < 2;
  proximo.disabled = estante.scrollLeft + estante.clientWidth >= estante.scrollWidth - 2;
}
function percorrer(direcao) {
  const largura = estante.querySelector('li').getBoundingClientRect().width;
  const livrosVisiveis = Math.max(1, Math.floor(estante.clientWidth / largura) - 1);
  estante.scrollBy({left: direcao * livrosVisiveis * largura, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
}
anterior.addEventListener('click', () => percorrer(-1));
proximo.addEventListener('click', () => percorrer(1));
estante.addEventListener('scroll', sincronizarSetas, {passive:true});
new ResizeObserver(sincronizarSetas).observe(estante);
sincronizarSetas();
