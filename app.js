
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
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    // console.log("jjjS", beers[0]);
    // si passo directament beers, es un array d'objectes, no es un objecte en si mateix. I per tant a dins
    // de l'arxiu .hbs, hauré de tractar la seva referencia dins del contexte, i ho farem utilitzant el 'this'
    // aqui a sota el que fem es definir un objecte que te una sola propietat que es beers
    
    // const data = {
    //   beers
    // }
    // res.render('beers', data);
    
    res.render('beers', beers);
  })
  
  .catch(error => {
    console.log(error)
  })
  
  
});

app.get('/random-beers', (req, res, next) => {
  punkAPI.getRandom()
  .then(beers => {

  })
  .catch(error => {
    console.log(error)
  })
  console.log(beers);
  res.render('randomBeer',beers);
});


app.listen(3000)