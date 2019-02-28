
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/partial');


app.get('/', (req, res, next) => {
  res.render('index');
});
app.get('/beers', (req, res, next) => {
 punkAPI.getBeers()
  .then(beers => {
    console.log(beers)
    res.render('beer', {beers});
  })
  .catch(error => {
    console.log(error)
  })
  
});

app.get('/randome', (req, res, next) => {
  punkAPI.getRandom()
  .then(randomeBeers => {
    console.log(randomeBeers)
    res.render('randome', {randomeBeers});
  })
  .catch(error => {
    console.log(error)
  })
  
});



app.listen(3000,()=> console.log("App escuchando en puerto " ))
