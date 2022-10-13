const { log } = require('console');
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

hbs.registerPartials(__dirname + "/views/partials");


// Add the route handlers here:


// Main page
app.get('/', (req, res) => {
  // let p = punkAPI.getBeer(1);
  // p.then(beer => { console.log(beer[0].name) })
  //   .catch(error => { console.log(error) });
  res.render('index');
});

// Beers page
app.get('/beers', (req, res) => {
  const beerList = punkAPI.getBeers();
  const bs = [];
  beerList.then(beers => {
    beers.forEach(beer => {
      bs.push(beer);
    });
  }).then(() => {
    res.render('beers', { bs });
  });
});

// Random beer page
app.get('/random-beer', (req, res) => {
  // const randomBeer = punkAPI.getRandom();
  punkAPI.getRandom()
    .then(beer => {
      res.render('random-beer', beer[0]);
      // console.log({ beer: beer[0] });
    })
    .catch(error => { console.log(error) });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
