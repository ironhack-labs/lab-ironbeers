const express = require('express');

const hbs = require('hbs');
const path = require('path');
hbs.registerPartials(path.join(__dirname, 'views/partials'));
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:


// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', { listOfBeers: beersFromApi });
    })
    .catch(error => console.log(error));
});


app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(randomBeerApi => {
    res.render('random-beer', { randomBeer: randomBeerApi });
  })
  .catch(error => console.log(error));
});

app.get('/beers/:id', (req, res) => {
  punkAPI
    .getBeer()
    .then(detailBeer => {
      console.log(detailBeer)
      res.render('beerdetails', { beer: detailBeer });
    })
    .catch(error => console.log(error));
})
// app.get('/random-beer', (req, res) => {
//   punkAPI
//     .getRandom()
//     .then(responseFromAPI => {
//       console.log(responseFromAPI)
//       res.render('random-beer', { beer: responseFromAPI[0] })
//     })
//     .catch(error => console.log(error));
// })

app.listen(3000, () => console.log('🏃‍ on port 3000'));
