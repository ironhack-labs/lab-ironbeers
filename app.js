// Instanciamos express -------------------------------------------------------------
const { response } = require('express');
const express = require('express');
const app = express();


const hbs = require('hbs'); 
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

//Create static server for files, like css, imgs, and js
app.use(express.static(path.join(__dirname, 'public')));

// Configure handlebars
app.set('view engine', 'hbs');
// Add the route handlers here:
app.set('views', path.join(__dirname, 'views'));

// Register the location for handlebars partials here:

//hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// ENDPOINTS

app.get('/', (req, res) => {
  res.render('index');
});

// ITERATION 3.1--------------------------------------------------------------------

app.get('/beers', (req, res) => {
  //Controlador: ejecuto la logica de mi endpoint
 punkAPI.getBeers()
  .then(beersFromApi => {
/*     console.log('Beers from the database: ', beersFromApi)
 */    res.render('beers', {beers: beersFromApi})
  }) 
  .catch(error => console.log(error));

});

// ITERATION 4.1-------------------------------------------------------------------

app.get('/randombeer', (req, res) => {
  //Controlador: ejecuto la logica de mi endpoint

  // your magic happens here
  punkAPI.getRandom()
    .then(responseFromAPI => {
      /* console.log('Beers from the database: ', responseFromAPI) */
      res.render('randombeer', {randomBeer: responseFromAPI})
    }) 
    .catch(error => console.log(error));
});

// BEER`S ID--------------------------------------------------------------------------

app.get('/beers/beer-:id', (req, res) => {
  punkAPI.getBeer(req.params.id)
    .then(beer => {
      res.render('beerDetail', {beer: beer});
    })
    .catch(error => console.log(error));
});


// ADD PORT ------------------------------------------------------------------------------

app.listen(3000, () => console.log('🏃‍ on port 3000'));