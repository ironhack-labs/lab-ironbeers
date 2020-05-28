
console.log("its working...")

const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


// app.use(ourMiddleWare);
app.use(express.static("lab-ironbeers/public/images"))
// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', function (req, res){
  res.render(__dirname + "/views/index.hbs");
});


app.get('/beers', function (req, res){
  res.render(__dirname + '/views/beers.hbs');
});


app.get('/randombeers', function (req, res){
  res.render(__dirname + '/views/randombeers.hbs');
});

app.listen(3000, () => console.log('🏃‍ on http://localhost:3000'));
