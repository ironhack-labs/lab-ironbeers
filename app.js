const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();
hbs.registerPartials(path.join(__dirname, 'views/partials'));
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
  punkAPI.getBeers()
  .then((getBeers) => {
    res.render('beers', { getBeers });
  })
  .catch((err) =>console.log(err));
});

app.get('/beers/:id', (req, res) => {
  punkAPI.getBeer(req.params.id)
  .then((getBeer) => {
    res.render('beers-id', { getBeer });
  })
  .catch((err) =>console.log(err));
});

app.get('/random-beer', (req, res) => {
  /* let data = {
    getRandom: true
  } */
  punkAPI.getRandom()
  .then((getRandom) => {
    /* let id = req.params.getRandom
    console.log(id); */
    res.render('random-beer', { getRandom }, /* id */);
  })
  
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
