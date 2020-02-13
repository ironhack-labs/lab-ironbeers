const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      const data = {
        listOfBeers: beersFromApi
      };
      res.render('beers', data);
      // console.log(beersFromApi);
    })
    .catch(error => console.log(error));
});

app.get('/singleBeer/:id', (req, res) => {
  const idId = req.params.id;
  console.log(idId);
  punkAPI
    .getBeer(idId)
    .then(single => {
      console.log(single);
      res.render('singleBeer', single[0]);
    })
    .catch(error => console.log(error));
});

app.get('/random-beers', (req, res) => {
  const randomBeer = punkAPI.getRandom();
  randomBeer
    .then(beer => {
      res.render('random-beers', beer[0]);
    })
    .catch(error => console.log(error));
});

app.get('/search/:searcH', (req, res) => {
  const searc = req.query.beerId;
  console.log(req.query);
  // punkAPI
  //   .getBeer(searc)
  //   .then(single => {
  //     console.log(single[0]);
  //     res.render('singleBeer', single[0]);
  //   })
  //   .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
