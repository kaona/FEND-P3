// Enemies our player must avoid
// Parent class for sprite objects in the game
var GameObject = function(x, y, spriteInfo) {
   'use strict';
   this.x = x;
   this.y = y;
   this.spriteInfo = spriteInfo;
};

enemySpriteInfo = {
   sprite:'images/enemy-bug-small-99w-69h.png', //changed the sprite sizes to remove most of the whitespace.
   width: 99,
   height: 69
};

playerSpriteInfo = {
  sprite:'images/char-cat-girl-small-73w-85h.png',
  width: 73,
  height: 85,
  bound : { left: 5,                             //this creates the space in which the sprite can move on the screen/
            right: 430,                          // the numbers are coordinates.
            top: 50,
            bottom: 460},
  move :{ up: 83,                           // this creates the size of the player steps.
           down: 83,
           left: 101,
           right: 101}
};

// Draw the enemy and player on the screen, required method for game
GameObject.prototype.render = function () {
   "use strict";
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Child class (derived class) of GameObject
var Enemy = function(this, x, y, spriteInfo) {
   'use strict';
   GameObject.call(this, x, y, spriteInfo)); //This does not create this.x in the child. No, the this that you are passing in is substituting/
                                                // that as this in the GameObject constructor. Recall that/
                                                 // when you use the dot operator like GameObject.someFunction(),
                                                 // it implicitly passes in this. This is the thing to the left of the dot.
                                                 // So in this case, we don't want GameObject to become the this in the constructor.
                                                  // We want the derived class (its this) to override that hidden parameter
                                                  // and use the correct object in which to attach properties and functions to.
   this.speed = function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

};
// above
// You may want to keep it in there, but you could certainly manually set them after object creation.
// The thing about initializing through the constructor is that you're trying
// to guarantee that you have each piece of data defined with something.
Enemy.prototype = Object.create(GameObject.prototype); //builds the prototype for Enemy based on Object.prototype.

Enemy.prototype.constructor = Enemy; //this lets the program kown to get its details for Enemy from here, but prototype from GameObject

Enemy.prototype.update = function (dt) {
     'use strict';
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > 500) {  // This lets the bug smoothly get off screen before they re-start.
        this.x = -100;   //this resets the bug position ones it gets off the board so that it appears to walk on to the board/
                       // rather than popping onto the board at x:0.
    }
};


// Child class (derived class) of GameObject
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(this, x, y, spriteInfo) {
   'use strict';
   GameObject.call(this, x, y, spriteInfo);
};

Player.prototype = Object.create(GameObject.prototype);
Player.prototype.constructor = Player; //this lets the program kown to get its details for Enemy from here, but prototype from GameObject
// continue to add functions specific to Player
// Player doesn't really need an update function because it
// doesn't move based on time and velocity


// I am trying to get this to Player.prototype.update to reset the game if the player wins...
Player.prototype.update = function() {
    // 'use strict';
    // for (i = 0; i < allEnemies.length; i++){
    //     if ((checkCollisions(playerRect, allEnemiesRect)) = true) {
    //         player.reset();
    //     }
    // }
};

Player.prototype.reset = function(){              //this resets the player to his original position once he dies.
    'use strict';
    player.x = 216;
    player.y = 460;
};

Player.prototype.handleInput = function(allowedKeys){
    'use strict';                                                 //this creates control of player movements via keyboard arrows.
                                                      // by passing handleInput actions to player.
    switch(allowedKeys){

        case 'left' : if(this.x - this.movement <= this.bound.left){  //this line applies the player bound to its movement.
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

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

document.addEventListener('keyup', function(e) {
    'use strict';
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

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

var player = new Player(216, 460, playerSpriteInfo);

var Rectangle = function (x, y, width, height) {
    'use strict';
    this.left = x;
    this.top = y;
    this.right = this.left + width;
    this.bottom = this.top + height;
    this.width = width;
    this.height = height;
};
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
    'use strict';
    return !(playerRect.left > allEnemiesRect[i].right || playerRect.right < allEnemiesRect[i].left || playerRect.top > allEnemiesRect[i].bottom || playerRect.bottom < allEnemiesRect[i].top);
};


