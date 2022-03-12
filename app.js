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

// ...

// Add the route handlers here:

app.get('/', (_req, res) => {
  res.render('index');
});

//Iteration 3.1 - route for the beers page
app.get('/beers', (_req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => res.render('beers', { beersFromApi }))
    .catch(err => console.log(err));
});

//route for the random-beer page
app.get('/random-beer', (_req, res) => {
  punkAPI
    .getRandom()
    .then(beersFromApi => {
      console.log(beersFromApi), res.render('random-beer', { beersFromApi });
    })

    .catch(err => console.log(err));
});

app.get('/beers/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);

  punkAPI
    .getBeer(id)
    .then(beerFromApi => {
      console.log(beerFromApi[0]);
      res.render('beer', { beerFromApi: beerFromApi[0] });
    })
    .catch(err => console.log(err));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
