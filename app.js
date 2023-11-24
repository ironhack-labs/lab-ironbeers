const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();



app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + "/views/partials");

app.get('/', (req, res, next) => {
  res.render('home.hbs');
});

app.get('/beers', async (req, res, next) => {
  const beers = await punkAPI.getBeers()
  res.render('beers', { beers });
});

app.get('/random-beers', async (req, res, next) => {
  const [randomBeers] = await punkAPI.getRandom()
  res.render('random-beers', { randomBeers })
});





app.listen(3000, () => console.log('🏃‍ on port 3000'));
