// SETUP
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

hbs.registerPartials(__dirname + "/views/partials");
app.use(express.static(path.join(__dirname, 'public')));



// ROUTES
app.get('/', (req, res, next) => {
  res.render('index');
});

// get beerList
app.get("/beers", (req, res, next)=>{
  punkAPI.getBeers()
  .then(beers => {
    res.locals.beersList = beers; // donne accès à beers.hbs
   // res.json( beers );
    res.render("beers.hbs")
  })
  .catch(err =>{
    console.log(error)
  });
});

// get beer random
app.get("/random-beers", (req, res, next)=>{
  punkAPI.getRandom()
  .then(beers => {
    res.locals.beersList = beers; 
    res.render("randomBeer.hbs")
  })
  .catch(err =>{
    console.log(error)
  });
});


app.listen(3000, ()=>{
  console.log("let's drink");
});