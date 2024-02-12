const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials(`${__dirname}/views/partials`);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then((beers) => {
    console.debug(beers);
    res.render('beers', {beers: beers})
  })
  .catch((error) => nextTick(error));
})

app.get('/random-beer', (req, res, next) => {
  punkAPI.getRandom()
  .then((beer) => {
    res.render('random-beer', {beer: beer[0]});
  })
  .catch((error) => console.log(error));
})


app.listen(3000, () => console.log('🏃‍ on port 3000'));