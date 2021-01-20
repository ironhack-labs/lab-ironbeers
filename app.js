const express = require('express');
const app = express();

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

//Create static server for files, like css, imgs, and js
app.use(express.static(path.join(__dirname, 'public')));

// Configure handlebars
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + '/views/partials');

const punkAPI = new PunkAPIWrapper();

// ENDPOINTS

// Add the route handlers here:
app.get('/', (req, res) => {
  res.render('index');
});

// ITERATION 3.1--------------------------------------------------------------------

app.get('/beers', (req, res) => {
 punkAPI.getBeers()
  .then(beersFromApi => {
/*     console.log('Beers from the database: ', beersFromApi)
 */    res.render('beers.hbs', {beers: beersFromApi})
  }) 
  .catch(error => console.log(error));

});

// ITERATION 4.1-------------------------------------------------------------------

app.get('/randombeer', (req, res) => {
  // your magic happens here
  punkAPI.getRandom()
    .then(responseFromAPI => {
      /* console.log('Beers from the database: ', responseFromAPI) */
      res.render('randombeer', {randomBeer: responseFromAPI})
    }) 
    .catch(error => console.log(error));
  
}),

app.listen(3000, () => console.log('🏃‍ on port 3000'));
