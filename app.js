const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials:
hbs.registerPartials(__dirname + '/views/partials');

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('home');
});
app.get('/beers', async (req, res) => {
  try {
    const selectBeer = await punkAPI.getBeers();
    console.log(selectBeer);
    res.render('beers', { selectBeer });
  } catch (error) {
    console.log(error);
  }
});

app.get('/randomBeer', (req, res, next) => {
  punkAPI
    .getRandom()
    .then(beer => {
      console.log(beer);
      res.render('randomBeer', { beer });
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
