
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.set("layout", __dirname + "/views/layout.hbs");

app.use(express.static(path.join(__dirname, '/public')));
hbs.registerPartials(__dirname + "/views/partials");

app.get('/', (req, res, next) => {
  res.render('index.hbs');
});

app.get("/beers", (req, res, next) => {
  
  punkAPI.getBeers()
  .then(beers => {
    console.log(beers)
      res.locals.beers = beers;
      res.render("beers.hbs");
   })
  .catch(error => {
     console.log(error)
  })
});

app.listen(3000);

