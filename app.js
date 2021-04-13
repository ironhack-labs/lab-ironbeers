// IMPORT

const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

// MIDDLEWARE

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars PARTIALS here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// App routes

app.get('/', (req, res) => {  
  res.render('index');
});


// app.get('/beers', (req, res) => {
//   punkAPI
//   .getBeers()
//   .then(beersFromApi => res.render('beers', { beersFromApi }))
//   .catch(error => console.log(error));
// });

app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then(beersFromApi => {
  res.render('beers', {beers: beersFromApi}); //Name of the destiny, ()
  // console.log(beersFromApi);
  })
  .catch(error => console.log(error));
});


app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then((beersFromApi) => {
  res.render('random-beer', {beers: beersFromApi}); //Name of the destiny, ()
  // res.render('random-beer', beersFromApi[0])  extración de objeto individual  modifica "each"
  // console.log(beersFromApi);
  })
  .catch(error => console.log(error));
});
// Server started
app.listen(3000, () => console.log('🏃‍ on port 3000'));
