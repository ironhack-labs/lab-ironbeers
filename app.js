const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(__dirname + '/public'));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
    .then(beersFromApi => {
      console.log('Beers from database:', beersFromApi);
      res.render('beers', { beersFromApi });
    })
    .catch(error => console.log(error));

});

app.get('/random-beer', (req, res, next) => {
  punkAPI.getRandom()
    .then(randomBeerAPI => {
      console.log('Random beer:', randomBeerAPI);
      res.render('random-beer', { randomBeerAPI });
    })
    .catch(error => console.log(error));
});

app.get('/beer/:id', (req, res, next) => {
  punkAPI
    .getBeer(req.params.id)
    .then(beersFromApi => {
      console.log(beersFromApi);
      res.render('beers', { beersFromApi });
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
