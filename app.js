'use strict';

const app = document.getElementById('app');
const D = window.DADOS_MEMORIA;

const state = {
  tela: 'splash',
  historico: [],
  perfilUso: 'idoso',
  filtroFoto: 'Todas',
  musicaTocando: null,
  humorDiario: 'Bem',
  noturno: false,
  vozAlta: true,
  tamanhoFonte: 'M',
  mensagensIA: [
    { autor: 'ia', texto: 'Olá! Eu sou o Memória Viva. Estou aqui para responder suas dúvidas, dar orientações e encontrar atividades que possam ajudar no dia a dia.' },
    { autor: 'user', texto: 'Como posso acalmar uma pessoa com Alzheimer que está agitada?' },
    { autor: 'ia', texto: D.respostasIA.padrao }
  ],
  cartas: [
    { id: 0, emoji: '🍌', virada: true, par: true },
    { id: 1, emoji: '🍌', virada: true, par: true },
    { id: 2, emoji: '🍎', virada: false, par: false },
    { id: 3, emoji: '🍎', virada: true, par: false },
    { id: 4, emoji: '🌻', virada: false, par: false },
    { id: 5, emoji: '🌻', virada: false, par: false }
  ],
  cartaSelecionada: 3
};

function imgAvatar(src, alt, classe, tipo) {
  const cls = classe || 'avatar-img';
  const tp = tipo || 'idoso';
  const fallback = tp === 'cuidadora' ? D.imagens.fallbackCuidadora : D.imagens.fallbackIdoso;
  return '<img src="' + src + '" alt="' + alt + '" class="' + cls + '" onerror="this.onerror=null;this.src=\'' + fallback + '\'">';
}

function irPara(tela, guardar) {
  const deveGuardar = guardar !== undefined ? guardar : true;
  if (deveGuardar && state.tela !== tela) state.historico.push(state.tela);
  state.tela = tela;
  render();
  window.scrollTo(0, 0);
}

function voltar() {
  const anterior = state.historico.pop() || 'home';
  irPara(anterior, false);
}

function topBar(titulo, mostrarConfig) {
  const configBtn = mostrarConfig
    ? '<button class="icon-btn" data-go="perfil" aria-label="Perfil">⚙️</button>'
    : '<span></span>';
  return (
    '<header class="topbar">' +
      '<button class="icon-btn" data-action="voltar" aria-label="Voltar">‹</button>' +
      '<h1>' + titulo + '</h1>' +
      configBtn +
    '</header>'
  );
}

function bottomNav(ativo) {
  const abas = [
    { id: 'home', label: 'Início', icon: '🏠' },
    { id: 'musicas', label: 'Favoritos', icon: '💜' },
    { id: 'diario', label: 'Diário', icon: '📖' },
    { id: 'perfil', label: 'Perfil', icon: '👤' }
  ];
  return (
    '<nav class="bottom-nav">' +
      abas.map(function(a) {
        return (
          '<button class="nav-item ' + (ativo === a.id ? 'active' : '') + '" data-go="' + a.id + '">' +
            '<span class="nav-icon">' + a.icon + '</span>' +
            '<span>' + a.label + '</span>' +
          '</button>'
        );
      }).join('') +
    '</nav>'
  );
}

const telas = {
  splash: function() {
    return (
      '<div class="phone-frame splash-screen">' +
        '<div class="splash-content">' +
          '<div class="brand-title">' +
            '<span class="purple">Memória</span>' +
            '<span class="yellow">Viva <span class="heart-badge">💜</span></span>' +
          '</div>' +
          '<p class="splash-sub">Tecnologia que acolhe<br>memórias que conectam.</p>' +
          '<div class="splash-hero">' +
            imgAvatar(D.imagens.idosoAceno, 'Sr. Antônio acenando', 'hero-avatar') +
          '</div>' +
          '<button class="btn-primary btn-large" data-go="escolha">Começar ➜</button>' +
        '</div>' +
      '</div>'
    );
  },

  escolha: function() {
    return (
      '<div class="phone-frame">' +
        topBar('') +
        '<div class="center-heart">💜</div>' +
        '<h2 class="screen-title">Quem está usando<br>o aplicativo hoje?</h2>' +
        '<div class="role-list">' +
          '<button class="role-card role-yellow" data-role="idoso">' +
            imgAvatar(D.imagens.idosoLivro, 'Pessoa idosa', 'role-avatar') +
            '<div class="role-info">' +
              '<h3>Sou a pessoa idosa</h3>' +
              '<p>Atividades, jogos e momentos especiais.</p>' +
            '</div>' +
            '<span class="circle-arrow">➜</span>' +
          '</button>' +
          '<button class="role-card role-lilac" data-role="cuidador">' +
            imgAvatar(D.imagens.cuidadora, 'Cuidadora', 'role-avatar', 'cuidadora') +
            '<div class="role-info">' +
              '<h3>Sou o cuidador(a)</h3>' +
              '<p>Informações, organização e acompanhamento.</p>' +
            '</div>' +
            '<span class="circle-arrow">➜</span>' +
          '</button>' +
        '</div>' +
      '</div>'
    );
  },

  home: function() {
    return (
      '<div class="phone-frame with-nav">' +
        '<header class="home-header">' +
          imgAvatar(D.imagens.perfil, 'Sr. Antônio', 'avatar-round') +
          '<div class="home-greeting">' +
            '<strong>Olá, ' + D.usuario.nome + '!</strong>' +
            '<span>Que bom te ver por aqui!</span>' +
          '</div>' +
          '<button class="icon-btn" data-go="perfil" aria-label="Configurações">⚙️</button>' +
        '</header>' +
        '<div class="quote-pill">' + D.usuario.fraseDia + ' 🧡</div>' +
        '<div class="menu-grid">' +
          D.menuPrincipal.map(function(item) {
            return (
              '<button class="menu-card ' + item.cor + '" data-go="' + item.id + '">' +
                '<div class="menu-icon-wrap">' +
                  '<img src="' + item.icone + '" alt="" class="menu-img" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\'">' +
                  '<span class="menu-emoji" style="display:none">' + item.emoji + '</span>' +
                '</div>' +
                '<strong>' + item.titulo + '</strong>' +
              '</button>'
            );
          }).join('') +
        '</div>' +
        bottomNav('home') +
      '</div>'
    );
  },

  ia: function() {
    return (
      '<div class="phone-frame chat-frame">' +
        '<header class="topbar topbar-purple">' +
          '<button class="icon-btn white" data-action="voltar">←</button>' +
          '<div>' +
            '<strong>Memória Viva</strong>' +
            '<small>Assistente Virtual</small>' +
          '</div>' +
          '<button class="icon-btn white" data-go="perfil">⚙️</button>' +
        '</header>' +
        '<div class="chat-box">' +
          state.mensagensIA.map(function(m) {
            return (
              '<div class="chat-row ' + m.autor + '">' +
                (m.autor === 'ia' ? imgAvatar(D.imagens.perfil, 'Assistente', 'chat-avatar') : '') +
                '<div class="chat-bubble">' + m.texto + '</div>' +
              '</div>'
            );
          }).join('') +
          '<div class="chat-chips">' +
            '<button class="chip" data-chat="Sim, por favor!">Sim, por favor!</button>' +
            '<button class="chip outline" data-chat="Outra pergunta">Outra pergunta</button>' +
          '</div>' +
        '</div>' +
        '<form class="chat-input" id="form-ia">' +
          '<input type="text" id="input-ia" placeholder="Digite sua mensagem..." required>' +
          '<button type="submit" class="circle-arrow">➤</button>' +
        '</form>' +
      '</div>'
    );
  },

  jogos: function() {
    return (
      '<div class="phone-frame">' +
        topBar('Jogos da Memória') +
        '<div class="hero-banner">' +
          imgAvatar(D.imagens.idosoJogos, 'Sr. Antônio', 'banner-avatar') +
          '<div class="speech-bubble">Vamos exercitar o cérebro? Escolha um jogo!</div>' +
        '</div>' +
        '<div class="list-cards">' +
          D.jogos.map(function(j) {
            return (
              '<button class="list-item" data-go="' + j.id + '">' +
                '<span class="item-emoji">' + j.emoji + '</span>' +
                '<div class="item-text">' +
                  '<strong>' + j.titulo + '</strong>' +
                  '<small>' + j.desc + '</small>' +
                '</div>' +
                '<span class="chevron">›</span>' +
              '</button>'
            );
          }).join('') +
        '</div>' +
      '</div>'
    );
  },

  pares: function() {
    const paresFeitos = state.cartas.filter(function(c) { return c.par; }).length / 2;
    return (
      '<div class="phone-frame">' +
        topBar('Encontre os Pares') +
        '<div class="progress-card">' +
          '<div class="progress-top">' +
            '<strong>Nível 1</strong>' +
            '<span>' + paresFeitos + '/3</span>' +
          '</div>' +
          '<div class="progress-bar"><div class="progress-fill" style="width:' + ((paresFeitos / 3) * 100) + '%"></div></div>' +
        '</div>' +
        '<div class="pairs-grid">' +
          state.cartas.map(function(c, idx) {
            const mostrar = c.virada || c.par;
            return (
              '<button class="pair-card ' + (mostrar ? 'flipped' : '') + '" data-card="' + idx + '">' +
                (mostrar ? '<span class="pair-emoji">' + c.emoji + '</span>' : '<span class="pair-heart">💜</span>') +
              '</button>'
            );
          }).join('') +
        '</div>' +
        '<div class="encourage-footer">' +
          '<div class="speech-bubble">Muito bem! Você está indo super bem! 🧡</div>' +
          imgAvatar(D.imagens.idosoAceno, 'Sr. Antônio', 'banner-avatar') +
        '</div>' +
      '</div>'
    );
  },

  musicas: function() {
    return (
      '<div class="phone-frame with-nav">' +
        topBar('Músicas Especiais') +
        '<div class="hero-banner">' +
          imgAvatar(D.imagens.idosoMusica, 'Sr. Antônio com fones', 'banner-avatar') +
          '<div class="speech-bubble">Música também é memória! Que tal ouvir uma música hoje?</div>' +
        '</div>' +
        '<div class="list-cards">' +
          D.musicas.map(function(m) {
            return (
              '<div class="list-item">' +
                '<span class="item-emoji">🎶</span>' +
                '<div class="item-text">' +
                  '<strong>' + m.artista + '</strong>' +
                  '<small>' + m.titulo + ' · ' + m.duracao + '</small>' +
                '</div>' +
                '<button class="play-btn" data-play="' + m.id + '">' +
                  (state.musicaTocando === m.id ? '⏸' : '▶') +
                '</button>' +
              '</div>'
            );
          }).join('') +
        '</div>' +
        bottomNav('musicas') +
      '</div>'
    );
  },

  album: function() {
    const fotosFiltradas = state.filtroFoto === 'Todas'
      ? D.fotos
      : D.fotos.filter(function(f) { return f.categoria === state.filtroFoto; });

    return (
      '<div class="phone-frame">' +
        topBar('Álbum de Memórias') +
        '<div class="filter-pills">' +
          ['Todas', 'Família', 'Viagens'].map(function(cat) {
            return '<button class="pill ' + (state.filtroFoto === cat ? 'active' : '') + '" data-filter="' + cat + '">' + cat + '</button>';
          }).join('') +
        '</div>' +
        '<div class="album-grid">' +
          fotosFiltradas.map(function(f) {
            return (
              '<div class="photo-card">' +
                '<img src="' + f.src + '" alt="' + f.titulo + '" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
                '<div class="photo-fallback" style="display:none">' + f.emoji + '</div>' +
                '<span>' + f.titulo + '</span>' +
              '</div>'
            );
          }).join('') +
        '</div>' +
        '<p class="footer-note">Cada foto é uma memória que continua viva. 💜</p>' +
      '</div>'
    );
  },

  rotina: function() {
    return (
      '<div class="phone-frame">' +
        topBar('Minha Rotina') +
        '<div class="date-banner">' +
          '<strong>Hoje</strong>' +
          '<small>18 de outubro de 2026</small>' +
        '</div>' +
        '<div class="routine-list">' +
          D.rotina.map(function(r, i) {
            return (
              '<label class="routine-item ' + (r.feito ? 'done' : '') + '">' +
                '<span class="routine-time">' + r.hora + '</span>' +
                '<span class="routine-emoji">' + r.emoji + '</span>' +
                '<strong class="routine-title">' + r.titulo + '</strong>' +
                '<input type="checkbox" data-routine="' + i + '" ' + (r.feito ? 'checked' : '') + '>' +
              '</label>'
            );
          }).join('') +
        '</div>' +
      '</div>'
    );
  },

  atividades: function() {
    return (
      '<div class="phone-frame">' +
        topBar('Atividades de Hoje') +
        '<div class="hero-banner">' +
          imgAvatar(D.imagens.idosoAceno, 'Sr. Antônio', 'banner-avatar') +
          '<div class="speech-bubble">Hoje separei algumas atividades especiais para você!</div>' +
        '</div>' +
        '<div class="list-cards">' +
          D.atividadesHoje.map(function(a) {
            return (
              '<button class="list-item" data-go="' + a.destino + '">' +
                '<span class="item-emoji">' + a.emoji + '</span>' +
                '<div class="item-text">' +
                  '<strong>' + a.titulo + '</strong>' +
                  '<small>' + a.desc + '</small>' +
                '</div>' +
                '<span class="chevron">›</span>' +
              '</button>'
            );
          }).join('') +
        '</div>' +
      '</div>'
    );
  },

  diario: function() {
    const humores = [
      ['Calmo', '😊'],
      ['Bem', '😄'],
      ['Agitado', '😟'],
      ['Triste', '😢']
    ];
    return (
      '<div class="phone-frame with-nav">' +
        topBar('Diário do Cuidador') +
        '<div class="diary-card">' +
          '<h3>Como foi o dia?</h3>' +
          '<div class="mood-row">' +
            humores.map(function(item) {
              const label = item[0];
              const emoji = item[1];
              return (
                '<button class="mood-btn ' + (state.humorDiario === label ? 'active' : '') + '" data-mood="' + label + '">' +
                  '<span>' + emoji + '</span>' +
                  '<small>' + label + '</small>' +
                '</button>'
              );
            }).join('') +
          '</div>' +
          '<h3>Observações</h3>' +
          '<textarea class="diary-input" rows="3" placeholder="Escreva aqui como foi o dia, o que funcionou bem..."></textarea>' +
          '<button class="btn-primary full" data-action="salvar-diario">Salvar registro</button>' +
          '<div id="diario-msg" class="save-msg"></div>' +
        '</div>' +
        bottomNav('diario') +
      '</div>'
    );
  },

  perfil: function() {
    return (
      '<div class="phone-frame with-nav">' +
        topBar('Meu Perfil') +
        '<div class="profile-box">' +
          imgAvatar(D.imagens.perfil, 'Sr. Antônio', 'profile-avatar') +
          '<h2>' + D.usuario.nome + '</h2>' +
          '<p>' + D.usuario.idade + '</p>' +
        '</div>' +
        '<div class="diary-card">' +
          '<h3>Meus interesses</h3>' +
          '<div class="interests-grid">' +
            '<span>🎵 Música</span>' +
            '<span>👨‍👩‍👧 Família</span>' +
            '<span>🌱 Jardinagem</span>' +
            '<span>🐶 Animais</span>' +
            '<span>✈️ Viagens</span>' +
            '<span>🍎 Culinária</span>' +
          '</div>' +
          '<h3>Preferências</h3>' +
          '<label class="pref-row">' +
            '<span>🌙 Modo noturno</span>' +
            '<input type="checkbox" data-pref="noturno" ' + (state.noturno ? 'checked' : '') + '>' +
          '</label>' +
          '<label class="pref-row">' +
            '<span>🔊 Leitura em voz alta</span>' +
            '<input type="checkbox" data-pref="vozAlta" ' + (state.vozAlta ? 'checked' : '') + '>' +
          '</label>' +
        '</div>' +
        bottomNav('perfil') +
      '</div>'
    );
  }
};

function render() {
  document.body.classList.toggle('dark-mode', state.noturno);
  const fn = telas[state.tela] || telas.home;
  app.innerHTML = fn();
}

app.addEventListener('click', function(e) {
  const btn = e.target.closest('[data-go],[data-action],[data-role],[data-card],[data-play],[data-filter],[data-mood],[data-chat]');
  if (!btn) return;

  if (btn.dataset.go) return irPara(btn.dataset.go);
  if (btn.dataset.action === 'voltar') return voltar();
  if (btn.dataset.action === 'salvar-diario') {
    const msg = document.getElementById('diario-msg');
    if (msg) msg.textContent = 'Registro salvo com sucesso! 💜';
    return;
  }
  if (btn.dataset.role) {
    state.perfilUso = btn.dataset.role;
    return irPara(btn.dataset.role === 'cuidador' ? 'diario' : 'home');
  }
  if (btn.dataset.play) {
    const id = Number(btn.dataset.play);
    state.musicaTocando = state.musicaTocando === id ? null : id;
    return render();
  }
  if (btn.dataset.filter) {
    state.filtroFoto = btn.dataset.filter;
    return render();
  }
  if (btn.dataset.mood) {
    state.humorDiario = btn.dataset.mood;
    return render();
  }
  if (btn.dataset.chat) {
    state.mensagensIA.push({ autor: 'user', texto: btn.dataset.chat });
    state.mensagensIA.push({ autor: 'ia', texto: D.respostasIA.sugestao });
    return render();
  }
  if (btn.dataset.card !== undefined) {
    const idx = Number(btn.dataset.card);
    const carta = state.cartas[idx];
    if (carta.par || carta.virada) return;
    carta.virada = true;
    if (state.cartaSelecionada === null) {
      state.cartaSelecionada = idx;
    } else {
      const ant = state.cartas[state.cartaSelecionada];
      if (ant.emoji === carta.emoji) {
        ant.par = true;
        carta.par = true;
      } else {
        setTimeout(function() {
          ant.virada = false;
          carta.virada = false;
          render();
        }, 700);
      }
      state.cartaSelecionada = null;
    }
    render();
  }
});

app.addEventListener('change', function(e) {
  if (e.target.dataset.routine !== undefined) {
    const idx = Number(e.target.dataset.routine);
    D.rotina[idx].feito = e.target.checked;
    render();
  }
  if (e.target.dataset.pref) {
    state[e.target.dataset.pref] = e.target.checked;
    render();
  }
});

app.addEventListener('submit', function(e) {
  if (e.target.id === 'form-ia') {
    e.preventDefault();
    const input = document.getElementById('input-ia');
    const txt = input.value.trim();
    if (!txt) return;
    state.mensagensIA.push({ autor: 'user', texto: txt });
    state.mensagensIA.push({ autor: 'ia', texto: D.respostasIA.sugestao });
    render();
  }
});

render();