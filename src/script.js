// Contadores de vitórias e derrotas
let vitorias = 0;
let derrotas = 0;

// Elementos do DOM
const painelHistorico = document.getElementById("painel-historico");
const rankingContainer = document.getElementById('ranking-content');

// Carrega jogadores salvos
let jogadores = loadJogadores();

// Solicita nome do jogador
let nameJogador = prompt("Qual é o seu nome?");
document.getElementById("nome-jogador").innerText = nameJogador;

// Carrega jogadores do localStorage
function loadJogadores() {
  const data = localStorage.getItem('jogadores');
  return data ? JSON.parse(data) : [];
}

// Salva jogadores no localStorage
function saveJogadores() {
  localStorage.setItem('jogadores', JSON.stringify(jogadores));
}

// Função principal do jogo
function jogar() {
  const opcoes = ["electro", "hydro", "pyro"];
  const jogador = prompt(`${nameJogador}, escolha: electro, hydro ou pyro`).toLowerCase();

  if (!opcoes.includes(jogador)) {
    alert("Escolha inválida!");
    return;
  }

  const computador = opcoes[Math.floor(Math.random() * 3)];
  let resultado = "";

  if (jogador === computador) {
    resultado = "Empate!";
  } else if (
    (jogador === "electro" && computador === "hydro") ||
    (jogador === "hydro" && computador === "pyro") ||
    (jogador === "pyro" && computador === "electro")
  ) {
    resultado = "Você venceu!";
    vitorias++;
  } else {
    resultado = "Você perdeu!";
    derrotas++;
  }

  alert(`Você escolheu ${jogador}.\nComputador escolheu ${computador}.\n${resultado}`);

  atualizarPlacar();
  atualizarJogador(nameJogador, vitorias, vitorias + derrotas);
}

// Atualiza placar na interface
function atualizarPlacar() {
  document.getElementById("vitorias").innerText = vitorias;
  document.getElementById("derrotas").innerText = derrotas;
}

// Atualiza dados do jogador
function atualizarJogador(nome, vitorias, partidas) {
  const index = jogadores.findIndex(j => j.nome === nome);

  if (index !== -1) {
    jogadores[index].vitorias = vitorias;
    jogadores[index].partidas = partidas;
  } else {
    jogadores.push({ nome, vitorias, partidas });
  }

  saveJogadores();
  updateRanking(jogadores);
}

// Mostra painel de histórico
function mostrarHistorico() {
  painelHistorico.style.display = "block";
}

// Fecha painel de histórico
function fecharHistorico() {
  painelHistorico.style.display = "none";
}

// Fechar histórico ao clicar fora
document.addEventListener('click', function (event) {
  if (event.target === painelHistorico) fecharHistorico();
});

// Atualiza o ranking animado
function updateRanking(players) {
  const top = players.sort((a, b) => b.vitorias - a.vitorias).slice(0, 10);

  rankingContainer.innerHTML = top.map((p, i) =>
    `<span class="ranking-item">${i + 1}º ${p.nome} (${p.vitorias}/${p.partidas})</span>`
  ).join('');

  // Reinicia a animação
  rankingContainer.style.animation = 'none';
  void rankingContainer.offsetWidth; // forçar reflow
  rankingContainer.style.animation = 'scroll 12s linear infinite';
}

// Atualiza ranking a cada 30s
setInterval(() => updateRanking(jogadores), 30000);
updateRanking(jogadores);

// Resetar histórico
function resetarHistorico() {
  if (!confirm('Tem certeza que quer resetar todo o histórico?')) return;

  localStorage.removeItem('jogadores');
  jogadores = [];
  vitorias = 0;
  derrotas = 0;

  atualizarPlacar();
  updateRanking(jogadores);

  alert('Histórico resetado com sucesso!');
}
