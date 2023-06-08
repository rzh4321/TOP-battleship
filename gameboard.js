/* eslint-disable no-restricted-syntax */
/* eslint-disable no-alert */
import Ship from "./ship.js";

export default class Gameboard {
  constructor(shipA, shipB) {
    this.shipA = shipA;
    this.shipB = shipB;
    this.turn = shipA;
    this.attackedA = new Set();
    this.attackedB = new Set();

  }

  fire(coord) {
    if ((this.turn === this.shipA && this.attackedA.has(coord)) || (this.turn === this.shipB && this.attackedB.has(coord))) throw new Error("this cell has already been attacked");
    if (this.turn === this.shipA) this.attackedA.add(coord);
    else this.attackedB.add(coord);
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
