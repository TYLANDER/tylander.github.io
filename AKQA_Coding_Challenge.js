//This is the coding challenge for all new akqa employees. The rover team must respond to a series of commands sent to them as consecutive lines. This version moves the rovers upon a visual grid. Later versions will have the ability to make multiple rovers. 

console.log('Rover code loaded');

//Establishing position and movement parameters for the plateau visualization
var CONST_X_CENTER = 240;
var CONST_Y_CENTER = 240;
var CONST_STEP = 25;

//Establishing Rover's Starting Position
function Rover( name, startX, startY, startAngle ) {
	this.name = name;
	this.x = startX;
	this.y = startY;
	this.angle = startAngle;
	this.curDirection = ''

	$('.rover').css('top', CONST_Y_CENTER - (this.y * CONST_STEP));
	$('.rover').css('left', CONST_X_CENTER + (this.x * CONST_STEP));
	this.rotate(0);
}

//The Rover Rotation Function
Rover.prototype.rotate = function(angle) {
	console.log('Command > Rotate rover ' + this.name + " by " + angle );
	this.angle += angle;
	if (this.angle >= 360) {
		this.angle = 0
	} else if (this.angle <= -90) {
		this.angle = 270;
	}
	
	// Rotate rover html element to match value here
	$('.rover').removeClass(this.curDirection);
	switch (this.angle) {
		case 0:
			this.curDirection = 'north';
			break;
		case 90:
			this.curDirection = 'east';
			break;
		case 180:
			this.curDirection = 'south';
			break;
		case 270:
			this.curDirection = 'west';
			break;
	}
	$('.rover').addClass(this.curDirection);
	
}

//The Rover Movement logging function
Rover.prototype.move = function() {
	switch (this.angle){
		case 0:
			this.y += 1;
			break;
		case 90:
			this.x += 1;
			break;
		case 180:   
			this.y -= 1;
			break;
		case 270:
			this.x -= 1;
			break;
		default:
			console.log("Something went wrong in the move function for rover " + this.name)
	};
	$('.rover').css('top', CONST_Y_CENTER - (this.y * CONST_STEP));
	$('.rover').css('left', CONST_X_CENTER + (this.x * CONST_STEP));
}


Rover.prototype.report = function() {
	return "Rover " + this.name + " is in position " + this.x + "," + this.y + " facing " + this.angle;
}

var rover1 = new Rover("Kyle", 0, 0, 0);
//var rover2 = new Rover("Kenny", 3, 3, 180);

//var rover1 = createRover();
//var rover2 = createRover();

commandRover(rover1);
//commandRover(rover2);

$('.rover').addClass('north');


//Turn this area into a rover controller object that can create new rover objects. 
//someting like please ask for a name and starting coordinates for the rover. Then prompt to add another rover. 
function createRover() {
	var roverName = prompt("Please select a name for your rover");
	var roverX = prompt("Please select the starting X coordinate");
	var roverY = prompt("Please select the starting Y coordinate");
	var roverDirection = prompt("Please select the starting direction the rover is facing");
	console.log('New rover: ', roverName, roverX, roverY, roverDirection);
	return new Rover( roverName, roverX, roverY, roverDirection);
}

//commandRover(newRover);

//the rover commands
function commandRover( rover ) {
	console.log('Initiating commands for rover ' + rover.name );
	
	var commands = prompt("Enter in your command (L, R, M):" + " ");
	var commandArray = commands.split('');

	var i = 0,
		j = commandArray.length;	
	for (i;i<j;++i) {
		runCommand( rover, commandArray[i] );
	}

}

function runCommand( rover, command ) {
	if (command == "L") {
		rover.rotate(-90); 
	} else if (command == "R"){
		rover.rotate (90);
	} else if (command == "M"){
		rover.move()
	}	
}

console.log(rover1.report())



/*
var rovers = {};

for (var i=0; i<=10; i++) {
	console.log(i);
	rovers['rover'+i] = createRover();
}

commandRover(rovers['tyler']);
//commandRover(rover2);
*/
