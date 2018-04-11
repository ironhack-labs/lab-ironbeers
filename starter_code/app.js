
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static(path.join(__dirname, 'public')));

// Rutas 
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {

  punkAPI.getBeers()
  .then(beers => {
    const data1 = { beers: beers }
    res.render('beers', data1);
  })
  .catch(error => {
    console.log(error)
  })

  
});

app.get('/random-beers', (req, res) => {

  punkAPI.getRandom()
  .then(beers => {
    const data2 = { beers: beers }
    res.render('random-beers', data2);
  })
  .catch(error => {
    console.log(error)
  })

});

app.listen(3000);