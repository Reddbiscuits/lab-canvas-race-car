let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

function intersect(obj1, obj2) {
  let obj1left = obj1.x;
  let obj1top = obj1.y;
  let obj1right = obj1.x + obj1.width;
  let obj1bottom = obj1.y + obj1.height;
  let obj2left = obj2.x;
  let obj2top = obj2.y;
  let obj2right = obj2.x + obj2.width;
  let obj2bottom = obj2.y + obj2.height;
  return !(
    obj1left > obj2right ||
    obj1top > obj2bottom ||
    obj1right < obj2left ||
    obj1bottom < obj2top
  );
}

let bkg = new Image();
bkg.src = "images/road.png";
bkg.onload = () => {
  ctx.drawImage(bkg, 0, 0, 500, 700);
};

let car = new Image();
car.src = "images/car.png";
car.onload = () => {
  ctx.drawImage(car, 210, 520, 80, (80 / car.width) * car.height);
};

// //let obst = new Obstacle();

let bkgY = 0;
let arrayOfRect = [];

let frameCounter = 0;

let pos1 = 0;
let pos2 = -200;
//let pos3 = 0;

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

// // gets called 60 times per second
function drawBoard() {
  ctx.clearRect(0, 0, 500, 700); // clear canvas

  ctx.drawImage(bkg, 0, bkgY, 500, 700);
  ctx.drawImage(car, carPosX, 520, 50, (50 / car.width) * car.height);

  // drawRect(250, pos3, 50, 50, "yellow");

  for (let i = 0; i < arrayOfRect.length; i++) {
    const rect = arrayOfRect[i];
    drawRect(rect.posX, rect.posY, rect.width, 20, "red");

    let rectWithPropertyNames = {
      x: rect.posX,
      y: rect.posY,
      width: rect.width,
      height: 20,
    };
    let carWithPropertyNames = {
      x: carPosX,
      y: 520,
      width: 50,
      height: (50 / car.width) * car.height,
    };

    if (intersect(rectWithPropertyNames, carWithPropertyNames)) {
      clearInterval(intervalID);
      alert("GAME OVER");
    }

    rect.posY += 1;
    // drawRect(500, pos2, obstRectXrt, 20, "blue");
  }

  // 2 seconds have passed - Left side Obstacles
  if (frameCounter % 240 === 0) {
    let obstRectXlt = Math.random() * 300;
    //let obstRectXrt = Math.random() * -350;
    let newRect = { posX: 0, posY: 0, width: obstRectXlt };
    arrayOfRect.push(newRect);
  }
  // 2 seconds have passed - Right side Obstacles
  if (frameCounter % 240 === 120) {
    //let obstRectXlt = Math.random() * 350;
    let obstRectXrt = Math.random() * 300; // -243
    let newRect = { posX: 500 - obstRectXrt, posY: 0, width: obstRectXrt };
    arrayOfRect.push(newRect);
  }

  //bkgY += 1;
  // pos3 += 1;
  frameCounter += 1;
}

const intervalID = setInterval(() => {
  drawBoard();
}, 1000 / 60);

let carPosX = 210;
//let carPosY = 520
document.onkeydown = function (event) {
  console.log("event.keyCode", event.keyCode);
  // left
  if (event.keyCode === 37) {
    carPosX -= 20;
  }
  // right
  if (event.keyCode === 39) {
    carPosX += 20;
  }
};
