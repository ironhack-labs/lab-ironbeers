
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials');


app.get('/', (req, res, next) => {
  res.render('index');
});


// Route beer
app.get('/beer', (req, res, next) => {
  const beers = punkAPI.getBeers()
  .then(beers => {
    res.render('beer', {beers});
  })
  .catch(error => {
    console.log(error)
  })

  
});

//Route randombeer
app.get('/random-beer', (req, res, next) => {
  const randombeer= punkAPI.randomBeer()
  .then(beers => {
    res.render('random-beer', randombeer);
  })
  .catch(error => {
    console.log(error)
  })
  
});

// Server Started
app.listen(3000, () => {
  console.log('Listening on port 3000!');
});