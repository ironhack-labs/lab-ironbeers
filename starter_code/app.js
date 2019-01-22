
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

//static configuration
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
// Make everything inside of public/ available
app.use(express.static(path.join(__dirname, 'public')));

//create a partial folder inside view to store our partials
hbs.registerPartials(__dirname + '/views/partials');

//First route
app.get('/', (req, res, next) => {
  res.render('index');
});

//Second route
app.get("/beers", (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beers => {
      console.log(beers);
      res.render("beers", { beers });
    })
    .catch(error => {
      console.log(error);
    });
});

//Third route
app.get('/random-beer', (req, res, next) => {
  punkAPI
    .getRandom()
    .then(beers =>{
      console.log(beers);
      res.render("random-beer", { beers });
    })
    .catch(error =>{
      console.log(error);
    })

});

app.listen(3000);
