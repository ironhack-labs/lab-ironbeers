const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials')

app.get('/', (req, res, ) => {
  const data = {
    title: "Home",
    cerveza: "images/beer.png",

  };
  res.render('index', data);
});
app.get('/beers', (req, res) => {
  punkAPI.getBeers()
    .then(beers => {
      console.log(beers)
      res.render('beers', {
        beers
      });
    })
    .catch(error => {
      console.log(error)
    })
  const data = {
    title: "beers",

  };

});

app.get('/random-beers', (req, res, next) => {
  punkAPI.getRandom()
    .then(beers => {
      res.render('random-beers',beers[0]); // introduccir el indice para que carge solo un valor como este es aleatorio cada vez cargara 1
    })
    .catch(error => {
      console.log(error)
    })
  const data = {
    title: "random-beers",

  };

});




app.listen(3000);