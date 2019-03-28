
const express = require('express');
const hbs     = require('hbs');
const PORT = 3000;
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res, next) => {
  res.render('index');
});
app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render('beers', {
      title: 'Beers',
      beers
    });
    //console.log(beers)
  })
  .catch(error => {
    console.log(error)
  });
  
});
app.get('/random-beers', (req, res, next) => {
  res.render('random-beers');
});



app.listen(PORT);
