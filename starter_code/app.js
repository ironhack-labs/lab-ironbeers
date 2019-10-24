
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res) => {  

  punkAPI.getBeers()
  .then(beers => {
    let filterBeers = beers.slice(0, 6);
    // console.log(beers);
    res.render('beers', {filterBeers});
  })
  .catch(error => {
    console.log(error)
  })
});

app.get('/random-beers', (req, res) => {
  res.render('randombears');
});

app.listen(3000);
