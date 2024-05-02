const gameBoard = document.getElementById('gameBoard');
const statusText = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.innerText = `It's ${currentPlayer}'s turn`;
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    let roundWon = false;
    for (let i = 0; i < winPatterns.length; i++) {
        const winPattern = winPatterns[i];
        let a = gameState[winPattern[0]];
        let b = gameState[winPattern[1]];
        let c = gameState[winPattern[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.innerText = `${currentPlayer} wins!`;
        gameActive = false;
        restartButton.style.display = 'block';
        return;
    }

    let roundDraw = !gameState.includes('');
    if (roundDraw) {
        statusText.innerText = "It's a draw!";
        gameActive = false;
        restartButton.style.display = 'block';
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    checkWin();
}

function restartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusText.innerText = `It's ${currentPlayer}'s turn`;
    document.querySelectorAll('.cell').forEach(cell => cell.innerText = '');
    restartButton.style.display = 'none';
}

gameBoard.innerHTML = Array.from(Array(9).keys()).map(i => `<div class="cell" data-cell-index="${i}"></div>`).join('');
gameBoard.addEventListener('click', handleCellClick);
restartButton.addEventListener('click', restartGame);
statusText.innerText = `It's ${currentPlayer}'s turn`;
