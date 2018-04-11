
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// -----------routes-----

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  let beersArray = punkAPI.getBeers()
    beersArray.then(beers => {
      res.render('beers', beersArray)
    })
    .catch(error => {
      console.log(error)
    })
  
});

app.get('/random-beers', (req, res, next) => {
  res.render('random-beers');
});


app.listen(3000, () => console.log('listening on port 3000'))