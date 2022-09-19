let cx = document.querySelector("canvas").getContext("2d");

function trapezoid([xLoc, yLoc]) {
  let height = 30;
  let width = 40;
  //cx.beginPath();
  cx.moveTo(xLoc - width / 2, yLoc - height / 2);
  cx.lineTo(xLoc + width / 2, yLoc - height / 2);
  cx.lineTo(xLoc + width / 2 + 10, yLoc + height / 2);
  cx.lineTo(xLoc - width / 2 - 10, yLoc + height / 2);
  cx.lineTo(xLoc - width / 2, yLoc - height / 2);
  cx.strokeStyle = "black";
  cx.stroke();
}

function redDiamond([xLoc, yLoc]) {
  let width = 40;
  cx.save();
  // Need the translate, rotate, back-translate trick here.
  cx.translate(xLoc, yLoc);
  cx.rotate(Math.PI / 4);
  cx.translate(-xLoc, -yLoc);
  cx.fillStyle = "red";
  cx.fillRect(xLoc, yLoc, width, width);
  cx.restore();
}

function zigZag([xLoc, yLoc], numPoints) {
  // y distance between consecutive zig zag points
  let pointHeight = 10;
  let lineLength = 30;
  cx.moveTo(xLoc, yLoc);
  let currYPos = yLoc;
  for (let pointIndex = 1; pointIndex < numPoints + 1; pointIndex++) {
    let pointOffset = pointHeight / 2;
    currYPos += pointHeight;
    cx.lineTo(xLoc + lineLength, currYPos);
    currYPos += pointHeight;
    cx.lineTo(xLoc, currYPos);
    cx.strokeStyle = "black";
    cx.stroke();
  }
}

function spiral([xLoc, yLoc], numSegments) {
  let angleIncrement = Math.PI / 10;
  let radius = 1;
  let currAngle = 0;
  cx.moveTo(xLoc, yLoc);
  for (let segment = 0; segment < numSegments; segment++) {
    currAngle += angleIncrement;
    xLoc = xLoc + Math.cos(currAngle) * radius;
    yLoc = yLoc + Math.sin(currAngle) * radius;
    cx.lineTo(xLoc, yLoc);
    cx.strokeStyle = "black";
    radius += angleIncrement / 5;
  }
  cx.stroke();
}

function star([xLoc, yLoc]) {
  // trace it clockwise
  let angleIncrement = Math.PI / 4;
  let radius = 50;
  cx.beginPath();
  cx.moveTo(xLoc + radius, yLoc);
  for (let lobeCounter = 1; lobeCounter < 9; lobeCounter++) {
    let angle = lobeCounter * angleIncrement;
    cx.quadraticCurveTo(
      xLoc,
      yLoc,
      xLoc + Math.cos(angle) * radius,
      yLoc + Math.sin(angle) * radius
    );
    cx.fillStyle = "gold";
    cx.fill();
  }
}

//trapezoid([50, 50]);
//redDiamond([50, 50]);
//zigZag([50, 50], 3);
//spiral([50, 50], 100);
star([100, 100]);

// function star(x, y) {
//   let radius = 50,
//     xCenter = x + radius,
//     yCenter = y + radius;
//   cx.beginPath();
//   cx.moveTo(xCenter + radius, yCenter);
//   for (let i = 1; i <= 8; i++) {
//     let angle = (i * Math.PI) / 4;
//     cx.quadraticCurveTo(
//       xCenter,
//       yCenter,
//       xCenter + Math.cos(angle) * radius,
//       yCenter + Math.sin(angle) * radius
//     );
//   }
//   cx.fillStyle = "gold";
//   cx.fill();
// }
// star(100, 100);
