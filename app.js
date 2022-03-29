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
hbs.registerPartials(path.join(__dirname, '/views/partials'));
// 

// Add the route handlers here:
//index
app.get('/', (req, res) => {
  res.render('index');
});

//beErs
app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log(beersFromApi);
      res.render('beers', {
        beersFromApi
      });
    })
    .catch(error => console.log(error));
});

//random beer
app.get('/random-beer', (req, res, next) => {
  let newBeer = {}
  punkAPI
  .getRandom()
    .then(beersFromApi => {
      console.log(beersFromApi)
      newBeer = {
        name: beersFromApi[0].name,
        tagline: beersFromApi[0].tagline,
        description: beersFromApi[0].description,
        image_url: beersFromApi[0].image_url,
        foodPairing: beersFromApi[0].food_pairing,
        brewersTips: beersFromApi[0].brewers_tips
      }
      res.render('random-beer', {
        newBeer: [newBeer]
      });
    })
    .catch(error => console.log(error));
});

app.get('/beers/:beerId', (req, res, next) => {
  punkAPI
  .getBeer(req.params.beerId)
  .then(oneBeer =>{
    console.log(oneBeer)
    res.render('beer-details', {
      oneBeer
    });
  })
  .catch(error => console.log(error));
})



app.listen(3000, () => console.log('🏃‍ on port 3000'));