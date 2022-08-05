const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'Jasons');

let makeBabyJason = (fileName) => {

  console.log(`humping jason number: ${fileName}`);
  let jason = JSON.parse(fs.readFileSync(`./Jasons/${fileName}`));

  if(!jason.error) {
    let babyJasons = [];
    jason.responses.forEach( res => {
      let newObject = {};
      newObject.labelAnnotations = res.labelAnnotations;

      newObject.textAnnotations = {
        locale : '',
        description : ''
      };

      if(res.textAnnotations !== undefined && res.textAnnotations.length > 0) {
        newObject.textAnnotations.locale = res.textAnnotations[0].locale,
        newObject.textAnnotations.description = res.textAnnotations[0].description
      }

      newObject.imagePropertiesAnnotation = res.imagePropertiesAnnotation;

      newObject.fullTextAnnotation = { text: '' }

      if( res.fullTextAnnotation !== undefined
          && res.fullTextAnnotation.text !== undefined)
      {
          newObject.fullTextAnnotation.text = res.fullTextAnnotation.text;
      }

      newObject.context = res.context;

      newObject.localizedObjectAnnotations = [];

      if(res.localizedObjectAnnotations !== undefined) {
        res.localizedObjectAnnotations.forEach( x => {
          newObject.localizedObjectAnnotations.push({
            name: x.name,
            score: x.score
          })
        });
      }

      babyJasons.push(newObject);
    });

    let myBabyJason = { "responses" : babyJasons };
    fs.writeFileSync(`./BabyJasons/${fileName}`, JSON.stringify(myBabyJason));
    console.log(`gave birth to baby jason number: ${fileName}`);
  }

};



fs.readdir( dir, function(err, files) {
  if(err) { return console.log("error betch") }
  files.forEach(makeBabyJason);
});
