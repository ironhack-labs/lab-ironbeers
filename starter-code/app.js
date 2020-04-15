const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

const punkAPI = new PunkAPIWrapper();

// add the partials here:
hbs.registerPartials(`${__dirname}/views/partials`);
// add the routes here:

//home
app.get('/', (req, res) => res.render('index'));
// Beers
app.get('/beers', async (req, res) => {
   const beers = await punkAPI.getBeers();
   beers.pop()
  res.render('beers', { beers});
});
// Random beers
app.get('/randombeers', async (req, res) => {
  const beers = await punkAPI.getBeers();
  beer = beers[Math.floor(Math.random() * beers.length)];
  res.render('randombeers',  beer );
  console.log(beer);
});
// initialize server
app.listen(3000, () => console.log('🏃‍ on http://localhost:3000'));
