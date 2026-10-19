'use strict';

// Avatares em SVG de segurança caso algum arquivo .png ainda não esteja na pasta ./assets/
const FALLBACK_IDOSO = "data:image/svg+xml;utf8," + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <circle cx="60" cy="60" r="58" fill="#ffeaa7"/>
  <path d="M25 110 C25 82 95 82 95 110" fill="#f6b93b"/>
  <circle cx="60" cy="54" r="26" fill="#ffdbb5"/>
  <path d="M32 48 C30 28 90 28 88 48 C82 36 38 36 32 48 Z" fill="#ffffff"/>
  <circle cx="49" cy="54" r="8" fill="none" stroke="#4a3b7c" stroke-width="3"/>
  <circle cx="71" cy="54" r="8" fill="none" stroke="#4a3b7c" stroke-width="3"/>
  <line x1="57" y1="54" x2="63" y2="54" stroke="#4a3b7c" stroke-width="3"/>
  <circle cx="49" cy="54" r="2.5" fill="#2d2846"/>
  <circle cx="71" cy="54" r="2.5" fill="#2d2846"/>
  <path d="M52 67 Q60 74 68 67" fill="none" stroke="#8c4a32" stroke-width="3" stroke-linecap="round"/>
</svg>`);

const FALLBACK_CUIDADORA = "data:image/svg+xml;utf8," + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <circle cx="60" cy="60" r="58" fill="#e8dffb"/>
  <path d="M28 48 C24 85 36 96 36 96 L84 96 C84 96 96 85 92 48 Z" fill="#6d422a"/>
  <path d="M28 110 C28 84 92 84 92 110" fill="#f6b93b"/>
  <circle cx="60" cy="54" r="24" fill="#f7cba0"/>
  <path d="M35 48 C38 24 82 24 85 48 C72 36 48 36 35 48 Z" fill="#6d422a"/>
  <circle cx="51" cy="54" r="2.5" fill="#2d2846"/>
  <circle cx="69" cy="54" r="2.5" fill="#2d2846"/>
  <path d="M53 65 Q60 71 67 65" fill="none" stroke="#8c4a32" stroke-width="3" stroke-linecap="round"/>
</svg>`);

window.DADOS_MEMORIA = {
  usuario: {
    nome: 'Sr. Antônio',
    idade: '78 anos',
    fraseDia: '“Cada memória é uma história que continua viva.”'
  },
  imagens: {
    logo: './assets/logo.png',
    idosoAceno: './assets/avatar-idoso-aceno.png',
    idosoLivro: './assets/avatar-idoso-livro.png',
    cuidadora: './assets/avatar-cuidadora.png',
    perfil: './assets/avatar-perfil.png',
    idosoJogos: './assets/avatar-idoso-jogos.png',
    idosoMusica: './assets/avatar-idoso-musica.png',
    fallbackIdoso: FALLBACK_IDOSO,
    fallbackCuidadora: FALLBACK_CUIDADORA
  },
  menuPrincipal: [
    { id: 'ia', titulo: 'Conversar com a IA', cor: 'lilac', emoji: '💬', icone: './assets/icone-ia.png' },
    { id: 'jogos', titulo: 'Jogos da Memória', cor: 'yellow', emoji: '🧩', icone: './assets/icone-jogos.png' },
    { id: 'musicas', titulo: 'Músicas Especiais', cor: 'peach', emoji: '🎵', icone: './assets/icone-musicas.png' },
    { id: 'album', titulo: 'Álbum de Memórias', cor: 'blue', emoji: '🖼️', icone: './assets/icone-album.png' },
    { id: 'rotina', titulo: 'Minha Rotina', cor: 'sky', emoji: '📅', icone: './assets/icone-rotina.png' },
    { id: 'atividades', titulo: 'Atividades de Hoje', cor: 'sunny', emoji: '☀️', icone: './assets/icone-atividades.png' }
  ],
  jogos: [
    { id: 'pares', titulo: 'Encontre os Pares', desc: 'Associe as imagens iguais', emoji: '🃏' },
    { id: 'pares', titulo: 'Qual é a Cor?', desc: 'Reconheça e escolha a cor correta', emoji: '🎨' },
    { id: 'pares', titulo: 'Organize os Objetos', desc: 'Arraste para o lugar certo', emoji: '🧺' },
    { id: 'pares', titulo: 'Sequência Lógica', desc: 'Complete a ordem', emoji: '🔢' },
    { id: 'pares', titulo: 'Que Som é Esse?', desc: 'Ouça e escolha a imagem', emoji: '🎶' }
  ],
  musicas: [
    { id: 1, artista: 'Chico Buarque', titulo: 'Construção', duracao: '6:24' },
    { id: 2, artista: 'Roberto Carlos', titulo: 'Como é grande o meu amor', duracao: '4:18' },
    { id: 3, artista: 'Milton Nascimento', titulo: 'Clube da Esquina', duracao: '3:52' },
    { id: 4, artista: 'Músicas da Família', titulo: 'Suas músicas personalizadas', duracao: 'Playlist' }
  ],
  fotos: [
    { id: 1, titulo: 'Juventude em família', categoria: 'Família', src: './assets/foto-casal.png', emoji: '👫' },
    { id: 2, titulo: 'Tarde com a neta', categoria: 'Família', src: './assets/foto-neta.png', emoji: '👴👧' },
    { id: 3, titulo: 'Viagem para a praia', categoria: 'Viagens', src: './assets/foto-praia.png', emoji: '🏖️' },
    { id: 4, titulo: 'Nosso amigo fiel', categoria: 'Família', src: './assets/foto-cachorro.png', emoji: '🐶' }
  ],
  rotina: [
    { hora: '08:00', titulo: 'Café da manhã', emoji: '☕', feito: true },
    { hora: '09:30', titulo: 'Caminhada', emoji: '👟', feito: true },
    { hora: '10:30', titulo: 'Atividade cognitiva', emoji: '🧠', feito: false },
    { hora: '12:00', titulo: 'Almoço', emoji: '🍴', feito: false },
    { hora: '14:00', titulo: 'Descanso', emoji: '🛋️', feito: false },
    { hora: '15:30', titulo: 'Música especial', emoji: '🎵', feito: false },
    { hora: '17:00', titulo: 'Tempo em família', emoji: '👨‍👩‍👧', feito: false }
  ],
  atividadesHoje: [
    { titulo: 'Observar fotos antigas', desc: 'Relembre momentos especiais', emoji: '🖼️', destino: 'album' },
    { titulo: 'Ouvir música favorita', desc: 'Escolhi uma música que você gosta', emoji: '🎵', destino: 'musicas' },
    { titulo: 'Jogo da memória', desc: 'Vamos exercitar juntos?', emoji: '🧩', destino: 'pares' },
    { titulo: 'Cuidar das plantas', desc: 'Que tal regar suas plantas?', emoji: '🌱', destino: 'rotina' }
  ],
  respostasIA: {
    padrao: 'Entendo sua preocupação. Algumas estratégias que podem ajudar são: manter um ambiente tranquilo, usar músicas que a pessoa gosta, oferecer atividades familiares e observar se há desconfortos físicos. Quer que eu sugira uma atividade tranquila para este momento?',
    sugestao: 'Uma ótima opção para agora é abrir o Álbum de Memórias ou colocar as Músicas Especiais do Roberto Carlos em volume baixinho para trazer acolhimento e segurança.'
  }
};