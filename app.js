import Gameboard from "./gameboard.js";
import Ship from "./ship.js";

import { createCoords } from "./functions.js";

const coordsA = createCoords();
const coordsB = createCoords();
const shipA = new Ship(coordsA);
const shipB = new Ship(coordsB);
const gameBoard = new Gameboard(shipA, shipB);
