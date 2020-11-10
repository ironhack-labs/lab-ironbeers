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
 
// Add the route handlers here:

app.get('/', (req, res) => res.render('index'))

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(beersFromApi => {
    const beers = beersFromApi;
    res.render('beers', {beers});
    console.log('Beers from the database: ', beersFromApi)})
  .catch(error => console.log(error));
})

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
    .then(responseFromAPI => {
      const randomBeer = responseFromAPI;
      res.render('random-beer', { randomBeer });
    })
    .catch(error => console.log(error));
})

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
