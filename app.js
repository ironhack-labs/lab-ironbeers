const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
// ...
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:
// home page route
app.get('/', (req, res) => {
  res.render('hbs-files/index');
});

// beers page route
app.get('/beers', (req, res) => {
  // image, name, description and tagline.
  let beersList = [];
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      for ({ id, name, tagline, description, image_url } of beersFromApi) {
        let randStr = Math.random().toString(36).slice(2).concat;
        // `${id}`.app
        // console.log(randStr);
        beersList.push({ randStr, name, tagline, description, image_url });
      }
      res.render('hbs-files/beers.hbs', beersList);
    })
    .catch(error => console.log(error));
});

// beers page route
app.get('/random-beers', (req, res) => {
  let randomBeerInfo = [];
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      let randomBeerInfo = [];
      // console.log(responseFromAPI);
      let randStr = Math.random().toString(36).slice(2);

      for ({
        randStr,
        name,
        tagline,
        description,
        image_url,
        brewers_tips,
        food_pairing
      } of responseFromAPI) {
        randomBeerInfo.push({
          randStr,
          name,
          tagline,
          description,
          image_url,
          brewers_tips,
          food_pairing
        });
      }

      console.log(randomBeerInfo[0]);
      // let randomBeerInfo = responseFromAPI[0];

      res.render('hbs-files/random-beers.hbs', randomBeerInfo[0]);
    })
    .catch(error => console.log(error));
});

// uid
app.get('/beers/:id', function (req, res, next) {
  console.log(' beer clicked ');
  // res.end(req.params.id);
  console.log(req.params.id);

  punkAPI
    .getBeer(req.params.id)
    .then(responseFromAPI => {
      let randomBeerInfo = [];

      console.log(randomBeerInfo[0]);
      res.render('hbs-files/random-beers.hbs', randomBeerInfo[0]);
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
