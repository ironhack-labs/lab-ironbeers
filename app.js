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

app.set('view engine', 'hbs')
app.set('views', path.join(_dirname, 'views'))
hbs.registerPartials(path.join(_dirname, 'views/partials'));

app.use(express.static(path.join(_dirname, 'public')))

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/home', (req, res) => {
  res.render('index')
})

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(beersFromApi => {
    res.render('beers.hbs', {'beerArray': beersFromApi})
  })
  .catch(error => console.log(error))
})

app.get('/random-beers', (req, res) => {
  punkAPI.getRandom()
  .then(randomBeer => {
    console.log(randomBeer[0])
    res.render('random-beers.hbs', {'singleBeer': randomBeer[0]})
  })
  .catch(error => console.log(error))
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
