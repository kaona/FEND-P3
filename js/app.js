// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed * (Math.floor(Math.random() * 4) + 2); //This changes the enemy speeds randomly.

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug-small-99w-69h.png'; //changed the sprite sizes to remove most of the whitespace.
    this.width = 99;
    this.height = 69;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > 500) {  // This lets the bug smoothly get off screen before they re-start.
        this.x = -100;   //this resets the bug position ones it gets off the board so that it appears to walk on to the board/
                       // rather than popping onto the board at x:0.
    }
    // if(player.y >= this.y && player.y <= this.y + 69){      // this creates a collission when both conditions are met.
    //     if(player.x <= this.x + 99 && player.x >= this.x) // if both line 28 conditions met, line 29 is checked.
    //     {
    //         player.reset();                                     // if all conditions met, player "dies" and is reset to starting position.
    //     }
    // }
};





//     if(player.x >= this.x -60 && player.x <= this.x + 80){      // this creates a collission when both conditions are met.
//         if(player.y >= this.y - 70 && player.y <= this.y + 69) // if both line 28 conditions met, line 29 is checked.
//         {
//             player.reset();                                     // if all conditions met, player "dies" and is reset to starting position.
//         }
//     }
// };

// Draw the enemy on the screen, required method for game

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x,y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-cat-girl-small-73w-85h.png'; // sprite whitespace removed.
    this.width = 73; //sprite width
    this.height = 85; //sprite heigth
    this.bound = { left: 5,                             //this creates the space in which the sprite can move on the screen/
                   right: 430,                          // the numbers are coordinates.
                   top: 50,
                   bottom: 460};
    this.movement = { up: 83,                           // this creates the size of the player steps.
                      down: 83,
                      left: 101,
                      right: 101};
};

// I am trying to get this to Player.prototype.update to reset the game if the player wins...
Player.prototype.update = function() {
    for (i = 0; i < allEnemies.length; i++){
        if ((checkCollisions(playerRect, allEnemiesRect)) = true) {
            player.reset();
        }
    }
};



// Rectangle constructor function - I would love to learn how to do this Commented/
// out stuff below. I dont understand how to get it to work.

// Object.prototype.rectangle = function (x, y, w, h) {
//     this.left = x;
//     this.top = y;
//     this.right = this.left + w;
//     this.bottom = this.top + h;
//     this.width = w;
//     this.height = h;
// }
// Player.prototype.rectangle = Object.prototype.rectangle();
// Enemy.prototype.rectangle = Object.prototype.rectangle();
// Object.prototype.rect = Rectangle (this.x, this.y, this.w, this.h);

// Check to see if the rectangles overlap
// function checkCollisions(player.rectangle, allEnemies[i].rectangle) {
//     r1 = player.rectangle;
//     r2 = allEnemies[i].rectangle;
//     if !(r1.left > r2.right || r1.right < r2.left || r1.top > r2.bottom || r1.bottom < r2.top) {
//         var collision = false;
//     }
// };


Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y); //this renders the sprite image in the right place.
};

Player.prototype.handleInput = function(allowedKeys){ //this creates control of player movements via keyboard arrows.
                                                      // by passing handleInput actions to player.
    switch(allowedKeys){

        case 'left' :
            if(this.x - this.movement <= this.bound.left){  //this line applies the player bound to its movement.
            this.x = this.bound.left;
        } else this.x = this.x - this.movement.left;        //this creates the movement for this case.
        break;

        case 'right':
            if(this.x + this.movement >= 430){
                this.x = this.bound.right;
        } else this.x = this.x + this.movement.right;
        break;

        case 'up':
            if(this.y - this.movement.up <= this.bound.top) {
            this.y = this.bound.top;
        } else this.y = this.y - this.movement.up;
        break;

        case 'down':
            if(this.y + this.movement.down >= this.bound.bottom) {
            this.y = this.bound.bottom;
        } else this.y = this.y + this.movement.down;
        break;
    }
};

Player.prototype.reset = function(){              //this resets the player to his original position once he dies.
    player.x = 216;
    player.y = 460;
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var enemy1 = new Enemy(100, 150, 25);               //this creates new Enemy using the Enemy constructor.
allEnemies.push(enemy1);
var enemy2 = new Enemy(-2, 150, 35);
allEnemies.push(enemy2);
var enemy3 = new Enemy(150, 235, 45);
allEnemies.push(enemy3);
var enemy4 = new Enemy(-2, 235, 30);
allEnemies.push(enemy4);
var enemy5 = new Enemy(-2, 305, 45);
allEnemies.push(enemy5);
var enemy6 = new Enemy(0, 390, 100);
allEnemies.push(enemy6);

var player = new Player(216, 460);

var Rectangle = function (x, y, width, height) {
    this.left = x;
    this.top = y;
    this.right = this.left + width;
    this.bottom = this.top + height;
    this.width = width;
    this.height = height;
}
// var playerRect = new Rectangle(player.x, player.y, player.width, player.height);
// var enemy1Rect = new Rectangle(enemy1.x, enemy1.y, enemy1.width, enemy1.height);
// function checkCollision(playerRect, enemy1Rect) {
//     return !(playerRect.left > enemy1R.right || playerRect.right < enemy1Rect.left || playerRect.top > enemy1Rect.bottom || playerRect.bottom < enemy1Rect.top);
// };
var playerRect = new Rectangle(player.x, player.y, player.width, player.height);

for (var i = 0; i < allEnemies.length; i++) {
    allEnemiesRect = new Rectangle(allEnemies[i].x, allEnemies[i].y, allEnemies[i].width, allEnemies[i].height);
}
var checkCollisions = function(playerRect, allEnemiesRect) {
    return !(playerRect.left > allEnemiesRect[i].right || playerRect.right < allEnemiesRect[i].left || playerRect.top > allEnemiesRect[i].bottom || playerRect.bottom < allEnemiesRect[i].top);
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
