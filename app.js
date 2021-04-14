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

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      const displayBeers = { beers: beersFromApi };
      res.render('beers', displayBeers);

      // res.render('beers', { beers: beersFromApi }); without the const displayBeers

      console.log('Beers from the database: ', beersFromApi);
    })
    .catch(error => console.log(error));

  //res.render('beers', { beersFromApi });
});

// app.get('/beers', (req, res) => {
//   .getBeers()
//     .then(beersFromApi =>
//       console.log('Beers from the database: ', beersFromApi)
//     )
//     .catch(error => console.log(error));
// });

app.get('/randomBeer', (req, res, next) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      res.render('randomBeer', { beers: responseFromAPI });
      console.log('Random beer from the database: ', responseFromAPI);
    })

    .catch(error => console.log(error));
  //res.render('randomBeer');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
