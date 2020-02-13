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
hbs.registerPartials(path.join(__dirname + '/views/partials'));

// add the routes here:
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log('Beers from the database: ', { beersFromApi });
      const data = {
        beers: beersFromApi
      };
      console.log(data);
      res.render('beers', data);
    })
    .catch(error => console.log(error));
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log('Beers from the database: ', { beersFromApi });
      data = {
        listOfBeers: beersFromApi
      };
      res.render('beers', data);
    })
    .catch(error => console.log(error));
});

app.get('/random-beers', (req, res) => res.render('random-beers'));

app.listen(3000, () => console.log('🏃‍ on port 3000'));
