
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

// SETTING THE VIEW ENGINE AS HSB, SO WE CAN USE .HBS FILES AND LANGUAGE

app.set('view engine', 'hbs');

// SETTING THE 'VIEWS' REDIRECT TO GO TO OUR /VIEWS FOLDER

app.set('views', __dirname + '/views');

// SETTING OUR 'PUBLIC' FOLDER TO AUTOMATICALLY JOIN WITH THE MAIN
// DIRECTORY, ELIMINATING NEED TO USE /PUBLIC/

app.use(express.static(path.join(__dirname, 'public')));


// REGISTERING OUR PARTIALS ROUTE TO /PARTIALS/

hbs.registerPartials(__dirname + '/views/partials')

// MAIN INDEX.HBS ROUTE

app.get('/', (req, res, next) => {
  res.render("index");
});


// BEERS PAGE ROUTE

app.get('/beers', (req, res, next) => {
  
  punkAPI.getBeers()
  .then(beers => {
    res.render('beers', {beers: beers});
  })

});

app.listen(3000);