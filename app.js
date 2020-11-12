// APPLICATION

// Import packages/models
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

// Create server
const app = express();

// Create punkAPI?
const punkAPI = new PunkAPIWrapper();

// Tell application that we are working with hbs & point map views to it
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Tell application static content as style.css
app.use(express.static(path.join(__dirname, 'public')));


// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:


// HOME
app.get('/', (req, res) => {
  res.render('index');
});

// BEERS PAGE
app.get('/beers', (req, res) => {
  //get data from api and render this info in beers.hbs
  punkAPI.getBeers().then(beersFromApi => {
    res.render('beers', {beersFromApi: beersFromApi})
    console.log('Beers from the database: ', beersFromApi)
  }).catch(error => console.log(error));
});

// BEERS PAGE
app.get('/random-beer', (req, res) => {
  //get data from api and render this info in beers.hbs
  punkAPI.getRandom().then(randomBeer => {
    res.render('random-beer', {randomBeer: randomBeer[0]})
    console.log('Random beer chosen: ', randomBeer)
  }).catch(error => console.log(error));
});

// beers page
app.get('/beers-/:id', (req,res) => {
})


// listen to portal 3000
app.listen(3000, () => console.log('🏃‍ on port 3000'));
