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

hbs.registerPartials(__dirname + '/views/partials');

// Add the route handlers here:

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
       .then((beers) => {

console.log(beers);

          res.render('beers', {beers});
       })
      .catch(error => console.log(error))
});

app.get('/random-beer', (req, res, next) => {
  punkAPI.getRandom()
  .then(beer => {

    console.log(beer[0]);
    
    res.render('randomBeer', { beer: beer[0] });
  })
  .catch(error => console.log(error))
});

app.get('/', (req, res) => {
  console.log('Hello')
  res.render('index.hbs');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
