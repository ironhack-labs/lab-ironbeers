const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// TODO Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// TODO Add the route handlers here:
//* Home
app.get('/', (req, res) => {
  res.render('index');
});

// * Beers Page
app.get('/beers', async (req, res) => {
  try {
    const beers = await punkAPI.getBeers();
    // console.log(beers);
    res.render('beers', { beers });
  } catch (err) {
    error => console.log(error);
  }
});

// * Random-Beers Page
app.get('/random-beers', async (req, res) => {
  try {
    const randomBeers = await punkAPI.getRandom();
    // console.log(randomBeers);
    res.render('random-beers', { randomBeers });
  } catch (err) {
    error => console.log(error);
  }
});

// * Beers from ID
app.get('/beer/:id', (req, res, next) => {
  console.log('single beer');
  var currentId = req.params.id;
  var numId = parseInt(currentId, 10);
  var beer;
  punkAPI
    .getBeer(numId)
    .then(res => {
      console.log(res);
      //const beer = el[0];
      beer = res[0];
    })
    .then(() => {
      res.render('beer', {
        beer
      });
    })
    .catch(err => console.log(err));
});

// Listener Port
app.listen(3000, () => console.log('🏃‍ on port 3000'));
