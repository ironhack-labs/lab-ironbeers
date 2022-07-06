const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
    .then(beersFromApi => {
      const data = {
        beerArr: beersFromApi
      }
      console.log(beersFromApi[0]);
    
      res.render('beers.hbs', data)
    })
    .catch(error => console.log(error));
});


app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
  .then(randomBeer => {
    const data = {
      aBeer : randomBeer[0]
    }
    res.render('random-beer.hbs', data)
  })
  .catch(error => console.log(error));
});

app.get('/beers/beer-:id', (req, res) => {
  punkAPI.getBeer(req.params.id)
  .then(result => {
    const data = {
      aBeer : result[0]
    }
    res.render('random-beer.hbs', data)
  })
  .catch(error => console.log(error));
});


app.listen(3002, () => console.log('🏃‍ on port 3002'));
