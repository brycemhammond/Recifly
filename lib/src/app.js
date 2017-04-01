'use strict';
//Require dependencies and associated files
const vision = require('./index')
const yummly = require('yummly')

//Initialize authorization for GCloud Vision
vision.init({auth: 'AIzaSyCKRigvnHHMNer02RgrG2gK-B8PB4WS1O0'})

//Create object of Yummly API id and secret
const credentials = {
  id: '487f28fe',
  key: '3e7e404fa54917dd139edbf705d555ae'
}

//Initialize field variables
var arr = []
var label
var path = document.getElementsById("#fileUpload").value
console.log(path);

const nutritionKeys = ["SUGAR", "FAT", "PROCNT", "CHOCDF"]


// Construct parameters for GCloud Vision API Request
// Load 1st image from local storage
const req1 = new vision.Request({
  image: new vision.Image({
    path: `../uploads/${path}` //will become path to where file uploaded
  }),
  features: [
    new vision.Feature('LABEL_DETECTION', 10),
  ]
})

vision.annotate(req).then((res) => {
  // Handle response
  var totalResponse = JSON.stringify(res.responses);
  var label = res.responses[0].labelAnnotations[2].description
  console.log(label)
}, (e) => {
  console.log('Error: ', e)
})

// calling search first to get a recipe id
yummly.search({
  credentials: credentials,
  query: {
    q: label
  }
}, function (error, statusCode, recipe) {
  if (!error && statusCode == 200) {
    yummly.recipe({
      credentials: credentials,
      // get id of the first recipe returned by search
      id: recipe.matches[0].id
    }, function (error, statusCode, recipe) {
      if (!error && statusCode == 200) {
        // console.log(recipe.name, recipe.ingredientLines);
        console.log(recipe.name)
        for(var i = 0; i < recipe.nutritionEstimates.length; i++) {
          if (nutritionKeys.includes(recipe.nutritionEstimates[i].attribute)) {
            console.log(`${recipe.nutritionEstimates[i].description}: ${recipe.nutritionEstimates[i].value}`)
          }
        }
        console.log(`${recipe.numberOfServings}`)
        console.log(recipe.attribution.url)
        console.log(recipe.totalTime)
      } else {
        console.error(error);
      }
    });
  } else {
    console.error(error);
  }
});
