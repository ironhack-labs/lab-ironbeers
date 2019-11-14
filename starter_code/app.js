
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials')


app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', async (req, res, next) => {
  const beers = await punkAPI.getBeers()//.
  // then(beers => {
  //   console.log(beers)
  // })
  // .catch(error => {
  //   console.log(error)
  // })
  res.render('beers', {beers});
});

app.get('/random-beers', async (req, res, next) => {
  const randomBeers = await punkAPI.getRandom()
  res.render('randomBeer', randomBeers);
});

app.listen(3000);
