# Recifly

Recifly is a web-based application designed to analyze pictures of food items, and return a set of recipes that incorporate those particular food items found in the pictures.

This application was built during the NSBE 2017 National Hackathon with over 100 competitors. [#NSBE43](http://convention.nsbe.org/hackathon/)

## Purpose

The purpose of this application is to automate the process of choosing what to make with a set of available food items (aka ingredients). This application saves users time and money. The application encourages users to take advantage of the food they have or provides a unique method to determine how to meal prep. The target audience includes any sets of users that cook on a semi-frequent basis (e.g., families, college students, single employees).

## Operation

The pictures are uploaded to the website by the user. Recify analyzes the pictures using the Vision API, returning labels of the food items as a list. This information is queried via the Yummly API, which returns a JSON response. This response is parsed to identify the recipes that incorporates all of the food items on the list. The recipes are displayed to the user using pictures and descriptive captions.

## Elements

* HMTL, CSS, Javascript - Used to create the front-end display for the user to interact with the user
* Node.js - Used to interface between the APIs and the front-end display
* [Google Cloud Vision API](https://cloud.google.com/vision/) - Used to recognize and label objects in photos
* [Yummly API](https://developer.yummly.com/#the-api) - Used to find recipe alternatives when provided with ingredient queries 

___

## Node Cloud Vision API
node-cloud-vision-api is a node client wrapper for Cloud Vision API.

Cloud Vision API Docs
https://cloud.google.com/vision/docs/

Note that currently only limited preview for alpha-test users.

Supported features

Feature Type  | Description
------------- | -------------
FACE_DETECTION  | Run face detection
LANDMARK_DETECTION  | Run models to execute landmark detection
LOGO_DETECTION | Run models to execute product logo detection
LABEL_DETECTION | Run models to execute Image Content Analysis
TEXT_DETECTION | Run models to execute OCR on an image
SAFE_SEARCH_DETECTION | Run models to compute image safe search properties


## Setup
### Preparation
- Sign up limited preview for Cloud Vision API https://cloud.google.com/vision/
- Cloud Vision API Key is needed

### Install
` npm install node-cloud-vision-api --save`

### Auth
API requests on node-cloud-vision-api is internally managed by [google-api-nodejs-client](https://github.com/google/google-api-nodejs-client/)

You can setup auth data with the following samples

* Use Server Key
```JavaScript
const vision = require('node-cloud-vision-api')
vision.init({auth: 'YOUR_API_KEY'})
```

* Use OAuth
```JavaScript
const vision = require('node-cloud-vision-api')
const google = require('googleapis')
const oauth2Client = new google.auth.OAuth2('YOUR_GOOGLE_OAUTH_CLIENT_ID', 'YOUR_GOOGLE_OAUTH_SECRET', 'YOUR_GOOGLE_OAUTH_CALLBACK_URL')
oauth2Client.setCredentials({refresh_token: 'YOUR_GOOGLE_OAUTH_REFRESH_TOKEN'})
vision.init({auth: oauth2Client})
```

* For others, see references.
[google-api-nodejs-client](https://github.com/google/google-api-nodejs-client/)

## Sample

```JavaScript
'use strict'
const vision = require('node-cloud-vision-api')

// init with auth
vision.init({auth: 'YOUR_API_KEY'})

// construct parameters
const req = new vision.Request({
  image: new vision.Image('/Users/tejitak/temp/test1.jpg'),
  features: [
    new vision.Feature('FACE_DETECTION', 4),
    new vision.Feature('LABEL_DETECTION', 10),
  ]
})

// send single request
vision.annotate(req).then((res) => {
  // handling response
  console.log(JSON.stringify(res.responses))
}, (e) => {
  console.log('Error: ', e)
})
```
See more in [test_annotate.js](https://github.com/tejitak/node-cloud-vision-api/blob/master/test_annotate.js)

## Remote image file sample
Image files on web can be specified with 'url' paramters in Image object

```JavaScript
const req = new vision.Request({
  image: new vision.Image({
    url: 'https://scontent-nrt1-1.cdninstagram.com/hphotos-xap1/t51.2885-15/e35/12353236_1220803437936662_68557852_n.jpg'
  }),
  features: [
    new vision.Feature('FACE_DETECTION', 1),
    new vision.Feature('LABEL_DETECTION', 10),
  ]
})
```
See more in [test_annotate_remote.js](https://github.com/tejitak/node-cloud-vision-api/blob/master/test_annotate_remote.js)

## Multiple Requests per API call

```JavaScript
// construct parameters
// 1st image of request is load from local
const req1 = new vision.Request({
  image: new vision.Image({
    path: '/Users/tejitak/temp/test1.jpg'
  }),
  features: [
    new vision.Feature('FACE_DETECTION', 4),
    new vision.Feature('LABEL_DETECTION', 10),
  ]
})

// 2nd image of request is load from Web
const req2 = new vision.Request({
  image: new vision.Image({
    url: 'https://scontent-nrt1-1.cdninstagram.com/hphotos-xap1/t51.2885-15/e35/12353236_1220803437936662_68557852_n.jpg'
  }),
  features: [
    new vision.Feature('FACE_DETECTION', 1),
    new vision.Feature('LABEL_DETECTION', 10),
  ]
})

// send multi requests by one API call
vision.annotate([req1, req2]).then((res) => {
  // handling response for each request
  console.log(JSON.stringify(res.responses))
}, (e) => {
  console.log('Error: ', e)
})
```
See more in [test_annotate_remote.js](https://github.com/tejitak/node-cloud-vision-api/blob/master/test_annotate_remote.js)

## Supported Node Version

Recommended node version is above v4.0.0 because this module is implemented with ES6.

___

## How to create a PR

Fork the repository and create a PR to 'dev' branch.

## Authors
  
* [Anwaar Bastien](https://github.com/abastien236) (*Front End Developer*)  
* [Bryce Hammond](https://github.com/brycemhammond) (*Front End Developer*)
* [Marquel Hendricks](https://github.com/MarquelH) (*Front End Developer*)
* [Joshua Land](https://github.com/joshland96) (*Back End Developer*)
* [Favour Nerrise](https://github.com/favour-nerrise) (*Back End Developer*)
* [Reginald Padgett](https://github.com/curbsidefool) (*Back End Developer*)
* [Jordan Tyner](https://github.com/jtyner19) (*README Editor*)

## Acknowledgments

* Hackathon Sponsors
  - Google
  - Two Sigma
  - Rockwell Collins
  - Cox Automotive
