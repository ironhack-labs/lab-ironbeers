
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials')

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get("/beers", (request, response, next) => {
  punkAPI.getBeers()
  .then(beers => {
  response.render("beers.hbs", {beers});
  console.log("list of the first beer", beers[0])
  })
  .catch(error => {
    console.log(error)
  })
})

app.get("/random-beers", (request, response, next) => {
  punkAPI.getRandom()
  .then(beers => {
    response.render("random-beers.hbs", {beers});
    console.log("list of random beer", beers)
  })
  .catch(error => {
    console.log(error)
  })
})

app.listen(3000);

