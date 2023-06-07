/* eslint-disable no-restricted-syntax */
/* eslint-disable no-alert */
export class Gameboard {
    constructor(shipA, shipB) {
        this.shipA = shipA;
        this.shipB = shipB;
        this.turn = shipA;
    }

    fire(coord) {
        
    }

}

function checkAdjacent(coord, c) {
    const [cX, cY] = [+c[0], +c[1]];
    const [coordX, coordY] = [+coord[0], +coord[1]];
    if ((cX-1 === coordX && cY === coordY) || (cX+1 === coordX && cY === coordY) ||
        (cX === coordX && cY+1 === coordY) || (cX === coordX && cY-1 === coordY)) {
            return true;
        }
    return false;
}


export function isValidCoords(coord, coords) {
    if (coords.has(coord)) return false;
    if (coords.size === 0) return true;
    for (const c of coords) {
        if (checkAdjacent(coord, c)) return true;
    }
    return false;
}


export function createCoords() {
    const coords = new Set();
    for (let i=0; i < 8; ++i) {
        let coord = prompt(`enter coordinates. ur coords so far are ${[...coords]}`);
        while (!isValidCoords(coord, coords)) {
            alert('invalid coords');
            coord = prompt(`enter coordinates. ur coords so far are ${[...coords]}`);
        }
        coords.add(coord);
    }
    return coords;
}
