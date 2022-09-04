// looping triangle
let currString = "#";

for (let numHashes = 1; numHashes < 8; numHashes++) {
  if (numHashes === 1) {
    console.log(currString);
    continue;
  }
  currString += "#";
  console.log(currString);
}

// fizzbuzz

for (let number = 1; number <= 100; number++) {
  let outputString = "";
  if (number % 3 === 0) {
    outputString += "Fizz";
    //console.log(`Fizz for: ${number}`);
  }
  if (number % 5 === 0) {
    outputString += "Buzz";
    //console.log(`Buzz for: ${number}`);
  }
  if (outputString === "") {
    outputString = number.toString();
  }
  console.log(outputString);
}

// chessboard

const size = 20;

let outputHolder = "";
//let startOnSpace = true;

for (let row = 0; row < size; row++) {
  let currRow = "";
  for (let col = 0; col < size; col++) {
    if ((row + col) % 2 === 0) {
      currRow += " ";
    } else {
      currRow += "#";
    }
  }
  outputHolder += currRow + "\n";
}
console.log(outputHolder);
