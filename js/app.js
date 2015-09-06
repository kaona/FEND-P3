/* Enemies our player must avoid
 * Parent class for sprite objects in the game
 */
var GameObject = function(x, y, spriteInfo) {
    'use strict';
    this.x = x;
    this.y = y;
    this.spriteInfo = spriteInfo;
};

var enemySpriteInfo = {
    sprite: 'images/enemy-bug.png',
    width: 101,
    height: 171
};

/* bound : property creates the space in which the sprite can move on the screen
 * numbers in bound : property are coordinates on Canvas XY grid.
 * this creates the size of the player steps.
 */
var playerSpriteInfo = {
    sprite: 'images/char-cat-girl.png',
    width: 101,
    height: 171,
    bound: {
        left: 0,
        right: 404,
        bottom: 405
    },
    move: {
        upDown: 83,
        rightLeft: 101
    }
};

/* Draw the enemy and player on the screen, required method for game
 */
GameObject.prototype.render = function() {
    'use strict';
    ctx.drawImage(Resources.get(this.spriteInfo.sprite), this.x, this.y);
};

function getRandomInt(min, max) {
    'use strict';
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Child class (derived class) of GameObject
 * This does not create this.x in the child. No, the this that you are passing in is substituting/
 * that as this in the GameObject constructor. Recall that/
 * when you use the dot operator like GameObject.someFunction(),
 * it implicitly passes in this. This is the thing to the left of the dot.
 * So in this case, we don't want GameObject to become the this in the constructor.
 * We want the derived class (its this) to override that hidden parameter
 * and use the correct object in which to attach properties and functions to.
 */
var Enemy = function(x, y, spriteInfo) {
    'use strict';
    GameObject.call(this, x, y, spriteInfo);
    this.speed = getRandomInt(25, 150);
};

/*builds the prototype for Enemy based on Object.prototype.
 */
Enemy.prototype = Object.create(GameObject.prototype);

/*this lets the program kown to get its details for Enemy from here, but prototype from GameObject
 */
Enemy.prototype.constructor = Enemy;

/* You should multiply any movement by the dt parameter
 * which will ensure the game runs at the same speed for
 * all computers.
 * this.x lets the bug smoothly get off screen before they re-start.
 * this resets the bug position ones it gets off the board so that it appears to walk on to the board/
 * rather than popping onto the board at x:0.
 */

Enemy.prototype.update = function(dt) {
    'use strict';

    this.x = this.x + this.speed * dt;
    if (this.x > 500) {
        this.x = -100;
    }
};


/* Child class (derived class) of GameObject
 * Now write your own player class
 * This class requires an update(), render() and
 * a handleInput() method.
 */
var Player = function(x, y, spriteInfo) {
    'use strict';
    GameObject.call(this, x, y, spriteInfo);
};

Player.prototype = Object.create(GameObject.prototype);

/* Player.prototype.constructor lets the program kown to get its details for Enemy from here, but prototype from GameObject
 * continue to add functions specific to Player
 * Player doesn't really need an update function because it
 * doesn't move based on time and velocity
 */
Player.prototype.constructor = Player;

/* this resets the player to his original position once he dies.
 */
Player.prototype.reset = function() {
    'use strict';
    player.x = 202;
    player.y = 405;
};

/* Player.prototype.handleInput creates control of player movements via keyboard arrows.
 * by passing handleInput actions to player. It also uses the properties of bound and move in playerSpriteObject
 * to define its parameters.
 */
Player.prototype.handleInput = function(allowedKeys) {
    'use strict';
    switch (allowedKeys) {

        case 'left':
            this.x -= this.spriteInfo.move.rightLeft;
            if (this.x < this.spriteInfo.bound.left) {
                this.x += this.spriteInfo.move.rightLeft;
            }
            break;

        case 'right':
            this.x += this.spriteInfo.move.rightLeft;
            if (this.x > this.spriteInfo.bound.right) {
                this.x -= this.spriteInfo.move.rightLeft;
            }
            break;

        case 'up':
            this.y -= this.spriteInfo.move.upDown;
            if (this.y < this.spriteInfo.bound.top) {
                this.y += this.spriteInfo.move.upDown;
            }
            break;

        case 'down':
            this.y += this.spriteInfo.move.upDown;
            if (this.y > this.spriteInfo.bound.bottom) {
                this.y -= this.spriteInfo.move.upDown;
            }
            break;
    }
};

/* This listens for key presses and sends the keys to your
 * Player.handleInput() method. You don't need to modify this.
 */

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

/* Now instantiate your objects.
 * Place all enemy objects in an array called allEnemies
 * Place the player object in a variable called player
 */

var allEnemies = [
    new Enemy(100, 63, enemySpriteInfo),
    new Enemy(-2, 145, enemySpriteInfo),
    new Enemy(150, 230, enemySpriteInfo),
    new Enemy(-2, 230, enemySpriteInfo),
    new Enemy(-2, 310, enemySpriteInfo),
    new Enemy(0, 310, enemySpriteInfo)
];

var player = new Player(202, 405, playerSpriteInfo);