
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + "/views/partials")

//Routes
app.get('/', (req, res, next) => {
  res.render('index');
});

app.get("/beers", (request, response, next) => {
  punkAPI.getBeers()
    .then(beers => {
      response.locals.beers = beers;
      response.render("beers.hbs");
    })
    .catch(error => {
      console.log(error)
    })
})

app.get("/random-beers", (request, response, next) => {
  punkAPI.getRandom()
    .then(beer => {
      response.locals.randombeer = beer[0];
      response.render("random-beers.hbs");
    })
    .catch(error => {
      console.log(error)
    })
})


app.listen(3000);