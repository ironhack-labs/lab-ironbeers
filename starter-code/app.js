const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(`${__dirname}/views/partials`);

// add the partials here:

app.use(express.static(path.join(__dirname, 'public')));

// add the routes here:

app.get('/', (req, res) => res.render('index'));

app.get('/beers', async (req, res) => {
  const beers1 = await punkAPI.getBeers();
  res.render('beers', { beers1 });
});

app.get('/randombeer', async (req, res) => {
  const beerRandom = await punkAPI.getRandom();
  res.render('randombeer', { beerRandom });
  console.log(beerRandom);
});

app.listen(3000, () => console.log('Listening'));
