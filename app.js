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

hbs.registerPartials(path.join(__dirname, '/views/partials'));

// Add the route handlers here:

app.all('/', (req, res) => {
  res.render('index');
});
 

app.all('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(allBeers => res.render('beers', {allBeers}))
  .catch(error => console.log(error))
});



app.all('/random-beer', (req, res) => {
  punkAPI.getRandom()
  .then(randomBeer => res.render('random-beer', randomBeer[0]))
  .catch(error => console.log(error))
});

app.all('/beers/:id', (req, res) => {
  punkAPI.getBeer(req.params.id)
  .then(oneBeer => res.render('one-beer', oneBeer[0]))
  .catch(error => console.log(error))
});



app.listen(4000, () => console.log('🏃‍ on port 4000'));
