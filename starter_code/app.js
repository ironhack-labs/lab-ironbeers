
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
hbs.registerPartials(__dirname + "/views/partials")

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get("/beers", (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    res.locals.beerList = beers;
    res.render("beers")
  })
  .catch(error => {
    console.log(error)
  })
})

app.get("/random-beers", (req, res, next) => {
  punkAPI.getRandom()
  .then(toto => {
    console.log("I AM TOTO", toto[0])
    res.locals.randomBeer = toto[0];
    res.render("random-beers")
  })
  .catch(error => {
    console.log(error)
  })
})

app.listen(3000, function(){
  console.log("I am listening")
});

// punkAPI.getBeers()
// .then(beers => {
//   console.log(beers[0].name )
// })
// .catch(error => {
//   console.log(error)
// })