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
hbs.registerPartials(path.join(__dirname, 'views/partials'));


// Add the route handlers here:
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {

  const getBeers = punkAPI.getBeers()
  getBeers.then(beersFromApi => {
    console.log('Beers from the database: ', beersFromApi)
    res.render('beers', {randomBeer: beersFromApi})
  }).catch(error => console.log(error));
});

app.get('/beers/:id', (req, res) => {
  
  const getBeer = punkAPI.getBeer(req.params.id)
  getBeer.then(beerFromApi => {
    console.log('Beer from the database: ', beerFromApi)
    res.render('specificbeer', {specificBeer: beerFromApi[0]})
  }).catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  const getRandomBeer = punkAPI.getRandom()

  getRandomBeer.then(randomBeers => {
    res.render('random-beer', {randomBeer: randomBeers[0]});
  }).catch(error => console.log(error))

});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
