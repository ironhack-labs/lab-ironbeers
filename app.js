const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', { beersProperty: beersFromApi });
    })
    .catch(error => console.log(error));
});

app.get('/beers/beer-:id', (req, res) => {
  let beerId = req.params.id;

  punkAPI
    .getBeer(beerId)
    .then(beer => {
      res.render('beer', beer[0]);
    })

    .catch(error => console.log(`Can't reach beer's id ${beerId}`));
});

app.get('/random-beer', async (req, res) => {
  try {
    let randomBeer = await punkAPI.getRandom();

    // console.log(randomBeer[0]);
    res.render('random-beer', randomBeer[0]);
  } catch (error) {
    console.log('error occurs', error);
  }
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
