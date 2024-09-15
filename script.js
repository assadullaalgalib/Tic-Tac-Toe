const cells = document.querySelectorAll('.cell');
const messageDiv = document.getElementById('message');
const restartButton = document.getElementById('restart');
const scoreX = document.getElementById('score-x');
const scoreO = document.getElementById('score-o');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

let playerXWins = 0;
let playerOWins = 0;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function checkWinner() {
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return board.includes('') ? null : 'Tie';
}

function handleCellClick(e) {
  const index = e.target.getAttribute('data-index');

  if (board[index] || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  const result = checkWinner();

  if (result) {
    gameActive = false;
    messageDiv.textContent = result === 'Tie' ? 'It\'s a tie!' : `${result} wins!`;

    // Update the score
    if (result === 'X') {
      playerXWins++;
      scoreX.textContent = playerXWins;
    } else if (result === 'O') {
      playerOWins++;
      scoreO.textContent = playerOWins;
    }
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;
  cells.forEach(cell => {
    cell.textContent = '';
  });
  messageDiv.textContent = '';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
