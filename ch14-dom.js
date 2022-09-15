// Build a table

const MOUNTAINS = [
  { name: "Kilimanjaro", height: 5895, place: "Tanzania" },
  { name: "Everest", height: 8848, place: "Nepal" },
  { name: "Mount Fuji", height: 3776, place: "Japan" },
  { name: "Vaalserberg", height: 323, place: "Netherlands" },
  { name: "Denali", height: 6168, place: "United States" },
  { name: "Popocatepetl", height: 5465, place: "Mexico" },
  { name: "Mont Blanc", height: 4808, place: "Italy/France" },
];

const table = document.createElement("table");

let tableHeaderRow = document.createElement("tr");

for (let index = 0; index < Object.keys(MOUNTAINS[0]).length; index++) {
  let tableHeader = document.createElement("th");
  tableHeader.innerText = Object.keys(MOUNTAINS[0])[index];
  tableHeaderRow.appendChild(tableHeader);
}
table.appendChild(tableHeaderRow);
for (let rowIndex = 0; rowIndex < MOUNTAINS.length; rowIndex++) {
  let currRow = document.createElement("tr");
  let currObj = MOUNTAINS[rowIndex];
  for (key in currObj) {
    let currCell = document.createElement("td");
    currCell.innerText = MOUNTAINS[rowIndex][key];
    if (typeof MOUNTAINS[rowIndex][key] === "number") {
      currCell.style.textAlign = "right";
    }
    currRow.appendChild(currCell);
  }
  table.appendChild(currRow);
}

let mountains = document.querySelector("#mountains");
mountains.appendChild(table);

// Elements by tag name
function byTagName(node, tagName) {
  let outputArray = [];
  function checkNode(node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      let nodeName = node.nodeName.toLowerCase();
      //console.log({ nodeName });
      if (nodeName === tagName) {
        outputArray.push(nodeName);
      }
      for (let child of node.childNodes) {
        checkNode(child);
      }
    }
  }
  checkNode(node);
  return outputArray;
}
console.log(byTagName(document.body, "h1").length);
console.log(byTagName(document.body, "span").length);
let para = document.querySelector("p");
console.log(byTagName(para, "span").length);

// The cat's hat

let cat = document.querySelector("#cat");
let hat = document.querySelector("#hat");
let angle = 0;

let lastTime = null;
function animate(time) {
  if (lastTime !== null) {
    angle += (time - lastTime) * 0.001;
  }
  lastTime = time;
  cat.style.top = Math.sin(angle) * 100 + 400 + "px";
  cat.style.left = Math.cos(angle) * 200 + 230 + "px";
  hat.style.top = Math.sin(angle + Math.PI) * 150 + 400 + "px";
  hat.style.left = Math.cos(angle + Math.PI) * 100 + 230 + "px";
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
