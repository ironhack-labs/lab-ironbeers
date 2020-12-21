const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// // Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (request, response) => {
  response.render('index');
});

app.get('/beers', (request, response) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => response.render('beers', { beersFromApi }))
    .catch(error => {
      console.log(error);
    });
});

app.get('/beers/:id', (req, res) => {
  const id = req.params.id;
  punkAPI
    .getBeer(id)
    .then(beerByID => {
      console.log(beerByID)
      res.render('beersDetailPage', { beerByID });
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (request, response) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      response.render('random-beer', responseFromAPI[0]);
    })
    .catch(error => {
      console.log(error);
    });
});

app.listen(3000, () => console.log('Run on port 3000'));
