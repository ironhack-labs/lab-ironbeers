const express = require('express');
const hbs = require('hbs');
const path = require('path');

//npm i punkapi-javascript-wrapper
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

//Set the view engine
app.set('view engine', 'hbs');
//Set the views route
app.set('views', path.join(__dirname, 'views'));
//set route for static files
app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + "/views/partials");

// Add the route handlers here:

//route for main page
app.get('/', (req, res) => {
  res.render('index');
});

//route for beers page
app.get('/beers', (req, res) => {

  punkAPI.getBeers()
  .then(beersFromApi => res.render('beers', {beersFromApi}))
  .catch(error => console.log(error));
  
});

//route for random beer
app.get('/random-beer', (req, res) => {
  punkAPI.getRandom().then(beer => {
    console.log(beer)
    res.render('random-beer', beer[0])}).catch(error => console.log(error));
});





app.listen(3000, () => console.log('🏃‍ on port 3000'));
