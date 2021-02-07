const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      // console.log('Beers from the database: ', beersFromApi);
      res.render('beers', { beersFromApi });
    })
    .catch(error => console.log(error));
});

app.get('/beers/:id', (req, res) => {
  punkAPI
    .getBeer(req.params.id)
    .then(beer => {
      res.send(beer);
    })
    .catch(err => console.log('', err));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      console.log('random beer', responseFromAPI[0]);
      res.render('random-beer', responseFromAPI[0]);
    })
    .catch(error => console.log(error));
});

app.listen(3001, () => console.log('🏃‍ on port 3001'));
