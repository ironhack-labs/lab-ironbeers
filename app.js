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

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  // punkAPI
  //   .getBeers()
  //   .then(beersFromApi => {
  //     // res.json(beersFromApi);
  //     res.render('beers', { fetchedBeers: beersFromApi });
  //   })
  //   .catch(error => console.error(error));
  const beersFromApi = await punkAPI.getBeers();
  res.render('beers', { fetchedBeers: beersFromApi.slice(0,8) });
});

app.get('/random-beers', (req, res) => {
  res.render('randomBeers');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
