const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(express.static(path.join(__dirname, 'public')));


app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log('Beers from the database:', beersFromApi);
      res.render('beers', {theBeers: beersFromApi});
    })
    .catch(error => console.log(error));
});

// add the partials here:
app.get('/random-beer', (req, res) => {
    punkAPI
      .getRandom()
      .then(responseFromAPI => {
        res.render('random-beer', {randomBeer: responseFromAPI });
      })
      .catch(error => console.log(error));
})

// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.listen(3000, () => console.log('🏃‍ on port 3000'));
