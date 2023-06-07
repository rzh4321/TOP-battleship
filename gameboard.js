/* eslint-disable no-restricted-syntax */
/* eslint-disable no-alert */
import Ship from "./ship.js";

export default class Gameboard {
    constructor(shipA, shipB) {
        this.shipA = shipA;
        this.shipB = shipB;
        this.turn = shipA;
    }

    fire(coord) {
        const hit = this.turn.fire(coord);
        this.turn = (this.turn === this.shipA)? this.shipB: this.shipA;
        return hit;
    }

    getTurn() {
        if (this.turn === this.shipA) return "Player A";
        return "Player B";
    }


}

