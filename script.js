// JavaScript to control the Tic-Tac-Toe game functionality
const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('resetBtn');
const playWithAiBtn = document.getElementById('playWithAiBtn');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

// Winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Add click event listeners to cells
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});

// Reset the game
resetBtn.addEventListener('click', resetGame);

// Function to handle cell click
function handleCellClick(index) {
    if (board[index] !== '' || !gameActive) return;

    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    checkWinner();

    // Toggle the player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    // If playing against AI
    if (playWithAiBtn.classList.contains('active') && currentPlayer === 'O' && gameActive) {
        setTimeout(playAiMove, 500);
    }
}

// Function to reset the game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('win');
    });
    currentPlayer = 'X';
    gameActive = true;
}

// Function to check for a winner
function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            cells[a].classList.add('win');
            cells[b].classList.add('win');
            cells[c].classList.add('win');
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        return;
    }

    // Check for a draw
    if (!board.includes('')) {
        gameActive = false;
    }
}

// Simple AI logic for opponent's move
function playAiMove() {
    let availableCells = board.map((val, index) => (val === '' ? index : null)).filter(val => val !== null);
    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    handleCellClick(randomIndex);
}
