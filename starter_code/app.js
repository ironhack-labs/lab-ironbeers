
const express = require('express');
const app     = express();
const hbs     = require('hbs');
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

app.get('/layout', (req, res, next) => {
  res.render('layout');
});

app.get('/beers', (req, res, next) => {

  punkAPI.getBeers()
    .then(someResponse => {
      console.log("hey", someResponse);
      res.render('beers', { beers: someResponse });

    })
    
    .catch(error => {
      console.log(error);
    });

});

app.get('/random-beers', (req, res, next) => {

  punkAPI.getRandom()
    .then(beers => {

      // console.log(beers[0]);

      res.render("randomBeers", {theBeer:beers[0]});

    })
    // .catch(error => {
    //   console.log(error);
    // });

  // res.render('randomBeers');
});




app.listen(3000);