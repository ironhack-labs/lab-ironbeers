const express = require("express");
const hbs = require("hbs");

const app = express();

app.use (express.static(__dirname + "/public"));

app.set("views", __dirname + "/views");
//what is "view engine" ?
app.set("view engine", "hbs");

app.set("layout",__dirname + "/views/layout.hbs");

//what is partials?
hbs.registerPartials(__dirname + "/views/partials");

app.listen(3000);

///

const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.set("layout",__dirname + "/views/layout.hbs");

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res, next) =>
  res.render("index")
)

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    res.locals.beersList = beers;
    res.render('beers');
  })
  .catch(error => {
    console.log(error)
  })
});

app.get('/random-beers', (req, res, next) => {
  punkAPI.getRandom()
  .then(beer => {
    console.log(beer);
    res.locals.randomBeer = beer[0];
    res.locals.foodPairing = beer[0].food_pairing;
    res.render('random-beers');
  })
  .catch(error => {
    console.log(error)
  })
});

