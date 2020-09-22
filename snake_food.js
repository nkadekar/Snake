//snake class
function Snake() {
    this.dir_x = 1; //direction in the x direction, 0 means snake not moving in x dir.
    this.dir_y = 0; //direction in the y direction, 0 means snake not moving in y dir.
    this.dir = "right"; //used to protection against reversing direction
    this.speed = 1; //can increase the speed at which the snake moves
    this.size = 1; //size of the snake, works with grow function
    this.location = [{x: 0, y: 0}] //[{x: (screen_width / 2), y: (screen_height / 2)}];//stores locations of the snake segments, works with grow

    //draws the snake on the board
    this.drawSnake = function(){
        fill(255);
        for (let i = 0; i < this.location.length; i++) {
            rect(this.location[i].x, this.location[i].y, block_size, block_size);
        }
    }

    //moves the snake
    this.move = function(){
        var newX = this.location[0].x + (this.dir_x) * (block_size) * (this.speed);
        var newY = this.location[0].y + (this.dir_y) * (block_size) * (this.speed);
        let newhead = {x: newX, y :newY};
        for (var i = this.location.length - 1; i > 0; i--){
            this.location[i] = this.location[i - 1];
        }
        this.location[0] = newhead;
        checkBoundary();
        this.collision();
        // for (let i = 0; i < this.location.length; i++){
        //     console.log(i + " " + this.location[i].x + " " + this.location[i].y);
        // }
    }

    //this is called after the player loses
    this.resetSnake = function(){
        alert("You Lose");
        this.location = [{x: 0, y: 0}];//[{x: (screen_width / 2), y: (screen_height / 2)}];
        this.dir_x = 1;
        this.dir_y = 0;
        this.size = 1;
    }

    //changes snake's direction
    this.changeDirection = function(x, y){
        this.dir_x = x;
        this.dir_y = y;
    }

    //grows the snake when it eats food
    this.grow = function(length){ //takes in length the snake will be increased by
        var tail = this.location[this.location.length - 1];
        for (let i = 0; i < length; i++){
            this.location.push(tail);
        }
        this.size += length;
    }

    //ends game when the snake runs into itself
    this.collision = function(){
        if(onSnake(this.location[0].x, this.location[0].y)){
            this.resetSnake();
        }
    }
};



//food class
function Food(){
    this.x = getRandomInt(0, (screen_width - block_size)  / block_size) * block_size;
    this.y = getRandomInt(0, (screen_height - block_size) / block_size) * block_size;

    //accessor function for x pos
    this.getX = function(){
        return this.x;
    }

    //accessor fuction for y pos
    this.getY = function(){
        return this.y;
    }

    //draws the food on the board
    this.drawFood = function () {
        fill('red');
        rect(this.x, this.y, block_size, block_size);
        // image(img, this.x, this.y, block_size, block_size);
    }

    //resets the food when the snake dies
    this.resetFood = function() {
        this.x = getRandomInt(0, (screen_width - block_size)  / block_size) * block_size;
        this.y = getRandomInt(0, (screen_height - block_size) / block_size) * block_size;
    }

    //creates random coordinates for snake and changes x and y
    this.randomCoord = function(){
        var oldCoordX = this.x;
        var oldCoordY = this.y;
        var newX = getRandomInt(0, (screen_width - block_size) / block_size) * block_size;
        var newY = getRandomInt(0, (screen_height - block_size) / block_size) * block_size;
        while (Math.abs(newX - oldCoordX) < (block_size * 2) || Math.abs(newY - oldCoordY) < (block_size * 2)){
            newX = getRandomInt(0, (screen_width - block_size) / block_size) * block_size;
            newY = getRandomInt(0, (screen_height - block_size) / block_size) * block_size;
        }
        this.x = newX;
        this.y = newY;
    }
};