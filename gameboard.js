/* eslint-disable no-restricted-syntax */
/* eslint-disable no-alert */
import Ship from "./ship.js";

export default class Gameboard {
  constructor(shipA, shipB) {
    this.shipA = shipA;
    this.shipB = shipB;
    this.turn = shipA;
    this.attacked = new Set();
  }

  fire(coord) {
    if (this.attacked.has(coord)) throw new Error("this cell has already been attacked");
    this.attacked.add(coord);
    const hit = this.turn.fire(coord);
    if (this.turn.getSize() === 0) this.displayWinner(this.getTurn());
    this.turn = this.turn === this.shipA ? this.shipB : this.shipA;
    return hit;
  }

  getTurn() {
    if (this.turn === this.shipA) return "Player A";
    return "Player B";
  }

  displayWinner(winner) {
    console.log(`${winner} has won the game`);
  }

  getAttacked() {
    return this.attacked;
  }
}
