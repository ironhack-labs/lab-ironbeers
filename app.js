const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  try {
    const beers = await punkAPI.getBeers();
    console.log('beers', { beers });
    res.render('beers', { beers });
  } catch (error) {
    console.log(error);
    res.render('error');
  }
});

app.get('/randomBeer', async (req, res) => {
  // res.render('randomBeer');
  try {
    const randomBeer = await punkAPI.getRandom();
    console.log('random beer: ', randomBeer);
    res.render('randomBeer', { randomBeer });
  } catch (error) {
    console.log(error);
    res.render('error');
  }
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
