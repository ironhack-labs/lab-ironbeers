//Set up
//-------------------------------------------------------
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

//app.use(express.static(__dirname + "/public"));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials')

//Route
//-------------------------------------------------------------
app.get('/', (req, res, next) => {
  res.render('index');
});

app.get("/beers", (request, response, next) => {
  punkAPI.getBeers()
  .then(beers => {
    // console.log(beers);
    response.locals.beersList = beers;
    response.render("beers.hbs");
  })
  .catch(error => {
    console.log(error)
  })
  
});

app.get("/random-beer", (request, response, next) => {
  punkAPI.getRandom()
  .then(beers => {
    console.log(beers)
    response.locals.randomBeer = beers[0];
    //response.json( beers ); // Renvoie l'information de votre variable au format JSON dans le navigateur
    response.render("randomBeer.hbs");
  })
  .catch(error => {
    console.log(error)
  })
  
});


app.listen(3000, () => {
  console.log("We are ready");
});