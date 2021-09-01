const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  const beers = await punkAPI.getBeers();
  // console.log(beers)
  res.render('beers', {
    beers: beers
  });
});

app.get('/beer/:id', async (req, res) => {
  const beer = await punkAPI.getBeer(req.params.id);
  console.log(beer)
  res.render('beer', {
    beer: beer[0]
  });
});

app.get('/random-beer', async (req, res) => {
  let beer
  try {
    beer = await punkAPI.getRandom();
  } catch (error) {
    console.log(error)
  }
  res.render('random-beer', {
    beer: beer[0]
  });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));