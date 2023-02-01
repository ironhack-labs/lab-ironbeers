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

// Route handlers

app.get('/', (req, res) => {
  const data = { image: 'images/beer.png' };
  res.render('index', data);
});

app.get('/beers', (req, res) => {
  const data = punkAPI.getBeers();
  console.log(data);
  // .then(beersFromApi =>
  //   console.log('Beers from the database: ', beersFromApi)
  // )
  // .catch(error => console.log(error));
  res.render('beers', data);
});

app.get('/random-beer', (req, res) => {
  res.render('random-beer');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
