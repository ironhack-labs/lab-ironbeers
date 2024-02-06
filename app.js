const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, '/views/partials'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/beers', (req, res) => {
  punkAPI.getBeers().then((beers) => {
    console.log(beers);
    res.render('beers', { data: beers });
  });
});

app.get('/random_beer', (req, res) => {
  punkAPI.getRandom().then((beer) => {
    console.log(beer);
    res.render('random_beer', { data: beer });
  });
});

app.get('/', (req, res) => {
  punkAPI.getRandom().then((beer) => {
    console.log(beer);
    res.render('index', { data: beer });
  });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
