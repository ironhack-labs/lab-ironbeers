
const express = require('express');
const app     = express();
const path    = require('path');
const expressLayouts = require('express-ejs-layouts');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
const ejs = require('ejs');

app.use(expressLayouts);
app.set('layout', 'layouts/layout');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));
// ejs.registerPartials(__dirname + '/views/partials')


app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render('beers',{beers});
  })
  .catch(error => {
    console.log(error)
  })
});




app.listen(3000);
