'use strict'
const vision = require('./index')
const express = require('./express')

// init with auth
vision.init({auth: 'AIzaSyCKRigvnHHMNer02RgrG2gK-B8PB4WS1O0'})

// construct parameters
const req = new vision.Request({
  image: new vision.Image('../uploads/apple.jpg'),
  features: [
    new vision.Feature('LABEL_DETECTION', 10),
  ]
})

//init app
const app = express();

//uploads route


// send single request
vision.annotate(req).then((res) => {
  // handling response
  var totalResponse = JSON.stringify(res.responses);
  var label = res.responses[0].labelAnnotations[2].description;
  console.log(label)
}, (e) => {
  console.log('Error: ', e)
})


// // 2nd image of request is load from Web
// const req2 = new vision.Request({
//   image: new vision.Image({
//     path: '../uploads/banana.jpg'
//   }),
//   features: [
//     new vision.Feature('LABEL_DETECTION', 10),
//   ]
// })
