const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));
// add the routes here:
app.get('/', (req, res) => res.render('index'));
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', { beers: beersFromApi });
    })
    .catch(error => console.log(error));
});
app.get('/random-beers', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      const randomBeer = responseFromAPI[0];
      res.render('random-beers', randomBeer);
    })
    .catch(error => console.log(error));
});
app.get('/beers/beer', (req, res) => {
  const { id } = req.query;
  punkAPI.getBeer(id).then(beersFromApi => {
    res.render('beers', { id: id, beers: beersFromApi });
  });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
