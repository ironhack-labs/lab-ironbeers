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
  punkAPI.getBeers()
  .then(beersFromAPI => {
    console.log('Beers from the database: ', beersFromAPI);

    const data = {
      beers: beersFromAPI
    }
    res.render('beers', data)
  })
  .catch()
})

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
  .then(responseFromAPI => {

    const data = {
      randomBeerImage: responseFromAPI[0].image_url,
      randomBeerName: responseFromAPI[0].name,
      randomBeerDescription: responseFromAPI[0].description,
      randomBeerTagline: responseFromAPI[0].tagline,
      randomBeerTips: responseFromAPI[0].brewers_tips,
      randomBeersFoodPairing: responseFromAPI[0].food_pairing

    }

    res.render('random-beer', data) 
    
    
  })
  .catch(error => console.log(error))
})

// app.get('/random-beer', (req, res) => {
//   punkAPI.getRandom()
//   .then(beersFromApi => {
//     res.render('random-beer', beersFromApi)
//     console.log(randomBeer)
//   })
//   .catch(error => console.log(error))
// })

app.listen(3000, () => console.log('🏃‍ on port 3000'));
