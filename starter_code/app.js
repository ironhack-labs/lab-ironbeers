
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/Beers', (req, res, next) => {
  punkAPI
  .getBeers()
  .then(beers => {
    res.render('Beers', {beers} );

  })
  .catch(error => {
    console.log(error);
  });

  
});

app.get('/Random-Beer', (req, res, next) => {
  punkAPI
  .getRandom()
  .then(beers => {
    res.render('Random-Beer', {beers});
  })
  .catch(error => {
    console.log(error);
  });
  
  
});


app.listen(3000);

