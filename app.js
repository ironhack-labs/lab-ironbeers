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

hbs.registerPartials(path.join(__dirname + '/views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {

  const allBeers = await punkAPI.getBeers();

  res.render('beers', {
    aBeers: allBeers
  });

});

app.get('/random-beer', async (req, res) => {

  const random = await punkAPI.getRandom();

  res.render('random-beer', {
    rBeer: random
  });
});

app.get('/beer/:id', async (req, res) => {

  const beerId = req.params.id;
  const sBeer = await punkAPI.getBeer(beerId);

  res.render('beer', {
    beer: sBeer
  });

});

app.listen(3000, () => console.log(`It's alive on port 3000`));
