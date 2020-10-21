const { exception } = require('console');
const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  try {
   const beers = await punkAPI.getBeers();
   res.render('beers', {beers});
  } catch (err) {
   console.error('Could not retrieve beers.');
 }
});

app.get('/random-beers', async (req, res) => {
  try {
    const randomBeer = await punkAPI.getRandom();
    res.render('random-beers', {randomBeer});
   } catch (err) {
    console.error('Could not retrieve random beers.');
  }
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
