// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

let signs;
let textinput = '';

function preload() {
  signs = loadJSON( "/AllStreetArtTexts.json");
}

function setup() {
  noCanvas();
  // Assign the generate() function to the button
  var generateButton = select('#generate');
  generateButton.mousePressed(generate);

  var clearButton = select('#clear');
  clearButton.mousePressed(clearIt);

  for (let i = 0; i < signs.responses.length; i++) {
    textinput += signs.responses[i]
    textinput += ' '
  }
}

function clearIt() {
  var markovs = selectAll('.markov');
  for (var i = 0; i < markovs.length; i++) {
    markovs[i].remove();
  }
}


function generate() {
  // Get the HTML elements we need
  var order = select('#order');
  var length = select('#length');


  // Get the input text
  //var textinput = 'LA TV MIENTE!\nPIÑERA\nY SU GOBIERNO\nESTAN\nASESINANDO!!!\n13 Tvn\nLUCHAMOS POR\nDIGNIDAD!\nCHV 0\nNO ESTAMOS EN\nMECA\nGUERRA!!!!\n';

  // Create a generator with parameters
  var markov = new MarkovGeneratorWord(4, 200);

  // Split it up into line breaks
  var lines = textinput.split(' ');

  // Feed in the lines
  for (var i = 0; i < lines.length; i++) {
    // Trim out any extra white space
    markov.feed(lines[i].trim());
  }

  // Show the resulting output
  var par = createP(markov.generate());
  par.class('markov');
  par.parent('results');

}
