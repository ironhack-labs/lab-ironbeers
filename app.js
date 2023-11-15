const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const app = express();
const punkAPI = new PunkAPIWrapper();

app.use(express.static('public'));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + '/views/partials');
// ...

// Add the route handlers here:
app.get('/', (req, res, next) => {
  res.render('index.hbs');
});
app.get('/beers', async (req, res, next) => {
  const beers = await punkAPI.getBeers()
  res.render('beers.hbs',{beers});
});
app.get('/random-beer', async(req, res, next) => {
  const [randomBeer] = await punkAPI.getRandom()
  res.render('random-beer.hbs', {randomBeer});
});

app.get('/beers/:beerId', async(req, res, next) => {
  const {beerId} = req.params
  const [selectedBeer] = await punkAPI.getBeer(beerId)
  res.render('selectedbeer.hbs', {selectedBeer});
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
