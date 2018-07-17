
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

hbs.registerPartials(__dirname+'/views/partials')//partials

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
    .then(beers=>{
      res.render('beers',{beers})//renderea la ruta + el objeto como parámetro
    })
    .catch(e=>{
      console.log(e);
    })
});

app.get('/randombeer', (req, res, next) => {
  punkAPI.getRandom()
  .then(beer=>{
    res.render('randombeer',beer[0]);//la función get random sólo va a a devolver 1 arreglo con 1 elemento
  })
  .catch(e=>{
    console.log(e);
  })
});

app.listen(3000);