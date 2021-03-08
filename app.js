const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();
const randomBeer = punkAPI.getRandom();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  // console.log(punkApi.getBeers())
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(dataBack => {
      console.log('databack:', dataBack);
      res.render('beers', { beers: dataBack });
    })
    .catch(err => {
      console.log(err);
    });
});
app.get('/random-beers', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      // console.log('responseFromAPI:', responseFromAPI);

      res.render('random-beers', { randomBeers: responseFromAPI });
    })
    .catch(error => console.log(error));
});
app.listen(3000, () => console.log('🏃‍ on port 3000'));
