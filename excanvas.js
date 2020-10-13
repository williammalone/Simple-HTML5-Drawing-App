// thanks to @aecend and @tmrDevelops for help with the code, and @XDBoy018 for starting the #canvas-club!

// variables
var canvas = document.getElementById("c");
var ctx = canvas.getContext("2d");
var color = document.getElementById("color");
var mousedown = false;
var mouseup = true;
var sizeIncrement = 1;
var size = 5;
var current = "draw";
var theColor;

// make the background color of the canvas be white
canvas.style.backgroundColor = "white";

// make the squares larger...
function grow(event) {
  var mouseX = event.clientX || event.pageX;
  var mouseY = event.clientY || event.pageY;

  while (mousedown = true && size < 10) {
    sizeIncrement++;
    size += sizeIncrement;
  }

  ctx.fillRect(mouseX, mouseY, size, size);  
  ctx.fillStyle = randomColor();
}

// ...and make them go back to normal size
function shrink(event) {
  var mouseX = event.clientX || event.pageX;
  var mouseY = event.clientY || event.pageY;
  
  if (mouseup = true && size > 5) {
    size = 5;
  }
}

// are we drawing with a random color, erasing, 
// or drawing with a specific color?
function tool(event) {
  var mouseX = event.clientX || event.pageX;
  var mouseY = event.clientY || event.pageY;

  if (current == "draw") {
    ctx.fillStyle = randomColor();
    ctx.fillRect(mouseX, mouseY, size, size);
  }
  else if (current == "erase") {
    ctx.clearRect(mouseX, mouseY, size, size);
  }
  else if (current == "color") {
    ctx.fillStyle = document.getElementById('color').value;
    ctx.fillRect(mouseX, mouseY, size, size); 
  }
}

// tell tool() what we're doing
function eraser() {
  current = "erase";
}

function draw() {
  current = "draw";
}

function setColor() {
  current = "color";
  theColor = document.getElementById('color').value;
}

// get a random color in rgb() format
function randomColor() {
  var r = 255 * Math.random() | 0;
  var g = 255 * Math.random() | 0;
  var b = 255 * Math.random() | 0;
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}

// clear the canvas
function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  sizeIncrement = 1
  size = 5;
  ctx.fillStyle = randomColor();
  canvas.style.backgroundColor = "white";
}

// set a custom background color
function setbgColor() {
  canvas.style.backgroundColor = document.getElementById('color').value;
}

// take a picture of the canvas
function savePicture() {
    var canvas2 = document.createElement("canvas"); // create a temporary canvas
    var ctx2 = canvas2.getContext("2d"); // get its context
    canvas2.width = canvas.width; // set its width
    canvas2.height = canvas.height; // set its height

    ctx2.drawImage(canvas, 0, 0); // draw the main canvas onto it

    ctx.fillStyle = canvas.style.backgroundColor; // set the fillStyle to the CSS color
    ctx.fillRect(0, 0, canvas.width, canvas.height); // fill the main canvas that color
    ctx.fillStyle = theColor; // set the fillStyle back to what it was

    ctx.drawImage(canvas2, 0, 0); // draw the temporary canvas on top of the main one

    window.open(canvas.toDataURL()); // convert to image and open a window

    ctx.clearRect(0, 0, canvas.width, canvas.height); //Clear main canvas
    ctx.drawImage(canvas2, 0, 0); // put original image back on main canvas
}

// here's where we call functions
window.onload = draw;

canvas.addEventListener("mousedown", grow);
canvas.addEventListener("mouseup", shrink);
canvas.addEventListener("mousemove", tool);

document.getElementById("clear").onclick = clear;
document.getElementById("draw").onclick = draw;
document.getElementById("erase").onclick = eraser;
document.getElementById('set-color').onclick = setColor;
document.getElementById("random-color").onclick = draw;
document.getElementById("background-color").onclick = setbgColor;
document.getElementById("picture").onclick = savePicture;
