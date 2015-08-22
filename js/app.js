// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.loc = (this.x, this.y);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.w = 101; //sprite width
    this.h = 171; //sprite heigth
    this.box = [this.x,this.y, this.w, this.h];


};




// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + 25 * dt;
    if (this.x > 505) {
        this.x = -10;
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
    this.sprite = 'images/char-boy.png';
    this.loc = (this.x, this.y);
    this.w = 101; //sprite width
    this.h = 171; //sprite heigth
    this.box = [this.x,this.y, this.w, this.h];
};

Player.prototype.update = function () {
        // Run collision detection for player against all enemies
        for(var i=0; i < allEnemies.length; i++) {

                if (this.box[0] < allEnemies[i].box[0] + allEnemies[i].box[2] &&
                   this.box[0] + this.box[2] > allEnemies[i].box[0] &&
                   this.box[1] < allEnemies[i].box[1] + allEnemies[i].box[3] &&
                   this.box[3] + this.box[1]> allEnemies[i].box[1]) {
                  // collision detected!
                    prompt("You Got Chomped By The Bug!");
                        this.loc = (202, 405);
                     }
                      else
                     {
                        return false;
                     }
        }
    };

// var collisionCheck = function() {
// // Run collision detection for player against all enemies
//         for(var i=0; i < allEnemies.length; i++) {

//                 if (this.box[0] < allEnemies[i].box[0] + allEnemies[i].box[2] &&
//                    this.box[0] + this.box[2] > allEnemies[i].box[0] &&
//                    this.box[1] < allEnemies[i].box[1] + allEnemies[i].box[3] &&
//                    this.box[3] + this.box[1]> allEnemies[i].box[1]) {
//                   // collision detected!
//                     prompt("You Got Chomped By The Bug!");
//                         this.loc = (202, 405);
//                      }
//                       else
//                      {
//                         return false;
//                      }
//         }
//     };

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

        case 'down': if(this.y <= 385){
            this.y = this.y + 20;
        }
        break;
        }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
allEnemies[0] = new Enemy (0, 65);
allEnemies[1] = new Enemy (0, 150);
allEnemies[2] = new Enemy (0, 245);

var player = new Player(202, 405);






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
