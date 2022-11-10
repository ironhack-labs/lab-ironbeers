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

hbs.registerPartials(path.join(__dirname, "views/partials"))

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  let beers = punkAPI.getBeers ();
beers.then (beers => {
 let beerSliced = beers.slice(0, 25)
 console.log(beerSliced);
 res.render('beers', {beerSliced});
})
});

app.get('/randombeer',(req,res) => {
const randomBeer = punkAPI.getRandom();
randomBeer.then(randomBeer => {
  console.log(randomBeer)
  res.render('randombeer', {randomBeer})
})
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
