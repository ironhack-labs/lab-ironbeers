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
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(beersFromAPI => {
//    console.log(beersFromAPI[0])

    const listOfBeers = {
      beers: beersFromAPI
    }
    res.render('beers', listOfBeers)
  })
  .catch((error) => {
    console.log(error);
  })
})

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
  .then(responseFromAPI => {
    console.log('random-beer', responseFromAPI)
    res.render('random-beer', responseFromAPI[0])
  })
  .catch(error => console.log(error));
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
