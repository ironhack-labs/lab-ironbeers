
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();


app.use(express.static(path.join(__dirname, 'public')));

app.set("views", __dirname + "/views");
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");



app.get('/', (req, res, next) => {
  res.render('index');
});


app.get('/random-beer', (req, res, next) => {
  punkAPI.getRandom()
  .then(randomBeerArr => {
    let randomBeer = randomBeerArr[0]
    res.render('random-beer', {randomBeer})
    console.log({randomBeer})
  })
  .catch(error =>{
    console.log(error)
  })
});


app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render('beers', {beers});
    console.log(beers)
  })
  .catch(error => {
    console.log(error)
  })
});


app.listen(3000, ()=>{
  console.log("Listen on port 3000")
});
