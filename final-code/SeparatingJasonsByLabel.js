const path = require('path');
const fs = require('fs');

//joining path of directory
const directoryPath = path.join(__dirname, 'BabyJasons/test');

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
          let dataToKeep = {
            imgFileName: imgData.context.uri,
            imgLabel: imgData.labelAnnotations[0].description
          }
          console.log(imgData.labelAnnotations[0].description);
          papaJason.responses.push(dataToKeep);
        })


    });

    // fs.writeFileSync(`./AllStreetArtLabels.json`, JSON.stringify(papaJason));

});

//console.log(papaJason.responses.length);
