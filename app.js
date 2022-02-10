const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const { getEnabledCategories } = require('trace_events');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(express.static(path.join(__dirname, 'public')));


// Routes

app.get('/', (req, res) => {
  res.render('index');
});


  app.get('/beers', (req, res, next) => {

    punkAPI
    .getBeers()
    .then(beersFromApi => {
      
      console.log('Beers from the database: ', beersFromApi); 
      res.render('beers', {beers: beersFromApi}) 
      
    })
    .catch(error => console.log(error));

  });

  app.get('/random-beer', (req, res, next) => {

    punkAPI
    .getRandom()
    .then(responseFromAPI => {

    res.render('random-beer', {randomBeer:responseFromAPI});
    console.log(responseFromAPI)
    
  })
  .catch(error => console.log(error));

  })

  // app.get('/beer-info', (req, res, next) => {

  //   punkAPI
  //   .getBeer({{id}})
  //   .then(beerId => {

  //     res.render('beer-info', {beerInfo: beerId});
  //     console.log(beerInfo)

  //   })
  //   .catch(error => console.log(error));

  // })


app.listen(3000, () => console.log('🏃‍ on port 3000'));



/* Beers from the database:  [
  {
    id: 1,
    name: 'Buzz',
    tagline: 'A Real Bitter Experience.',
    first_brewed: '09/2007',
    description: 'A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.',
    image_url: 'https://images.punkapi.com/v2/keg.png',
    abv: 4.5,
    ibu: 60,
    target_fg: 1010,
    target_og: 1044,
    ebc: 20,
    srm: 10,
    ph: 4.4,
    attenuation_level: 75,
    volume: { value: 20, unit: 'litres' },
    boil_volume: { value: 25, unit: 'litres' },
    method: { mash_temp: [Array], fermentation: [Object], twist: null },
    ingredients: {
      malt: [Array],
      hops: [Array],
      yeast: 'Wyeast 1056 - American Ale™'
    }food_pairing: [ 'Oysters', 'Hickory smoked ham', 'Rocky Road' ],
    brewers_tips: 'After primary fermentation is complete, rack off into a secondary fermeter and add the oak chips to replicate the authentic Islay barrel experience.',
    contributed_by: 'Sam Mason <samjbmason>'
  },*/