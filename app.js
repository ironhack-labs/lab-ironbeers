const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

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
  const beers = await punkAPI.getBeers();
  res.render('beers.hbs', { beers });
  });

  app.get('/beers/:id', async (req, res) => {
    let beer = await punkAPI.getBeer(req.params.id);
    let beerDetails = {beer: beer[0]}
    console.log("BeerDetails: ", beerDetails);
    res.render('beerDetails.hbs', beerDetails);
    });

app.get('/random-beer', async (req, res) => {
  const randomBeer = await punkAPI.getRandom();
  // console.log("Logging randomBeer: ", randomBeer[0]);
  randomBeer[0].randomBeerPage = true; 
  res.render('random-beer.hbs', randomBeer[0]);
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
