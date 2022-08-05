const path = require('path');
const fs = require('fs');
const hsv = require('rgb-hsv');

//joining path of directory
const directoryPath = path.join(__dirname, 'BabyJasons/all');

let papaJason = {
  responses: []
};

//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        let babyFile = path.join(directoryPath, file);
        let jason = JSON.parse(fs.readFileSync(babyFile));

        jason.responses.forEach( function(imgData) {
          if( imgData.imagePropertiesAnnotation && imgData.imagePropertiesAnnotation.dominantColors) {
            let r = imgData.imagePropertiesAnnotation.dominantColors.colors[0].color.red;
            let g = imgData.imagePropertiesAnnotation.dominantColors.colors[0].color.green;
            let b = imgData.imagePropertiesAnnotation.dominantColors.colors[0].color.blue;

            let hsbArray = hsv(r,g,b);

            let p = imgData.context.uri;

            let dataToKeep = {
              imgFileName: p.substr(p.length - 9),
              rgbColor : {r: r, g: g, b:b},
              hsbColor : {h: hsbArray[0], s: hsbArray[1], b: hsbArray[2]}
            }
            // console.log(dataToKeep);
            papaJason.responses.push(dataToKeep);
          }
        })
    });
    // console.log(papaJason);
    fs.writeFileSync(`./AllHSBColors.json`, JSON.stringify(papaJason));

});

//console.log(papaJason.responses.length);
