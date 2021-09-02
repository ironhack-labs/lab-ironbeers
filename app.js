const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

//  --- Como lo hizo Jan con '+' en vez de 'path', aunque él mismo explicó 
//      que es mejor usar 'path', porque tiene en cuenta las diferencias
//      de comportamiento de rutas en distintos OS: ---
//
// hbs.registerPartials(__dirname + '/views/partials'); 



// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index')
});

app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  //.then(responseFromAPI => console.log('Beers from the database: ', responseFromAPI[0]))
  .then(responseFromAPI => res.render('beers', {beersList: responseFromAPI}))
  //.then(responseFromAPI => res.render('beers', {responseFromAPI}))
  .catch(error => console.log(error));
});



app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(responseFromAPI => res.render('random-beer', {randomBeer: responseFromAPI}))
  //.then(responseFromAPI => res.render('random-beer', {responseFromAPI}))
  //.then(responseFromAPI => console.log(responseFromAPI[0]))
  .catch(error => console.log(error));
});

// --- SEND ---
// app.get('/beers-json', (req, res) => {
//   punkAPI
//   .getBeers()
//   .then(responseFromAPI => res.send(responseFromAPI))
//   .catch(error => console.log(error));
// });

app.listen(3000, () => console.log('Listening on port 3000'));




