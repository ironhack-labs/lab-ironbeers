
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));


hbs.registerPartials(__dirname + '/partials')



app.get('/', (req, res, next) => {
  let title = "IronBeers"
  res.render("index",{
    title
  });
});

app.get('/beers', (req, res, next) => {
  let title = "Beers";
  punkAPI.getBeers()
  .then(beers => {
    res.render("beers",{
      title,
      beers
    });
  })
  .catch(error => {
    console.log(error)
  })
});



app.get('/randombeer', (req, res, next) => {
  let title = "Random Beer"
  punkAPI.getRandom()
  .then(beers => {
    let beer = beers[0];
    res.render("randombeer",{
      beer,
      title
    });
  })
  .catch(error => {
    console.log(error)
  })
});





app.listen(3000);
