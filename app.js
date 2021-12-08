const { response } = require('express');
const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});
hbs.registerPartials(__dirname + '/views/partials');

let beerCount = 0;

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log('Beers from the database: ', beersFromApi.length);
      beerCount = beersFromApi.length;
      res.render('beers', { beers: beersFromApi });
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      if (!responseFromAPI[0].image_url)
        responseFromAPI[0].image_url = 'https://images.punkapi.com/v2/207.png';
      res.render('random.hbs', { beer: responseFromAPI[0] });
    })
    .catch(error => console.log(error));
});

app.get('/product-details/:beer', (req, res) => {
  punkAPI
    .getBeer(req.params.beer)
    .then(beerFromApi => {
      beerFromApi[0].next = beerFromApi[0].id + 1;
      beerFromApi[0].prev = beerFromApi[0].id - 1;
      if (beerFromApi[0].next === beerCount + 1) beerFromApi[0].next = 1;
      if (beerFromApi[0].prev === 0) beerFromApi[0].prev = beerCount;
      res.render('product-details.hbs', { beer: beerFromApi[0] });
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
