const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partial')
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res, next) => {
  res.render("index");
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
    .then(beers => {
      res.render('beers', {
        beers
      });
    })
    .catch(error => {
      console.log(error)
    });
});

app.get('/random-beers', (req, res, next) => {
  res.render("random");
});

app.listen(3000, () => {
  console.log("escuchando en el puerto 3000")
});