const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

//RUTA DEL HOME

app.get('/', (req, res) => {
  res.render('index');
});

//RUTA DE LA LISTA DE LAS CERVEZAS

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', { beersFromApi: beersFromApi });
      // console.log(beersFromApi);
    })

    .catch(error => console.log(error));
});

//RUTA DE LAS CERVEZAS RANDOM

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      res.render('random-beer', { responseFromAPI: responseFromAPI });
      // console.log(responseFromAPI);
    })
    .catch(error => console.log(error));
});

// RUTA DE "LA CERVEZA ELEGIDA"

app.get('/beer/:beer_id', (req, res) => {
  const id = req.params.beer_id;

  const theBeer = punkAPI
    .getBeer(id)
    
    .then(theBeer => {
      res.render('the-beer', { theBeer: theBeer });
      // console.log(responseFromAPI);
    })
    .catch(error => console.log(error));





  console.log(theBeer);

  ;
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
