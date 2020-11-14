const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  let beersFromApi = await punkAPI.getBeers();
  res.render('beers', { beerList: beersFromApi } );
});

app.get('/beers/:id', async (req, res) => {
  let beer = await punkAPI.getBeer(req.params.id);
  res.render('random-beer', { oneBeer: beer })
})

app.get('/random-beer', async (req, res) => {
  let responseFromAPI = await punkAPI.getRandom()
  res.render('random-beer', { oneBeer: responseFromAPI });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));