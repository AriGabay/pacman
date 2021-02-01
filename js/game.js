'use strict';
const WALL = '🧱';
const FOOD = '◻️';
const EMPTY = ' ';
const SUPER_FOOD = '🍔';
const CHERRY = '🍒';

var gBoard;
var gGame = {
  score: 0,
  isOn: false,
};
function init() {
  console.log('hello');
  gBoard = buildBoard();
  createPacman(gBoard);
  createGhosts(gBoard);
  printMat(gBoard, '.board-container');
  gGame.isOn = true;
  cherry15Sec();

}

function buildBoard() {
  var SIZE = 10;
  var board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;
      if (i === 0 || i === SIZE - 1 || j === 0 || j === SIZE - 1 || (j === 3 && i > 4 && i < SIZE - 2)) {
        board[i][j] = WALL;
      }
      if (i === 1 && j === 8) board[i][j] = SUPER_FOOD;
      if (i === 8 && j === 8) board[i][j] = SUPER_FOOD;
      if (i === 1 && j === 1) board[i][j] = SUPER_FOOD;
      if (i === 8 && j === 1) board[i][j] = SUPER_FOOD;
    }
  }

  return board;
}

// update model and dom
function updateScore(diff) {
  gGame.score += diff;
  var elScore = document.querySelector('h2 span');
  elScore.innerText = gGame.score;

}

// TODO
function gameOver() {
  console.log('Game Over');
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
  var elRestartGame = document.querySelector('.reset-game');
  elRestartGame.style.display = 'block';
}

function resetGame() {
  var conf = confirm('Restart Game?');
  if (conf) {
    init();
    gGame.score = 0;
    var elScore = document.querySelector('h2 span');
    elScore.innerText = gGame.score;
    var elRestartGame = document.querySelector('.reset-game');
    elRestartGame.style.display = 'none';
  }
}

 

function isVicrtory() {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard.length; j++) {
      if (gBoard[i][j] === FOOD) return false;
    }
  }
  return true;
}
function cherry15Sec() {
  var stopInterval = setTimeout(function () {
    var randomI = getRandomIntInclusive(1, 8);
    var randomJ = getRandomIntInclusive(1, 8);
    if (
      (randomI === 1 && randomJ === 1) ||
      (randomI === 8 && randomJ === 1) ||
      (randomI === 1 && randomJ === 8) ||
      (randomI === 8 && randomJ === 8)
    ) {
      cherry15Sec();
    }
    setTimeout;
    gBoard[randomI][randomJ] = CHERRY;
  }, 1500);

}

function cherryScore() {
  var score = 0;
  score = score + 10;
  updateScore(score);
}
