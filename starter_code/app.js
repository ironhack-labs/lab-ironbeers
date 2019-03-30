
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
//const beers = require(getBeers());
const PORT = 3000;
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    console.log(beers)
    res.render('beers', { beers })
  })
  .catch(error => {
    console.log(error)
  })
});

app.get('/randomBeer', (req, res, next) => {
  punkAPI.getRandom()
  .then(beers => {
    res.render('beers', {beers})
  })
  .catch(error => {
    console.log(error)
  })
})


app.listen(PORT, () => console.info(`Application listen at port ${PORT}`));