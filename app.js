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

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index', {
    doctitle: 'Home'
  });
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', { doctitle: 'Beers', beersFromApi: beersFromApi });
    })
    .catch(error => console.log(error));
});

// app.get('/beers', async (req, res) => {
//   try {
//     const beerAPI = await punkAPI.getBeers();
//     // const renderBeer = await (beersFromApi => {
//     //   res.render('beers', { beersFromApi: beersFromApi });
//     // });
//   } catch (error) {
//     console.log(error);
//   }
// });

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(randomBeerFromApi => {
      let [{ name }] = randomBeerFromApi;
      res.render('random-beer', {
        doctitle: name,
        randomBeerFromApi: randomBeerFromApi
      });
    })
    .catch(error => console.log(error));
});

app.get('/beers/:id', (req, res) => {
  const beerId = req.params.id;

  punkAPI.getBeer(beerId).then(singleBeer => {
    let [{ name }] = singleBeer;
    res.render('beer', {
      doctitle: name,
      beerId: singleBeer
    });
  });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
