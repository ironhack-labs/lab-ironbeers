const express = require('express');
const hbs = require('hbs');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
//const path = require('path');


const app = express();
const punkAPI = new PunkAPIWrapper();

//Middleware for the view engine

app.set('view engine', 'hbs');
app.set("views", __dirname + "/views")
app.use(express.static('public'));

//app.set('views', path.join(__dirname, 'views'));
//app.use(express.static(path.join(__dirname, 'public')));


// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/beers', (req, res) => {
  res.render('beers');
});
app.get('/random-beer', (req, res) => {
  res.render('random-beer');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
