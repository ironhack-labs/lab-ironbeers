const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Register the location for handlebars partials here:
app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(beersFromApi => {
    console.log(beersFromApi);
    res.render('beers',{beersFromApi: beersFromApi});
  })
  .catch(error => console.log(error));
 
});

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
  .then(beersFromApi => {
    res.render('random-beer',{beersFromApi: beersFromApi[0]});
  })
  .catch(error => console.log(error));
});

app.get('/beerpartial', (req, res) => {
  punkAPI.getBeers()
  .then(beersFromApi => {
    console.log(beersFromApi);
    res.render('/views/partials/beerpartial',{beersFromApi: beersFromApi});
  })
  .catch(error => console.log(error));
 
});


app.get('/', (req, res) => {
  let info ={
    img: "/images/beer.png",
    beer: "/beers",
    randomBeer: "random-beer"
  }
  res.render('index', info);
});

app.listen(8000, () => console.log('🏃‍ on port 8000'));
