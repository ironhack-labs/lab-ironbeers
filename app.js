const express = require('express');
const PunkAPIWrapper = require('punkapi-javascript-wrapper')
const hbs = require('hbs');
const path = require('path');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname,'/views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers().then(beers => res.render("beers",{beers})).catch(error => console.log(error));
});

app.get('/beers/:beerId', (req, res) => {
  const param = req.params
  punkAPI.getBeer(param.beerId).then(beers => res.render("beers",{beers})).catch(error => console.log(error));
});

app.get('/random-beers', (req,res) => {
  punkAPI.getRandom().then(randomBeer => res.render("random-beers",{randomBeer})).catch(error => console.log(error));

});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
 