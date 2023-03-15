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

app.get('/beers', (request, response, next) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      const banana = { beers: beersFromApi };
      response.render('beers', banana);
      // console.log('Beers from the database: ', beersFromApi[0]);
    })
    .catch(error => console.log(error));
});
// app.get('/random-beer', (request, response, next) => {
//   punkAPI
//     .getRandom()
//     .then(beersFromApi => {
//       const banana = { beers: beersFromApi };
//       response.render('random-beer', banana);
//       // console.log('Beers from the database: ', beersFromApi[0]);
//     })
//     .catch(error => console.log(error));
// });
app.get('/random-beer', (req, res, next) => {
  punkAPI

    .getRandom()

    .then(responseFromApi => {
      console.log(responseFromApi);

      const randomBeerArr = [...responseFromApi];

      const data = {
        beers: randomBeerArr
      };

      res.render('random-beer', data);
    })

    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
