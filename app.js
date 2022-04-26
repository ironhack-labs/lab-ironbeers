const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + 'views')

// ...

// Add the route handlers here:

app.get("/", (req, res, next) => res.render("index"));

app.get("/beers", (req, res, next) => {
  punkAPI.getBeers()
  .then((beers)=> {
    console.log('beers', beers)
    res.render('beers', {beers})
  })
  .catch(error =>console.log('what is it?', error))
})

app.get("/random-beer", (req, res, next) => {
  punkAPI.getRandom()
  .

})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
