
const express = require('express');
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app     = express();
const punkAPI = new PunkAPIWrapper();

//set the view engine to be HBS with views in the /views folder
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname + '/views'));

//everything inside public is accessible
app.use(express.static(path.join(__dirname, 'public')));

//what should be shown when main page is opened
app.get('/', (req, res, next) => {
  res.render('index');
});

//create the route for beers page
app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render('beers', {beers});
  })
  .catch(error => {
    console.log(error)
  });
});

app.get('/random-beer', (req, res, next) => {
  punkAPI.getRandom()
  .then(beers => {
    res.render('random-beer', {
      beer: beers[0]
    });
  })
  .catch(error => {
    console.log(error)
  })
  
});

app.listen(3000);
