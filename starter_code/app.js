
const express = require('express');
const ejs     = require('ejs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);
app.set('layout', 'layout');
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public/stylesheets'));
app.use(express.static('public/images'));




app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render('beers',{beers});
  })
  .catch(error => {
    console.log(error)
  })
})

app.get('/random-beers', (req, res) => {
  punkAPI.getRandom()
  .then(beers => {
    res.render('randomBeers', {beers});
  })
  .catch(error => {
    console.log(error)
  })
})


app.listen(3000, () => {
  console.log("listening on port 3000");
});
