import Gameboard from "./gameboard.js";
import Ship from "./ship.js";

import { createBattleship } from "./functions.js";

// const coordsA = createCoords();
// const coordsB = createCoords();
// const shipA = new Ship(coordsA);
// const shipB = new Ship(coordsB);
// const gameBoard = new Gameboard(shipA, shipB);

const SHIP_SIZE = 8;
const coordsA = new Set();
createBattleship(coordsA);
console.log('s');