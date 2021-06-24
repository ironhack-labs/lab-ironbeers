const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  const beers = punkAPI.getBeers()
    .then(beers => {
      res.render('beers', { beerList: beers});
      console.log(beerList);
    })
    .catch(error => console.log(error));
  //console.log(beers);
});

app.get('/random-beer', (req, res) => {
  const random = punkAPI.getRandom()
    .then(random => {
    res.render('random-beer', {randomBeer: random});
    })
    .catch(error => console.log(error));
  
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
