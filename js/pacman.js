'use strict';
const PACMAN = '💩';

var gPacman;
// TODO
function createPacman(board) {
  gPacman = {
    location: {
      i: 6,
      j: 6,
    },
    isSuper: false,
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(ev) {
  if (!gGame.isOn) return;
  // TODO: use getNextLocation(), nextCell
  var nextLocation = getNextLocation(ev);
  var nextCell = gBoard[nextLocation.i][nextLocation.j];
  // TODO: return if cannot move
  if (nextCell === WALL) return;
  if (nextCell === FOOD) updateScore(1);
  // TODO: hitting a ghost?  call gameOver
  if (nextCell === GHOST) {
    if (!gPacman.isSuper) {
      gameOver();
      return;
    }
    killGhost(nextLocation);
  }

  if (nextCell === SUPER_FOOD) {
    gPacman.isSuper = true;
    setTimeout(function () {
      gPacman.isSuper = false;
    }, 5000);
  }
  if (nextCell === CHERRY) {
    cherryScore();
  }

  // TODO: update the model
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // TODO: update the DOM
  renderCell(gPacman.location, EMPTY);
  // TODO: Move the pacman
  gPacman.location = { i: nextLocation.i, j: nextLocation.j };
  // TODO: update the model
  gBoard[nextLocation.i][nextLocation.j] = PACMAN;
  renderCell(nextLocation, PACMAN);
  if (isVicrtory()) resetGame();
  // TODO: update the DOM
}

// figure out nextLocation
function getNextLocation(eventKeyboard) {
  var nextLocation = { i: gPacman.location.i, j: gPacman.location.j };

  switch (eventKeyboard.key) {
    case 'ArrowUp':
      nextLocation.i--;
      break;
    case 'ArrowDown':
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      break;
    case 'ArrowRight':
      nextLocation.j++;
      break;
  }
  return nextLocation;
}
