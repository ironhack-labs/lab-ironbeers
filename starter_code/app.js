
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

console.log("hola")

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
  });

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(beers => {
    console.log(beers)
    res.render('beers', {beers})
  })
  .catch(error => {
    console.log(error)
  })
});


app.listen(3000);