// balloon

// Works, just commented out
// const div = document.createElement("div");
// div.setAttribute("id", "balloon");
// div.innerText = "🎈";
// div.style.fontSize = "20px";
// // center the balloon by putting it in a flexbox of the document body with
// // centering justification and alignment.
// document.body.style.display = "flex";
// document.body.style.justifyContent = "center";
// document.body.style.alignItems = "center";
// document.body.style.height = "400px";
// // div.style.textAlign = "center";
// document.body.appendChild(div);

// function setBalloonSize(event) {
//   event.preventDefault();
//   console.log(event.key);
//   let fontSizeNumberAsString = div.style.fontSize.match(/^\d+/)[0];
//   let fontSizeNumber = parseInt(fontSizeNumberAsString, 10);
//   if (fontSizeNumber > 500) {
//     event.preventDefault();
//     div.innerText = "💥";
//     window.removeEventListener("keydown", setBalloonSize);
//   }
//   if (event.key === "ArrowUp") {
//     console.log(div.style.fontSize);
//     // Get just the font size value, without the units
//     //console.log(NumberfontSizeNumber + fontSizeNumber * 0.1);
//     div.style.fontSize =
//       (fontSizeNumber + fontSizeNumber * 0.1).toString() + "px";
//     //div.style.fontSize = div.style.fontSize
//   }
//   if (event.key === "ArrowDown") {
//     div.style.fontSize =
//       (fontSizeNumber - fontSizeNumber * 0.1).toString() + "px";
//   }
// }

// window.addEventListener("keydown", setBalloonSize);

// Mouse trail

// make 100 trail elements and cycle them on mousemove

// works but commented out
// document.body.style.height = "400px";
// document.body.style.background = "ivory";

// let dotArray = [];
// // initialize the dots with display none
// for (let dotIndex = 0; dotIndex < 100; dotIndex++) {
//   let dot = document.createElement("div");
//   dot.className = "dot";
//   dotArray.push(dot);
//   // dot.style.left = (event.pageX - 4) + "px"
//   // dot.style.top = (event.pageY - 4) + "px"
//   document.body.appendChild(dot);
// }

// let currDotCount = 0;

// function dotTrail(event) {
//   let currDotIndex = currDotCount % dotArray.length;
//   let currDot = dotArray[currDotIndex];
//   currDot.style.left = event.pageX - 4 + "px";
//   currDot.style.top = event.pageY - 4 + "px";
//   currDotCount++;
// }
// //console.log(currDot);
// window.addEventListener("mousemove", dotTrail);

// tabs

function asTabs(inputNode) {
  let childNodeList = [...inputNode.children];
  console.log(childNodeList);
  let tabList = [];
  for (let node of childNodeList) {
    let button = document.createElement("button");
    button.innerText = node.getAttribute("data-tabname");
    // This is the critical part. The object stores the node and the button
    // references together, so they're linked in the JS, even though
    // they aren't in the HTML. Below they are both styled together with the JS
    // when a tab is selected, but otherwise they have no relationship in the HTML
    let tab = { node, button };
    // closure over the tab object representing this button's information
    button.addEventListener("click", () => selectTab(tab));
    tabList.push(tab);
  }
  console.log(tabList);
  let tabListDiv = document.createElement("div");
  for (let iterTab of tabList) {
    let currButton = iterTab.button;
    console.log(iterTab.button);
    tabListDiv.appendChild(currButton);
  }
  inputNode.insertBefore(tabListDiv, inputNode.firstChild);

  function selectTab(tabToSelect) {
    for (let tab of tabList) {
      if (tab === tabToSelect) {
        tab.button.style.color = "red";
        tab.node.style.display = "";
      } else {
        tab.button.style.color = "";
        tab.node.style.display = "none";
      }
    }
  }
  selectTab(tabList[0]);
}
let tab = asTabs(document.querySelector("tab-panel"));
