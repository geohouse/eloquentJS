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
  let xCenter = xLoc + radius;
  let yCenter = yLoc + radius;
  cx.beginPath();
  cx.moveTo(xCenter + radius, yCenter);
  for (let lobeCounter = 1; lobeCounter < 9; lobeCounter++) {
    let angle = lobeCounter * angleIncrement;
    cx.quadraticCurveTo(
      xCenter,
      yCenter,
      xCenter + Math.cos(angle) * radius,
      yCenter + Math.sin(angle) * radius
    );
    cx.fillStyle = "gold";
    cx.fill();
  }
}

//trapezoid([50, 50]);
//redDiamond([50, 50]);
//zigZag([50, 50], 3);
//spiral([50, 50], 100);
// Not working quite right, but not sure what else to try. The
// working code from the answers is below as star2.
//star([100, 100]);

// function star2(x, y) {
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
//star2(50, 50);

// works, just commented out.
// Pie chart with labels
// const results = [
//   { name: "Satisfied", count: 1043, color: "lightblue" },
//   { name: "Neutral", count: 563, color: "lightgreen" },
//   { name: "Unsatisfied", count: 510, color: "pink" },
//   { name: "No comment", count: 175, color: "silver" },
// ];

// let total = results.reduce((sum, { count }) => sum + count, 0);
// let currentAngle = -0.5 * Math.PI;
// let centerX = 300;
// let centerY = 150;
// let radius = 100;

// for (let result of results) {
//   let sliceAngle = (result.count / total) * 2 * Math.PI;
//   cx.beginPath();
//   cx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);

//   cx.lineTo(centerX, centerY);
//   cx.fillStyle = result.color;
//   cx.fill();
//   cx.textBaseline = "middle";
//   if (
//     currentAngle + sliceAngle / 2 >= -0.5 * Math.PI &&
//     currentAngle + sliceAngle / 2 < 0.5 * Math.PI
//   ) {
//     cx.textAlign = "left";
//   } else {
//     cx.textAlign = "right";
//   }
//   cx.fillText(
//     result.name,
//     centerX + Math.cos(currentAngle + sliceAngle / 2) * 1.2 * radius,
//     centerY + Math.sin(currentAngle + sliceAngle / 2) * 1.2 * radius
//   );
//   currentAngle += sliceAngle;
// }

// bouncing ball

class Vec {
  constructor(x, y, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.velX = speedX;
    this.velY = speedY;
  }
  plus(other) {
    return new Vec(this.x + other.x, this.y + other.y);
  }
  times(factor) {
    return new Vec(this.x * factor.x, this.y * factor.y);
  }
}

let lastTime = null;
let boxSize = 300;
let ballRadius = 20;
let ball = new Vec(
  Math.floor(Math.random() * (boxSize - 2 * ballRadius)),
  Math.floor(Math.random() * (boxSize - 2 * ballRadius)),
  Math.floor(Math.random() * 100),
  Math.floor(Math.random() * 100)
);
function frame(time) {
  if (lastTime != null) {
    updateAnimation(Math.min(100, time - lastTime) / 1000);
  }
  lastTime = time;
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

function updateAnimation(step) {
  cx.clearRect(0, 0, 600, 300);
  cx.strokeRect(0, 0, boxSize, boxSize);
  let stepX = ball.x + step * ball.velX;
  let stepY = ball.y + step * ball.velY;
  cx.beginPath();
  cx.arc(stepX, stepY, ballRadius, 0, Math.PI * 2);
  cx.fillStyle = "pink";
  cx.fill();
  ball.x = stepX;
  ball.y = stepY;
  // bounce x
  if (ball.x + ballRadius >= boxSize || ball.x - ballRadius <= 0) {
    ball.velX = -ball.velX;
  }
  // bounce y
  if (ball.y + ballRadius >= boxSize || ball.y - ballRadius <= 0) {
    ball.velY = -ball.velY;
  }
}
