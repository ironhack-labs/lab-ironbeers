
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs'); // HBS will be in charge of rendering the HTML:
app.set('views', __dirname + '/views'); // creates an absolute path pointing to a folder called "views"
hbs.registerPartials(__dirname + '/views/partials'); // partials


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    //console.log(beers)
    res.render('beers', {list: beers});
  })
  .catch(error => {
    console.log(error)
  })

  
});

app.get('/random', (req, res, next) => {
  punkAPI.getRandom()
  .then(beers => {
    res.render('random', {list:beers});
  })
  .catch(error => {
    console.log(error)
  })
});



app.listen(3000);

