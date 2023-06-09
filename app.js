import Gameboard from "./gameboard.js";
import Ship from "./ship.js";
import {
  createBattleship,
  createPredictionBoard,
  promptValidInteger,
} from "./functions.js";

// const coordsA = createCoords();
// const coordsB = createCoords();
// const shipA = new Ship(coordsA);
// const shipB = new Ship(coordsB);
// const gameBoard = new Gameboard(shipA, shipB);

let SHIP_SIZE = 2;

do {
  SHIP_SIZE = promptValidInteger();
  const coordsA = new Set();
  const coordsB = new Set();

  await createBattleship(coordsA, "A", SHIP_SIZE);
  await createBattleship(coordsB, "B", SHIP_SIZE);
  const shipA = new Ship(coordsA);
  const shipB = new Ship(coordsB);

  const gameboard = new Gameboard(shipA, shipB);
  let gameOver = false;
  while (!gameOver) {
    if (gameboard.getTurn() == "Player A")
      gameOver = await createPredictionBoard(
        gameboard.attackedA,
        gameboard.predictedA,
        gameboard
      );
    else
      gameOver = await createPredictionBoard(
        gameboard.attackedB,
        gameboard.predictedB,
        gameboard
      );
  }
} while (confirm("Play again?"));
