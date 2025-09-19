// Obtém o elemento do display do HTML
const display = document.getElementById('display');

// Variável para armazenar o valor atual no display
let currentInput = '0';

// NOVO: Define uma lista de operadores para facilitar a verificação
const operators = ['+', '-', '*', '/'];

// Função para adicionar um valor (número ou operador) ao display
function appendValue(value) {
    // Se o display mostra 'Erro', reseta antes de adicionar novo valor
    if (currentInput === 'Erro') {
        currentInput = '0';
    }

    // CORREÇÃO 1: Lógica para evitar operadores duplicados
    // Verifica se o valor a ser adicionado é um operador
    if (operators.includes(value)) {
        // Pega o último caractere do input atual
        const lastChar = currentInput[currentInput.length - 1];

        // Se o último caractere também for um operador, substitui pelo novo
        if (operators.includes(lastChar)) {
            currentInput = currentInput.slice(0, -1) + value;
        } else {
            currentInput += value;
        }
    } 
    // Se não for um operador, é um número ou ponto decimal
    else {
        // Se o display mostra '0', substitui pelo novo valor (a menos que seja um '.')
        if (currentInput === '0' && value !== '.') {
            currentInput = value;
        } else {
            currentInput += value;
        }
    }
    
    updateDisplay();
}

// Função para limpar o display e resetar para '0'
function clearDisplay() {
    currentInput = '0';
    updateDisplay();
}

// Função para apagar o último caractere
function deleteLast() {
    if (currentInput === 'Erro' || currentInput.length === 1) {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

// CORREÇÃO 2: Nova função para calcular a porcentagem corretamente
function handlePercent() {
    if (currentInput === 'Erro') return;
    try {
        // Calcula o valor da expressão atual e divide por 100
        let expression = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
        let result = eval(expression);
        currentInput = (result / 100).toString();
    } catch (error) {
        currentInput = 'Erro';
    }
    updateDisplay();
}

// Função para calcular o resultado da expressão
function calculateResult() {
    if (currentInput === 'Erro') return;
    try {
        // Garante que a expressão não termine com um operador
        const lastChar = currentInput[currentInput.length - 1];
        if (operators.includes(lastChar)) {
            currentInput = currentInput.slice(0, -1);
        }

        // Substitui os símbolos visuais pelos operadores que o JavaScript entende
        let expression = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
        let result = eval(expression);

        if (!isFinite(result)) {
            throw new Error("Divisão por zero");
        }

        currentInput = result.toString();
        updateDisplay();
    } catch (error) {
        currentInput = 'Erro';
        updateDisplay();
    }
}

// Função para atualizar o que é mostrado na tela
function updateDisplay() {
    display.textContent = currentInput;
}
