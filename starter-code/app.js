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

// add the partials here:

// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.get('/beer', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => res.render('beers', { database: beersFromApi }))
    .catch(error => console.log(error));
});

app.get('/random-beers', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromApi =>
      res.render('random-beers', { random: responseFromApi })
    )
    .catch(error => console.log(error));
});

app.listen(3005, () => console.log('🏃‍ on port 3005'));
