// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4;


// Define your ghosts here

var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: 'inedible'
};

var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: 'inedible'
};

var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: 'inedible'
};

var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Ora ge',
  character: 'Pokey',
  edible: 'inedible'
};

// replace this comment with your four ghosts setup as objects

var ghosts = ['Inky', 'Blinky', 'Pinky', 'Cyle'];

// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives + '    Power-Pellets: ' + powerPellets );
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  console.log('(p) Eat Power-Pellet');
  console.log('(1) Eat Inky (' + inky.edible +') ')
  console.log('(2) Eat Blinky (' + blinky.edible +') ')
  console.log('(3) Eat Pinky (' + pinky.edible +') ')
  console.log('(4) Eat Clyde (' + clyde.edible +') ')
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}

function eatGhost(ghost){
  if (ghost.edible === false) {
    ghost.edible = 'inedible'
    console.log('\nThe ' + ghost.colour + ' ghost ' + ghost.name + ' killed PacMan');
    lives -= 1;
    gameOver();
  }
  else {
    console.log('\nPac-man has eaten ' + ghost.colour + ' ghost ' + ghost.name + ' ');
    score += 200;
    ghost.edible = false;
    ghost.edible = 'inedible'
  }
}


function gameOver() {
  if (lives < 0) {
    console.log ('Pac-Man has been murdered')
    process.exit();
  }
}

function eatPowerPellet(){
  console.log('\nChomp!');
  score += 50;
  powerPellets -= 1;
  if (score > 0) {
    inky.edible = 'edible'
    blinky.edible = 'edible'
    pinky.edible = 'edible'
    clyde.edible = 'edible'
  }
  else {
    console.log('No Power-Pellets Left!');
  }
}


// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case 'p':
      eatPowerPellet();
      break;
    case '1':
      eatGhost(inky);
      break;
    case '2':
      eatGhost(blinky);
      break;
    case '3':
      eatGhost(pinky);
      break;
    case '4':
      eatGhost(clyde);
      break;
    default:
      console.log('\nInvalid Command!');
  }
}

//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
