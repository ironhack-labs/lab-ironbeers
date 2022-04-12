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

hbs.registerPartials(__dirname + "/views/partials");

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {

  punkAPI.getBeers()
    .then( beerList => res.render('beers', { beerList } ) )
    .catch(error => console.log(error));

});

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
    .then( beers => res.render('randombeer', { beers } ) )
    .catch(error => console.log(error));
});

app.get('/beer', (req, res) => {
  const beerID = req.query.id;

  punkAPI.getBeer(beerID)
    .then( beers => res.render('randombeer', { beers } ) )
    .catch(error => console.log(error));
});

app.get('/beer/:id?', (req, res) => {
  const beerID = req.params.id;
  punkAPI.getBeer(beerID)
    .then( beers => res.render('randombeer', { beers } ) )
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));

