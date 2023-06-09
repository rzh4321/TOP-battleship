/* eslint-disable no-loop-func */
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

// export function createCoords() {
//   const coords = new Set();
//   for (let i = 0; i < 8; ++i) {
//     // eslint-disable-next-line no-alert
//     let coord = prompt(
//       `enter coordinates. ur coords so far are ${[...coords]}`
//     );
//     while (!isValidCoords(coord, coords)) {
//       // eslint-disable-next-line no-alert
//       alert("invalid coords");
//       // eslint-disable-next-line no-alert
//       coord = prompt(`enter coordinates. ur coords so far are ${[...coords]}`);
//     }
//     coords.add(coord);
//   }
//   return coords;
// }

// displays a board to allow user to create ship. Returns set of coords
export async function createBattleship(coords, player, size) {
    const [instructions, greeting, counter] = createBattleshipInstructions(player, size);
    document.body.append(instructions);
    let cellsLeft = size;
    const board = document.createElement('div');
    board.id = 'board';
    for (let r = 0; r < 10; ++r) {
        for (let c = 0; c < 10; ++c) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            board.append(cell);
            cell.textContent = `${String.fromCharCode(r+65)}${c+1}`;

            cell.addEventListener('click', () => {
              if (cell.classList.contains('chosen')) {
                coords.delete(`${r}${c}`);
                cellsLeft++;
              }
              else {
                if (coords.size === size) {
                  alert(`Max size is ${size}`);
                  return;
                }
                if (!isValidCoords(`${r}${c}`, coords)) {
                  alert("Cells must be adjacent");
                  return;
                }
                cellsLeft--;
                coords.add(`${r}${c}`);
              }
              counter.textContent = `Cells left: ${cellsLeft}`;
              cell.classList.toggle('chosen');
              console.log(coords);
            })
        }
    }
    document.body.append(board);
    await waitForConfirmation(coords, size);
    document.body.innerHTML = "";
    
}

function createBattleshipInstructions(player, size) {
  const instructions = document.createElement('div');
  instructions.classList.add('instructions');
  const greeting = document.createElement('span');
  greeting.textContent = `Player ${player}, create your battleship`;
  const counter = document.createElement('span');
  counter.textContent = `Cells left: ${size}`;
  instructions.append(greeting, counter);
  document.body.append(instructions);
  return [instructions, greeting, counter];
}

function waitForConfirmation(coords, size) {
  return new Promise((resolve) => {
    const confirmButton = document.createElement('button');
    confirmButton.textContent = "Done";
    confirmButton.addEventListener('click', () => {
      if (coords.size < size) {
        alert(`Battleship size must be ${size} cells`);
      }
      else if (confirm("Confirm these coordinates for your battleship?")) resolve();
    })
    document.body.append(confirmButton);
  })
}

function predictionBoardInstructions(player) {
  const instructions = document.createElement('div');
  instructions.classList.add('instructions');
  const greeting = document.createElement('span');
  greeting.textContent = `It's ${player}'s turn`;
  instructions.append(greeting);
  document.body.append(instructions);
  return [instructions, greeting];
}

export async function createPredictionBoard(attacked, predicted, gameboard) {
  const [instructions, greeting] = predictionBoardInstructions(gameboard.getTurn());
  document.body.append(instructions);
  const board = document.createElement('div');
  board.id = 'board';
  let gameOver = false;
  for (let r = 0; r < 10; ++r) {
      for (let c = 0; c < 10; ++c) {
          const cell = document.createElement('div');
          if (predicted.has(`${r}${c}`)) {
            cell.classList.add('predicted');
          }
          else if (attacked.has(`${r}${c}`)) {
            cell.classList.add('attacked');
          }
          cell.classList.add('cell');
          board.append(cell);
          cell.textContent = `${String.fromCharCode(r+65)}${c+1}`;
        }
    }
  document.body.append(board);
  const cells = Array.from(document.querySelectorAll('.cell'));
  const player = gameboard.getTurn();
  gameOver = await waitForPrediction(cells, attacked, gameboard);
  disableClicking();
  if (gameOver) {
    alert(`${player} HAS WON`);
    await wait(2000);
  }
  await wait(2000);
  enableClicking();
  document.body.innerHTML = "";
  return gameOver;
        
}

async function waitForPrediction(cells, attacked, gameboard) {
  const promises = cells.map((cell) => new Promise((resolve) => {
      const clickHandler = () => {
        let r; let c;
        if (cell.textContent.length === 3) c = '10';
        else c = cell.textContent[1];
        [r, c] = [cell.textContent[0].charCodeAt(0) - 'A'.charCodeAt(0), +c-1];
        console.log(`${r}${c}`);
        if (!attacked.has(`${r}${c}`)) {
          const res = gameboard.fire(`${r}${c}`);
          const [hit, gameOver] = [res[0], res[1]];
          if (hit) {
            cell.classList.add('predicted');
            alert('HIT');
          }
          else {
            cell.classList.add('attacked');
            alert('MISS');
          }
          resolve(gameOver);
        }
      };

      cell.addEventListener('click', clickHandler);
    }));
    const res = Promise.race(promises);
    return res;
}

function wait(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();}, time);
  })
}

function disableClickHandler(event) {
  event.preventDefault();
  event.stopPropagation();
};

function enableClicking() {
  document.removeEventListener('click', disableClickHandler, true);
}

function disableClicking() {
  document.addEventListener('click', disableClickHandler, true);
}


/*
1. create board, while creating, add event listeners to each cell. when cell is clicked, append
coords to a set. this set will be the player's coords
2. this board u just created will stay on screen until player has clicked 8 different cells
3. repeat above for second player. Now u have two sets. Initialize gameboard object with them
4. if its player A's turn, generate their prediction board using attackedA and predictedA. How: 
while creating
the board and ur creating each cell, if the index matches
a coord in predictedA, add a class indicating its already been hit. elif the index matches a coord
in attacked, add class indicating its already been attacked and missed. Else, add a click event
listener to the cell. If clicked, first check if player already made prediction using global var.
if not, call fire() with the coord and set var to true. If fire() returns true,
then add coord to predicted set. 
Then check the second index of array. If true, the hit resulted in a win
Else, add to attacked set. Still inside event
listener, add the class to the cell to update how it looks. Then alert(). check the second
index of returned array from fire().

*/