const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials')



// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {

  punkAPI
    .getBeers()
    .then(beersFromApi => {
      let beersList = [...beersFromApi]

      res.render('beers', {
        beers: beersList
      });
    })
    .catch(error => console.log(error));
});

app.get('/random-beers', (req, res) => {

  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      let randomBeer = responseFromAPI[0];

      res.render('random-beer', {
        beer: randomBeer
      });
    })
    .catch(error => console.log(error));
});

app.get('/beers/beer-:id', (req, res, next) => {
  
  punkAPI
    .getBeer(req.params.id)
    .then(responseFromAPI => {
      let beer = responseFromAPI[0];

      res.render('random-beer', { beer });
    })
    .catch(error => console.log(error));
})



app.listen(process.env.PORT || 3000, () => console.log('🏃‍ on port 3000'));