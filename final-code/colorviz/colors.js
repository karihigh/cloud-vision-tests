

let signs;

let hueBuckets = [];
let bCount = 60;
let bRange = 360/bCount;

let w = 5;
let h = 15;

let offset = 100;

function preload() {
  signs = loadJSON("/AllHSBColors2.json");
  // console.log(signs);
  console.log('I loaded the json');
}

function setup() {
  createCanvas(2000, 2000);
  signs = signs.responses;
  for(let i=0; i<bCount; i++) {
    hueBuckets[i] = [];
  }

  signs.forEach( s => {
    let hIndex = Math.floor( ((s.hsbColor.h+offset) % 360) / bRange );
    hueBuckets[hIndex].push(s);
  })
  noStroke();
  noLoop();
}


function draw() {
  for(let i=0; i<hueBuckets.length; i++)  {
    let buck = hueBuckets[i];
    buck.sort( (x,y) => y.hsbColor.s - x.hsbColor.s);
    let y = i*h;
    for(let j=0; j<buck.length; j++)  {
      let c = buck[j];
      let x = j*w;
      fill( c.rgbColor.r, c.rgbColor.g, c.rgbColor.b );
      rect(x, y, w, h);
    }
  }
}



//
// // **MANY TILES
// function draw() {
//   background(220);
//   w = 10
//   h = 10
//   x = 0
//   y = 0
//   console.log(signs.length);
//   for (let i = 0; i < signs.length; i++) {
//     let imgData = signs[i].rgbColor;
//     let r = imgData.r;
//     let g = imgData.g;
//     let b = imgData.b;
//
//     let c = color(r, g, b);
//     fill(c);
//     noStroke();
//     rect(x, y, w, h);
//     x += h;
//     if(x >= width) {
//       y += w
//       x = 0
//     }
//   }
// }
