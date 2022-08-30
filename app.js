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

hbs.registerPartials(__dirname + '/views/partials');


app.get('/', (req, res) => {
  res.render('index.hbs');
});

app.get('/beers', (req, res) => {

  const beers = punkAPI.getBeers()
  const arrBeer = []

  beers.then(beerList => {
    beerList.forEach(beer => {
      arrBeer.push(beer)
    })
  })
    .then(() => {
      res.render('beers.hbs', { arrBeer })
    })

})


app.get('/random-beer', (req, res) => {

  const randomBeer = punkAPI.getRandom()
  let newRandomBeer = ""

  randomBeer.then(beer => {
    newRandomBeer = beer
    console.log(newRandomBeer)
  })

    .then(() => {
      res.render('random-beer', { newRandomBeer })
    })
})


app.listen(3000, () => console.log('🏃‍ on port 3000'));
