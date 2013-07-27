var canvas = document.createElement( "canvas" );
var ctx = canvas.getContext( "2d" );
var posX = 0;
var posY = 0;
var basicStepx = 35;
var basicStepy = 39;
var horStep;
var vertStep;

canvas.width = 316;
canvas.height = 355;

horStep = Math.floor( canvas.width / basicStepx );
vertStep = Math.floor( canvas.height / basicStepy );

document.getElementById( "stage" ).appendChild( canvas );

/* initialize the background */
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function() {
	bgReady = true;
};

bgImage.src = "images/bg.png";

/* initialize pacman */
var pacMan = {};
var pacManReady = false;
var pacManImage = new Image();
pacManImage.onload = function() {
	pacManReady = true;
};
pacManImage.src = "images/pacman32.png";
pacMan.x = pacManImage.x;
pacMan.y = pacManImage.y;

/* settings for the enemy */
var enemyImage = new Image();
var enemy = {};
enemyImage.src = "images/enemy.png";
enemy.x = 35;
enemy.y = 39;
var enemyDestroy = true; 
var lastx, lasty;


var main = function() {
	render();
};

var render = function() {
	if( bgReady ) {
		ctx.drawImage( bgImage, 0, 0 );
	}

	if( pacManReady ) {
		ctx.drawImage( pacManImage, pacMan.x, pacMan.y );

		/* if the enemy was destroy we get a new position */
		if( enemyDestroy ) {
			enemy.x = getRandom( 1 ) * enemyImage.width;
			enemy.y = getRandom( 0 ) * enemyImage.height;
			
			enemyDestroy = false;
		}
			
		ctx.drawImage( enemyImage, enemy.x, enemy.y );
	}
};

setInterval( main, 1 );

function getRandom( verHor ) {
	if( verHor )
		return Math.floor((Math.random() * horStep) + 1 );

	return Math.floor((Math.random() * vertStep) + 1 );	
}

function checkDestruction( hx, hy, ex, ey ) {
	if( hx == ex && hy == ey )
		enemyDestroy = true;
}

function moveRight() {
	if( parseInt( pacManImage.width ) * (posX + 2) < canvas.width ) {
		posX++;
		pacMan.x = parseInt( pacManImage.width ) * posX;

		pacManImage.src = "images/pacman32.png";	
		//enemyDestroy = true;
		checkDestruction( pacMan.x, pacMan.y, enemy.x, enemy.y );

		render();
	}
}

function moveleft() {
	if( parseInt( pacManImage.width ) * posX > 0 ) {
		posX--;
		pacMan.x = parseInt( pacManImage.width ) * posX;

		pacManImage.src = "images/pacman32l.png";
		checkDestruction( pacMan.x, pacMan.y, enemy.x, enemy.y );

		render();
	}
}


function moveUp() {
	if( parseInt( pacManImage.height ) * posY > 0 ) {
		posY--;
		pacMan.y = parseInt( pacManImage.height ) * posY;
		
		pacManImage.src = "images/pacman32u.png";
		checkDestruction( pacMan.x, pacMan.y, enemy.x, enemy.y );

		render();
	}
}

function moveDown() {
	if( parseInt( pacManImage.height ) * ( posY + 2) < canvas.height ) {
		posY++;
		pacMan.y = parseInt( pacManImage.height ) * posY;

		pacManImage.src = "images/pacman32d.png";
		checkDestruction( pacMan.x, pacMan.y, enemy.x, enemy.y );

		render();
	}
}