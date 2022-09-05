// sum of a range

// start and end are inclusive
function range(startValue, endValue, stepValue) {
  let outputArray = [];
  if (stepValue > 0) {
    for (let index = startValue; index <= endValue; index += stepValue) {
      outputArray.push(index);
    }
  } else if (stepValue < 0) {
    for (let index = startValue; index >= endValue; index += stepValue) {
      outputArray.push(index);
    }
  }
  return outputArray;
}

function sum(inputArray) {
  return inputArray.reduce((total, current) => {
    return (total += current);
  }, 0);
}

function sumRange(startValue, endValue, stepValue = 1) {
  const rangeArray = range(startValue, endValue, stepValue);
  console.log(rangeArray);
  const sumTotal = sum(rangeArray);
  return sumTotal;
}

// reverse an array

function reverseArray(inputArray) {
  let outputArray = [];
  const numEntries = inputArray.length;
  for (let index = numEntries; index >= 0; index--) {
    outputArray.push(inputArray[index]);
  }
  return outputArray;
}

function reverseArrayInPlace(inputArray) {
  for (
    let halfIndex = 0;
    halfIndex < Math.ceil(inputArray.length / 2);
    halfIndex++
  ) {
    //console.log(halfIndex);
    const leftIndex = halfIndex;
    const rightIndex = inputArray.length - (halfIndex + 1);
    let intermediateHolder = inputArray[leftIndex];
    inputArray[leftIndex] = inputArray[rightIndex];
    inputArray[rightIndex] = intermediateHolder;
  }
  return inputArray;
}

// array to list and list methods

// list structure
// let list = {
//     value: 1,
//     rest: {
//         value: 2,
//         rest: {
//             value: 3,
//             rest: null
//         }
//     }
// }

function arrayToList(inputArray) {
  let currentList = {};
  //console.log(inputArray.length);
  for (let index = inputArray.length - 1; index >= 0; index--) {
    //console.log(index);
    if (index === inputArray.length - 1) {
      currentList = { value: inputArray[index], rest: null };
      //console.log(currentList);
    } else {
      let tempList = { value: inputArray[index], rest: currentList };
      //console.log(tempList);
      currentList = tempList;
      //console.log(currentList);
    }
  }
  return currentList;
}

// function arrayToList(array) {
//   var list = null;
//   for (var i = array.length - 1; i >= 0; i--)
//     list = { value: array[i], rest: list };
//   return list;
// }

console.log(arrayToList([10, 20, 30]));

function listToArray(inputList) {
  let outputArray = [];
  // Neat use of for loop here to traverse the nodes without needing index values
  for (let node = inputList; node; node = node.rest) {
    outputArray.push(node.value);
  }
  return outputArray;
}

console.log(listToArray(arrayToList([1, 2, 3])));

function prepend(elementToAdd, existingList) {
  return { value: elementToAdd, rest: existingList };
}

console.log(prepend(5, listToArray(arrayToList([1, 2, 3]))));

// function nth(inputList, elementNumberToReturn) {
//   if (!inputList) {
//     return undefined;
//   } else if (elementNumberToReturn === 0) {
//     return inputList.value;
//   } else {
//     return nth(inputList.rest, elementNumberToReturn - 1);
//   }
// }

function nth(list, n) {
  if (!list) return undefined;
  else if (n == 0) return list.value;
  else return nth(list.rest, n - 1);
}

console.log(nth(arrayToList([10, 20, 30, 40, 50, 60]), 2));
console.log(nth(arrayToList([10, 20, 30]), 1));

// deep equal

const deepEqual = function (obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }
  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  ) {
    return false;
  }
  if (obj1 !== obj2) {
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
      return false;
    }
    for (let key of Object.keys(obj1)) {
      console.log({ key });
      if (!Object.keys(obj2).includes(key)) {
        return false;
      } else {
        console.log("in recursion");
        console.log(obj1[key]);
        console.log(obj2[key]);
        return deepEqual(obj1[key], obj2[key]);
      }
    }
  }
  return true;
};

let obj = { here: { is: "an" }, object: 2 };
console.log(deepEqual(obj, { here: 1, object: 2 }));
console.log(deepEqual(obj, { here: { is: "an" }, object: 2 }));
