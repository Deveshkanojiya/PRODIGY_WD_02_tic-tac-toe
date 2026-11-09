// ============================================
// Tic Tac Toe - Game Logic
// ============================================

// State variables to track game progress
let boardState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

// Winning combinations: 3 rows, 3 columns, and 2 diagonals
const WINNING_COMBINATIONS = [
  [0, 1, 2], // Row 1
  [3, 4, 5], // Row 2
  [6, 7, 8], // Row 3
  [0, 3, 6], // Column 1
  [1, 4, 7], // Column 2
  [2, 5, 8], // Column 3
  [0, 4, 8], // Diagonal 1
  [2, 4, 6]  // Diagonal 2
];

// DOM Element references
const statusDisplay = document.getElementById("status");
const cells = document.querySelectorAll(".cell");
const restartBtn = document.getElementById("restartBtn");

/**
 * Updates the game status message displayed to players
 * @param {string} message
 */
function updateStatus(message) {
  statusDisplay.textContent = message;
}

/**
 * Handles a cell click event
 * @param {Event} event
 */
function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute("data-cell-index"), 10);

  // If the cell is already played or the game is over, ignore the click
  if (boardState[clickedCellIndex] !== "" || !isGameActive) {
    return;
  }

  // Record the move and update cell UI
  makeMove(clickedCell, clickedCellIndex);

  // Check if someone won or if it's a draw
  checkGameResult();
}

/**
 * Marks the board and updates the cell's appearance
 * @param {HTMLElement} cell
 * @param {number} index
 */
function makeMove(cell, index) {
  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());
}

/**
 * Checks for winning conditions or a draw
 */
function checkGameResult() {
  let roundWon = false;
  let winningLine = null;

  // Check all winning combinations
  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const [a, b, c] = WINNING_COMBINATIONS[i];
    const valA = boardState[a];
    const valB = boardState[b];
    const valC = boardState[c];

    if (valA === "" || valB === "" || valC === "") {
      continue;
    }

    if (valA === valB && valB === valC) {
      roundWon = true;
      winningLine = [a, b, c];
      break;
    }
  }

  // Handle Win
  if (roundWon) {
    updateStatus(`Player ${currentPlayer} Wins! 🎉`);
    isGameActive = false;

    // Highlight the winning row/column/diagonal cells
    winningLine.forEach((index) => {
      cells[index].classList.add("winner");
    });
    return;
  }

  // Handle Draw (no empty spots left and no winner)
  const isDraw = !boardState.includes("");
  if (isDraw) {
    updateStatus("Game ended in a Draw! 🤝");
    isGameActive = false;
    return;
  }

  // Switch to the next player
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatus(`Player ${currentPlayer}'s Turn`);
}

/**
 * Resets the game to its initial state
 */
function restartGame() {
  boardState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameActive = true;
  updateStatus("Player X's Turn");

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("x", "o", "winner");
  });
}

// Attach event listeners
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
restartBtn.addEventListener("click", restartGame);

