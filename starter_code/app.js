
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
  res.render('home');
});
app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
 res.render('beers', {beers});
 console.log(beers)
  })
  .catch(error => {
    console.log(error)
  })
  
});

app.get('/random-beer', (req, res, next) => {
  res.render('random-beer');
});



app.listen(3000, () => {
  console.log("port 3000")
});