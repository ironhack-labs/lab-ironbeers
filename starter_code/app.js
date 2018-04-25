
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res, next) => {
  let data = {
  }
  res.render('index', data);
});


app.get('/beers', (req, res, next) => {
  punkAPI.getBeers(25)
  .then(beers => {   // The word "beers" here is just a placeholder for the response from the API / It could  be called anything, but the placeholder beeds to be used everywhere that needs too reference it.
    res.render('beers', {beers});
  })
  .catch(error => {
    console.log(error)
  })

});



app.get('/random-beer', (req, res, next) => {
  punkAPI.getRandom()
  .then(beer => {   // The word "beer" here is just a placeholder for the response from the API / It could  be called anything, but the placeholder beeds to be used everywhere that needs too reference it.
    res.render('randomBeer', {beer});
  })
  .catch(error => {
    console.log(error)
  })

});






app.listen(3000);