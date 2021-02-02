const express = require('express');
const app = express();
const hbs = require('hbs');

const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  const getBeers = punkAPI.getBeers({"abv_gt":7})
  
  getBeers.then(arrBeers => {
    res.render('beers', {allBeers : arrBeers});
  })
});

app.get('/random-beers', (req, res) => {
  const getRandom = punkAPI.getRandom()

  getRandom.then(beer => {
    console.log(beer)
    res.render('random-beers', {beer: beer});
  })
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
