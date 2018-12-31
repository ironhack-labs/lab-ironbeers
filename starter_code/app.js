
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render('beers', { beers });
    console.log(beers)
  })
  .catch(error => {
    console.log(error)
  })
});


app.get('/random-beers', (req, res, next) => {
  punkAPI.getRandom()
  .then(beers => {
    res.render("randomBeer", { beers: beers[0] });
    console.log(beers)
  })
  .catch(error => {
    console.log(error)
  })
});

app.get('/beerDetails/:id', (req, res, next) => {
  const term  = 20
  punkAPI.getBeer(term)
  .then(beers => {
    console.log("entra")
    res.render('beerDetails', { beers: beers });
    console.log(beers)
  })
  .catch(error => {
    console.log(error)
  })
});
  
app.listen(PORT, () => {
  console.info(`App listen at ${PORT} port`);
});