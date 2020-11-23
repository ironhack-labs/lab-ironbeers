const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

//hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res) => {
  const beers =  punkAPI.getBeers();
  beers.then(beersFromApi => res.render('beers', {beersFromApi}));
  beers.catch(error => console.log(error));
})
app.get('/random-beers', (req, res) => {
  const randomBeers = punkAPI.getRandom();
  randomBeers.then(random => {
    res.render('random-beers', {data : random} )
  })
  randomBeers.catch(error => console.log(error));
})

// ...

// Add the route handlers here:




app.listen(3000, () => console.log('🏃‍ on port 3000'));
