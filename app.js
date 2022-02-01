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
hbs.registerPartials(`${__dirname}/views/partials/`)
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => res.render('beers', { theBeers: beersFromApi }))
    .catch(error => console.log(error))
})

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      res.render('randomBeer', { theBeers: responseFromAPI })
    })
    .catch(error => console.log(error))
})

// app.get('/beerDetails', (req, res) => {
//   console.dir(req.params.id)
//   res.render('beer-details', { theBeers: responseFromAPI })
//   res.send('funciona')
// })


// app.param('beers', function (req, res, id) {
//   // try to get the user details from the User model and attach it to the request object
//   Beers.find(id, function (beer) {
//     if (beer) {
//       req.beer = beer
//       next()
//     } else {
//       next(new Error('failed to load beer'))
//     }
//   })
// })

app.listen(3000, () => console.log('🏃‍ on port 3000'));
