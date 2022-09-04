// minimum

function minimum(num1, num2) {
  return num1 < num2 ? num1 : num2;
}

// recursion

function isEven(inputNumber) {
  let isNumberEven = false;
  console.log(inputNumber);
  if (inputNumber < 0) {
    return isEven(-inputNumber);
  }
  if (inputNumber === 0) {
    isNumberEven = true;
    //console.log(isNumberEven);
    return isNumberEven;
  } else if (inputNumber === 1) {
    console.log(" in 1");
    return isNumberEven;
  }
  return isEven(inputNumber - 2);
}

// bean counting

// function countBs(inputString) {
//   let letterCount = 0;
//   for (
//     let letterCounter = 0;
//     letterCounter < inputString.length;
//     letterCounter++
//   ) {
//     if (inputString[letterCounter] === "B") {
//       letterCount++;
//     }
//   }
//   return letterCount;
// }

function countChar(inputString, letterToSearch) {
  let letterCount = 0;
  for (let letterIndex = 0; letterIndex < inputString.length; letterIndex++) {
    if (inputString[letterIndex] === letterToSearch) {
      letterCount++;
    }
  }
  return letterCount;
}

function countBs(inputString) {
  return countChar(inputString, "B");
}
