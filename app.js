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
//hbs.registerPartials(__dirname + '/views/partials');
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});


app.get('/home', (req, res) => {
  res.render('home');
});

app.get('/beers', (req, res) => {
  const getBeers = punkAPI.getBeers([1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25])
  getBeers.then(beers => {
    res.render('beers', { beers });
  }).catch(error => {
    res.render('error');
  });
});

app.get('/randombeer', (req, res) => {
  punkAPI.getRandom()
    .then(randomBeer => {
      res.render('randombeer', { beer: randomBeer[0] });
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
//exercise