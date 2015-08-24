// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug-small-99w-69h.png';
    this.w = 99; //sprite width
    this.h = 69; //sprite heigth
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > 505) {
        this.x = -10;
    }

    if(player.x >= this.x - 50 && player.x <= this.x + 50){
        if(player.y >= this.y - 35 && player.y <= this.y + 35)
        {
            player.reset();
        }
    }
};

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
    this.sprite = 'images/char-cat-girl-small-73w-85h.png';
    this.w = 73; //sprite width
    this.h = 85; //sprite heigth
};
// I am trying to get this to Player.prototype.update to reset the game if the player wins...
Player.prototype.update = function() {
   // if (this.y = 40) {
   //      this.reset();
   //  }
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(allowedKeys){

    switch(allowedKeys){

        case 'left' :
            if(this.x >= 0){
            this.x = this.x - 20;
        }
        break;

        case 'right':
            if(this.x <=420){
            this.x = this.x + 20;
        }
        break;

        case 'up':
            if(this.y >= 5){
            this.y = this.y - 20;
        }
        break;

        case 'down': if(this.y <= 480){
            this.y = this.y + 20;
        }
        break;
        }
};

Player.prototype.reset = function(){
    player.x = 0;
    player.y = 500;
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var enemy1 = new Enemy(100, 150, 25);
allEnemies.push(enemy1);
var enemy2 = new Enemy(-2, 150, 75);
allEnemies.push(enemy2);
var enemy3 = new Enemy(150, 235, 180);
allEnemies.push(enemy3);
var enemy4 = new Enemy(-2, 235, 90);
allEnemies.push(enemy4);
var enemy5 = new Enemy(-2, 305, 100);
allEnemies.push(enemy5);
var enemy6 = new Enemy(0, 390, 225);
allEnemies.push(enemy6);

var player = new Player(0, 500);

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
