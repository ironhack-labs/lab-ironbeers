
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
  res.render('partials/index');
});
app.get('/beers', (req, res, next) => {
  const beers = punkAPI.getBeers()
    .then(beers => {
      res.render('partials/beers', {beers});
    })
    .catch(err => console.error(err));
    
  
});
app.get('/random-beers', (req, res, next) => {
  res.render('partials/index');
});



app.listen(3000);