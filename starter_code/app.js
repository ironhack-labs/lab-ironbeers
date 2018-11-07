
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res, next) => {
  res.render('index');
  // res.render('')
});
app.get('/beer', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render('beer',beers);

  })
  .catch(error => {
    console.log(error)
  })

  // res.render('')
});
app.get('/random-beers', (req, res, next) => {
  res.render('random-beers');
  // res.render('')
});
punkAPI.getBeers()
  .then(beers => {

  })
  .catch(error => {
    console.log(error)
  })


app.listen(3001);
