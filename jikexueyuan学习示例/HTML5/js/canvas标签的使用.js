var CANVAS_WIDTH = 500,
CANVAS_HEIGHT = 500,
myCanvas,context;
window.onload = function() {
    createCanvas();
    drawImage()
}

function createCanvas() {
    document.body.innerHTML = "<canvas id=\"myCanvas\" width=\"" + CANVAS_WIDTH + "\" height=\"" + CANVAS_HEIGHT + "\"></canvas>"
    myCanvas = document.getElementById("myCanvas");
    context = myCanvas.getContext("2d");
}

function drawRect() {
    context.fillStyle = "#f00";
    // context.rotate(45); // 旋转
    // context.translate(200, 200); // 平移
    context.scale(2, 0.5); // 缩放
    context.fillRect(0, 0, 200, 200);
}

function drawImage() {
    var img = new Image();
    img.onload = function() {
        context.drawImage(img, 0, 0);
    }
    img.src = "img/portrait_messi.jpg";
}