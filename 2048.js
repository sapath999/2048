const gridSize = 4;
const gameContainer = document.getElementById('game-container');
let board = [];

function initializeGame() {
    // Initialize an empty board
    board = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
    addRandomTile();
    addRandomTile();
    renderBoard();
}

function addRandomTile() {
    let emptyTiles = [];
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (board[i][j] === 0) emptyTiles.push({ x: i, y: j });
        }
    }
    if (emptyTiles.length > 0) {
        let { x, y } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        board[x][y] = Math.random() > 0.1 ? 2 : 4;
    }
}

function renderBoard() {
    gameContainer.innerHTML = '';
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            if (board[i][j] !== 0) {
                tile.textContent = board[i][j];
                tile.setAttribute('data-value', board[i][j]);
            }
            gameContainer.appendChild(tile);
        }
    }
}

function slideRow(row) {
    let filteredRow = row.filter(num => num !== 0);
    let newRow = [];
    while (filteredRow.length > 0) {
        if (filteredRow[0] === filteredRow[1]) {
            newRow.push(filteredRow[0] * 2);
            filteredRow.shift();
        } else {
            newRow.push(filteredRow[0]);
        }
        filteredRow.shift();
    }
    while (newRow.length < gridSize) {
        newRow.push(0);
    }
    return newRow;
}

function slideLeft() {
    for (let i = 0; i < gridSize; i++) {
        board[i] = slideRow(board[i]);
    }
}

function slideRight() {
    for (let i = 0; i < gridSize; i++) {
        board[i] = slideRow(board[i].reverse()).reverse();
    }
}

function slideUp() {
    for (let i = 0; i < gridSize; i++) {
        let col = board.map(row => row[i]);
        col = slideRow(col);
        for (let j = 0; j < gridSize; j++) {
            board[j][i] = col[j];
        }
    }
}

function slideDown() {
    for (let i = 0; i < gridSize; i++) {
        let col = board.map(row => row[i]);
        col = slideRow(col.reverse()).reverse();
        for (let j = 0; j < gridSize; j++) {
            board[j][i] = col[j];
        }
    }
}

function handleKeyPress(e) {
    switch (e.key) {
        case 'ArrowLeft':
            slideLeft();
            break;
        case 'ArrowRight':
            slideRight();
            break;
        case 'ArrowUp':
            slideUp();
            break;
        case 'ArrowDown':
            slideDown();
            break;
        default:
            return;
    }
    addRandomTile();
    renderBoard();
    checkGameOver();
}

function checkGameOver() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (board[i][j] === 0) return;
            if (j < gridSize - 1 && board[i][j] === board[i][j + 1]) return;
            if (i < gridSize - 1 && board[i][j] === board[i + 1][j]) return;
        }
    }
    alert('Game Over!');
    initializeGame();
}

window.addEventListener('keydown', handleKeyPress);
initializeGame();
