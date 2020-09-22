//global variables
const screen_width = 720;
const screen_height = 510;
const block_size = 30;
var currScore = 0;
var highScore = 0;

//P5.js SETUP function - sets up game
function setup() {
    createCanvas(screen_width, screen_height);
    s = new Snake();
    f = new Food();
}

//P5.js DRAW function - runs nonstop
function draw() {
    if(currScore < 5){
        frameRate(7.5);
        document.getElementById("levelNum").innerHTML = 1;
    }
    else if(currScore >= 5 && currScore < 10) {
        frameRate(8);
        document.getElementById("levelNum").innerHTML = 2;
    
    }
    else if (currScore >= 10 && currScore < 15) {
        frameRate(8.5);
        document.getElementById("levelNum").innerHTML = 3;
    }
    else{
        frameRate(9);
        document.getElementById("levelNum").innerHTML = 4;
    }
    s.move();
    clear();
    s.drawSnake();
    f.drawFood();
    snakeEatsFood();
}

//calls for direction change on arrow buttons being pressed
function keyPressed(){
    if (keyCode == '38' && s.dir != "down") { //up key
        s.dir = "up";
        s.changeDirection(0, -1);
    }
    else if (keyCode == '40' && s.dir != "up" ) { //down key
        s.dir = "down";
        s.changeDirection(0, 1);
    }
    else if (keyCode == '37' && s.dir != "right") { //left key
        s.dir = "left";
        s.changeDirection(-1, 0);
    }
    else if (keyCode == '39' && s.dir != "left") { //right key
        s.dir = "right";
        s.changeDirection(1, 0);
    }
}

//checks if the snake has gone out of bounds
checkBoundary = function() {
    if (s.location[0].x < 0 || s.location[0].x > (screen_width - block_size) || s.location[0].y < 0 || s.location[0].y > (screen_height - block_size)){
        s.resetSnake();
        f.resetFood();
        highScore = Math.max(highScore, currScore);
        document.getElementById("highScoreNumber").innerHTML = Math.max(highScore, currScore);
        document.getElementById("scoreNumber").innerHTML = 0;
        currScore = 0;
    }
}

//function that is executed the when the snake runs over the food
function snakeEatsFood(){
    if (Math.abs(s.location[0].x - f.getX()) < block_size && Math.abs(s.location[0].y - f.getY()) < block_size){
        currScore++;
        document.getElementById("scoreNumber").innerHTML = currScore;
        s.grow(3);
        s.drawSnake();
        f.randomCoord();
        f.drawFood();
    }
}

//generates random in within range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//checks if parameters are on the snake
function onSnake(xCoord, yCoord){ //checks to see whether passed in coords are on the snake
    var temp = {x: xCoord, y: yCoord};
    // console.log("line 81: " + temp.x + " " + temp.y);
    for (var i = 3; i < s.location.length; i++){
        if (s.location[i].x == temp.x && s.location[i].y == temp.y && s.size != 1){
            console.log("collision " + i);
            return true;
        }
    }
    return false;
}