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

hbs.registerPartials(__dirname + '/views/partials');
app.set('views', __dirname + '/views');
// add the routes here:
app.get('/', (req, res) => res.render('index'));
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then((respFromApi) => {
      res.render('beers', { beers: respFromApi });
    })
    .catch((error) => console.log(error));
});
app.get('/random-beers', (req, res) => {
  punkAPI
    .getRandom()
    .then((responseFromAPI) => {
      res.render('random-beers', { randomBeer: responseFromAPI });
    })
    .catch((error) => console.log(error));
});
app.get('/:id', (req, res) => {
  punkAPI
    .getBeer(req.params.id)
    .then((responseFromAPI) => {
      res.render('random-beers', { randomBeer: responseFromAPI });
    })
    .catch((error) => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
