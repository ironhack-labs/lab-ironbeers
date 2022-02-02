const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();
const async = require("hbs/lib/async")

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {

  const allBeers = await punkAPI.getBeers()
  // console.log(allBeers)

  res.render('beers', {
    allBeers: allBeers
  });
});

app.get('/random-beer', async (req, res) => {
  const randomBeer = await punkAPI.getRandom()
  // console.log(randomBeer)
  res.render('random-beer', {
    randomBeer: randomBeer
  });
});

app.get('/beers/:id', async (req, res) => {
  const beerID = req.params.id;
  const selectedBeer = await punkAPI.getBeer(beerID);

  res.render('beers', {
    allBeers: selectedBeer
  });
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
