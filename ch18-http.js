// content negotiation

// code works, but commented out
// function resourceRequest(url, contentType) {
//   fetch(url, { headers: { Accept: contentType } }).then((response) => {
//     console.log(response);
//     //return response.json();
//   });
//   //.then((data) => console.log(data));
// }

// resourceRequest("https://eloquentjavascript.net/author", "application/json");
// resourceRequest("https://eloquentjavascript.net/author", "text/html");
// resourceRequest("https://eloquentjavascript.net/author", "text/plain");
// // returns 406 error
// resourceRequest(
//   "https://eloquentjavascript.net/author",
//   "application/rainbows+unicorns"
// );

// JS workbench - works but commented out
// lets you add JS code as text in the input box, converts to function and runs it when click button,
// then writes output to the output field

// let textArea = document.querySelector("#code");
// //console.log(textArea.value);
// let button = document.querySelector("#button");
// let output = document.querySelector("#output");

// button.addEventListener("click", () => {
//   let currInput = textArea.value;
//   // wrap the input in a function and call it. Convert output to string and put in output element.
//   try {
//     let currOutput = Function("", currInput)();
//     console.log(currOutput);
//     output.innerText = String(currOutput);
//   } catch (error) {
//     output.innerText = `Error: ${error}`;
//   }
// });

// Game of Life
// Made with checkbox fields and a button to advance to the next generation

// will be dim x dim checkboxes
let dim = 25;

let genButton = document.createElement("button");
genButton.textContent = "Go to the next generation";

function createNewBoardArray(random = false) {
  let boardArray = [];
  for (let dimIndex = 0; dimIndex < dim; dimIndex++) {
    //console.log(dimIndex);
    //   // Creates a new array of length dim and fills the entries with false
    if (random) {
      let holderArray = [];
      for (let colIndex = 0; colIndex < dim; colIndex++) {
        holderArray.push(Math.random() > 0.5 ? true : false);
      }
      boardArray.push(holderArray);
    } else {
      boardArray.push(Array(dim).fill(false));
    }
  }
  return boardArray;
}

// Loops through the check boxes in the html and uses their checked
// state to determine the current array state (true/false for each cell), which is returned
function getCurrentBoardArray() {
  let currArray = [];
  for (let rowIndex = 0; rowIndex < dim; rowIndex++) {
    for (let colIndex = 0; colIndex < dim; colIndex++) {
      if (colIndex === 0) {
        currArray.push([]);
      }
      let currCheckBox = document.querySelector(
        `#check${rowIndex}-${colIndex}`
      );

      currArray[rowIndex].push(currCheckBox.checked);
    }
  }
  return currArray;
}

// loops through the entries in the current array to determine
function nextGenBoardArray(currArray, nextArray) {
  for (let rowIndex = 0; rowIndex < dim; rowIndex++) {
    for (let colIndex = 0; colIndex < dim; colIndex++) {
      console.log(`Row: ${rowIndex}, Col: ${colIndex}`);
      // is a boolean; true means alive
      let currCellState = currArray[rowIndex][colIndex];
      // count of live neighbors for current cell
      let neighborCount = 0;
      // W
      if (colIndex > 0 && currArray[rowIndex][colIndex - 1]) {
        console.log("west");
        neighborCount++;
      }
      //NW
      if (rowIndex > 0 && currArray[rowIndex - 1][colIndex - 1]) {
        console.log("northwest");
        neighborCount++;
      }
      //NE
      if (rowIndex < dim - 1 && currArray[rowIndex + 1][colIndex - 1]) {
        neighborCount++;
        console.log("NE");
      }

      //East
      if (colIndex < dim - 1 && currArray[rowIndex][colIndex + 1]) {
        neighborCount++;
        console.log("E");
      }
      //NE
      if (rowIndex > 0 && currArray[rowIndex - 1][colIndex + 1]) {
        neighborCount++;
        console.log("NE");
      }
      //SE
      if (rowIndex < dim - 1 && currArray[rowIndex + 1][colIndex + 1]) {
        neighborCount++;
        console.log("SE");
      }

      // North
      if (rowIndex > 0 && currArray[rowIndex - 1][colIndex]) {
        neighborCount++;
        console.log("N");
      }
      // South
      if (rowIndex < dim - 1 && currArray[rowIndex + 1][colIndex]) {
        neighborCount++;
        console.log("S");
      }

      console.log(
        `neighbor count: ${neighborCount}, for row: ${rowIndex}, col: ${colIndex}`
      );

      if (!currCellState && neighborCount === 3) {
        console.log("alive");
        nextArray[rowIndex][colIndex] = true;
        console.log(nextArray);
      }
      if (neighborCount > 3 || neighborCount < 2) {
        nextArray[rowIndex][colIndex] = false;
      }
      if (
        (currCellState && neighborCount === 2) ||
        (currCellState && neighborCount === 3)
      ) {
        nextArray[rowIndex][colIndex] = true;
      }
    }
  }
  return nextArray;
}

function createCheckGrid(boardArray) {
  let gameHolder = document.createElement("div");
  gameHolder.id = "game-holder";
  for (let dimIndex = 0; dimIndex < dim; dimIndex++) {
    // This will divide rows of the grid
    let gameRowDivider = document.createElement("div");

    for (let boxIndex = 0; boxIndex < dim; boxIndex++) {
      // boolean for whether this box should be checked or not based on the boardArray entry for this cell.
      let currValue = boardArray[dimIndex][boxIndex];
      //console.log(currValue);

      if (boxIndex !== 0) {
        //console.log("appended");
        gameHolder.appendChild(gameRowDivider);
      }

      let currBox = document.createElement("input");
      currBox.setAttribute("type", "checkbox");
      currBox.id = `check${dimIndex}-${boxIndex}`;
      currBox.checked = currValue;
      gameRowDivider.appendChild(currBox);
    }
  }
  //console.log(boardArray);

  document.body.appendChild(gameHolder);
  document.body.appendChild(genButton);
}

// Initialize an array of arrays to hold the board information (as a boolean for each cell)
// True argument creates randomized true/false board
let boardArray = createNewBoardArray(true);
console.log(boardArray);
createCheckGrid(boardArray);

genButton.addEventListener("click", () => {
  let currBoard = getCurrentBoardArray();
  let gameHolderSelection = document.querySelector("#game-holder");
  gameHolderSelection.remove();

  //console.log(currBoard);
  // initialize
  // false argument creates a board filled with false
  let nextBoard_raw = createNewBoardArray(false);
  // calculate the changes for the next gen and put them in the nextBoard
  let nextBoard_filled = nextGenBoardArray(currBoard, nextBoard_raw);
  console.log(nextBoard_filled);
  createCheckGrid(nextBoard_filled);
});

//let nextGenBoardArray = createNewBoardArray();
