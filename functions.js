function checkAdjacent(coord, c) {
  const [cX, cY] = [+c[0], +c[1]];
  const [coordX, coordY] = [+coord[0], +coord[1]];
  if (
    (cX - 1 === coordX && cY === coordY) ||
    (cX + 1 === coordX && cY === coordY) ||
    (cX === coordX && cY + 1 === coordY) ||
    (cX === coordX && cY - 1 === coordY)
  ) {
    return true;
  }
  return false;
}

export function isValidCoords(coord, coords) {
  if (coords.has(coord)) return false;
  if (coords.size === 0) return true;
  // eslint-disable-next-line no-restricted-syntax
  for (const c of coords) {
    if (checkAdjacent(coord, c)) return true;
  }
  return false;
}

export function createCoords() {
  const coords = new Set();
  for (let i = 0; i < 8; ++i) {
    // eslint-disable-next-line no-alert
    let coord = prompt(
      `enter coordinates. ur coords so far are ${[...coords]}`
    );
    while (!isValidCoords(coord, coords)) {
      // eslint-disable-next-line no-alert
      alert("invalid coords");
      // eslint-disable-next-line no-alert
      coord = prompt(`enter coordinates. ur coords so far are ${[...coords]}`);
    }
    coords.add(coord);
  }
  return coords;
}

// export function 

/*
1. create board, while creating, add event listeners to each cell. when cell is clicked, append
coords to a set. this set will be the player's coords
2. this board u just created will stay on screen until player has clicked 8 different cells
3. repeat above for second player. Now u have two sets. Initialize gameboard object with them
4. if its player A's turn, generate their prediction board using attackedA and predictedA. How: 
while creating
the board and ur creating each cell, if the index matches (remember to add 1 to row and col index)
a coord in predictedA, add a class indicating its already been hit. elif the index matches a coord
in attacked, add class indicating its already been attacked and missed. Else, add a click event
listener to the cell. If clicked, first check if player already made prediction using global var.
if not, call fire() with the coord (row+1, col+1) and set var to true. If fire() returns true,
then add coord (row+1, col+1) to predicted set. Else, add to attacked set. Still inside event
listener, add the class to the cell to update how it looks. Then alert().
5. 
*/