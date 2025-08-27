// 
// PROJETO: ADIVINHE A COR!
//
// Desenvolvido como parte da Situação de Aprendizagem
// "Componente Interativo de Cores".
//

// --- SELEÇÃO DOS ELEMENTOS DO DOM ---
// Armazena referências aos elementos HTML que serão manipulados.
// Isso melhora a performance, pois não precisamos buscar os elementos toda hora.
const colorCodeElement = document.getElementById('color-code');
const optionsContainer = document.getElementById('options-container');
const scoreElement = document.getElementById('score');
const roundElement = document.getElementById('round');
const feedbackMessageElement = document.getElementById('feedback-message');
const resetButton = document.getElementById('reset-button');

/**
 * @class Game
 * Responsabilidade: Encapsular toda a lógica e o estado do jogo.
 * Isso torna o código mais organizado e segue os princípios da
 * Programação Orientada a Objetos (POO).
 */
class Game {
    /**
     * Inicializa o estado do jogo.
     */
    constructor() {
        this.optionsCount = 4;      // Número de opções de cores
        this.colors = [];           // Array com as cores da rodada
        this.correctColor = null;   // A cor correta da rodada
        this.score = 0;             // Pontuação do jogador
        this.round = 1;             // Rodada atual
    }

    /**
     * Gera uma string de cor hexadecimal aleatória (ex: "#1A2B3C").
     * @returns {string} Uma nova cor hexadecimal.
     */
    generateRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    /**
     * Prepara a lógica para uma nova rodada do jogo.
     * Limpa as cores antigas, gera um novo conjunto de cores aleatórias
     * e seleciona uma delas para ser a correta.
     */
    startNewRound() {
        this.colors = [];
        for (let i = 0; i < this.optionsCount; i++) {
            this.colors.push(this.generateRandomColor());
        }
        const correctColorIndex = Math.floor(Math.random() * this.optionsCount);
        this.correctColor = this.colors[correctColorIndex];
    }
}

// --- FUNÇÕES DE MANIPULAÇÃO DO DOM ---

/**
 * @function renderGame
 * Responsabilidade: Atualizar a interface do usuário (UI) com base nos
 * dados atuais do objeto 'game'.
 * @param {Game} game - A instância do jogo contendo o estado atual.
 */
function renderGame(game) {
    // Atualiza os textos de placar, rodada e o código da cor
    scoreElement.textContent = game.score;
    roundElement.textContent = game.round;
    colorCodeElement.textContent = game.correctColor;

    // Limpa as opções da rodada anterior
    optionsContainer.innerHTML = '';

    // Cria e insere os novos elementos de opção de cor
    game.colors.forEach(color => {
        const colorOption = document.createElement('div');
        colorOption.classList.add('color-option');
        colorOption.style.backgroundColor = color;
        // Armazena a cor no 'dataset' para fácil verificação no clique
        colorOption.dataset.color = color;
        optionsContainer.appendChild(colorOption);
    });
}

/**
 * @function handleOptionClick
 * Responsabilidade: Processar a lógica quando o usuário clica em uma opção de cor.
 * @param {Event} event - O objeto do evento de clique.
 */
function handleOptionClick(event) {
    const clickedElement = event.target;
    // Verifica se o clique foi de fato em uma 'color-option'
    if (clickedElement.classList.contains('color-option')) {
        // Desabilita cliques futuros para evitar múltiplas respostas
        optionsContainer.style.pointerEvents = 'none';

        const chosenColor = clickedElement.dataset.color;

        // Compara a cor escolhida com a correta e dá o feedback
        if (chosenColor === jogo.correctColor) {
            feedbackMessageElement.textContent = "Correto!";
            feedbackMessageElement.style.color = '#28a745';
            jogo.score++; // Incrementa a pontuação
            scoreElement.textContent = jogo.score; // Atualiza o placar na UI
        } else {
            feedbackMessageElement.textContent = "Incorreto!";
            feedbackMessageElement.style.color = '#dc3545';
        }

        // Revela o botão para avançar a rodada
        resetButton.classList.add('visible');
    }
}

/**
 * @function handleResetClick
 * Responsabilidade: Iniciar a próxima rodada do jogo quando o botão é clicado.
 */
function handleResetClick() {
    jogo.round++;
    jogo.startNewRound();
    renderGame(jogo);

    // Reseta a interface para o estado inicial da rodada
    feedbackMessageElement.textContent = '';
    resetButton.classList.remove('visible');
    optionsContainer.style.pointerEvents = 'auto'; // Reabilita os cliques
}

// --- INICIALIZAÇÃO E EVENT LISTENERS ---

// Cria a instância principal do jogo
const jogo = new Game();

// Adiciona os "escutadores" de eventos aos elementos interativos
optionsContainer.addEventListener('click', handleOptionClick);
resetButton.addEventListener('click', handleResetClick);

// Inicia o jogo assim que a página é carregada
document.addEventListener('DOMContentLoaded', () => {
    jogo.startNewRound();
    renderGame(jogo);
});