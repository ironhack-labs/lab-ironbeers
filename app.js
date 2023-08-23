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
app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      const beerDataArray = [];

      beersFromApi.forEach(element => {
        const dataBeer = {
          name: element.name,
          image: element.image_url,
          description: element.description,
          tagline: element.tagline
        };
        beerDataArray.push(dataBeer);
      });

      res.render('beers', { beersFromApi: beerDataArray });
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res, next) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      const data = responseFromAPI[0];

      const randomBeerData = {
        image: data.image_url,
        name: data.name,
        description: data.description,
        tagline: data.tagline,
        foodPairing: data.food_pairing,
        brewerTips: data.brewers_tips
      };
      res.render('random-beer', randomBeerData);
    })
    .catch(error => console.log(error));
});

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
