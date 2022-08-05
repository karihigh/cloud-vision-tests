

let signs;

function preload() {
  signs = loadJSON("/AllHSBColors2.json");
  // console.log(signs);
  console.log('I loaded the json');
}

function setup() {
  createCanvas(1000, 1000);
  signs = signs.responses;
  // signs.sort( (x,y) => {
  //   let h = x.hsbColor.h - y.hsbColor.h;
  //   let hd = Math.abs(h)/360;
  //   let s = x.hsbColor.s - y.hsbColor.s;
  //   let sd = Math.abs(x.hsbColor.s - y.hsbColor.s)/100;
  //   let b = x.hsbColor.b - y.hsbColor.b;
  //   let bd = Math.abs(x.hsbColor.b - y.hsbColor.b)/100;
  //
  //   return hd * h + (1-hd)*s;
  // });
  noLoop();
}

// **MANY TILES
function draw() {
  background(220);
  w = 10
  h = 10
  x = 0
  y = 0
  console.log(signs.length);
  for (let i = 0; i < signs.length; i++) {
    let imgData = signs[i].rgbColor;
    let r = imgData.r;
    let g = imgData.g;
    let b = imgData.b;

    let c = color(r, g, b);
    fill(c);
    noStroke();
    rect(x, y, w, h);
    x += h;
    if(x >= width) {
      y += w
      x = 0
    }
  }
}
