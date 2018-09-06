
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {

  punkAPI.getBeers()
  .then(beers => {

    console.log(beers)
    res.render('beers', {beers:beers});

  })
  .catch(error => {
    console.log(error)
  })

});

app.get('/randomBeers', (req, res, next) => {


  punkAPI.getRandom()
  .then(beers => {

    let beer  = { title: beers[0].name,
      tagline: beers[0].tagline,
      url: beers[0].image_url,
      description: beers[0].description,
      food: beers[0].food_pairing,
      tips: beers[0].brewers_tips
     };

    console.log(beer);
    res.render('randomBeers', {beer:beer});

  })
  .catch(error => {
    console.log(error)
  })


});


app.listen(3000);