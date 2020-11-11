const express = require('express');
const chalk = require('chalk');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname + 'views/partials'));
// ...

// Add the route handlers here:
app.get('/', (req, res, next) => res.render('index'));

app.get("/beers", (req, res, next) => {

  punkAPI
  .getBeers()
  .then(beers => {
    res.render("beers", {beers});
  })
  .catch(error => console.log(error));
});

app.get("/randomBeer", (req, res, next) => {
  
  punkAPI
  .getRandom()
  .then(beer => {
    res.render("randomBeer", {beer});
  })
  .catch(error => console.log(error));
});

app.get('/beers/:id', (req, res, next) => {

  punkAPI
  .getBeer(req.params.id)
  .then(beer => {
    res.render("beer", {beer});
  })
  .catch(error => console.log(error));
});

app.listen(3000, () => console.log(chalk.green.inverse.bold('running on port 3000')));
