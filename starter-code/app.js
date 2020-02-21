const express = require('express');
const hbs = require('hbs');
const path = require('path');
const hbshelpers = require('handlebars-helpers');
const H = require('just-handlebars-helpers');

H.registerHelpers(hbs);
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
var helpers = require('handlebars-helpers');
hbs.registerHelper('equal', require('handlebars-helper-equal'));
const app = express();
const punkAPI = new PunkAPIWrapper();
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));
// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.get('/beerid/:id', (req, res, next) => {
  console.log(req.query);
  const orderID = req.params;

  console.log('id' + orderID.id);
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      const obj = { beersFromApi, orderID };
      res.render('id_beer.hbs', { beersFromApi, orderID });
      // console.log(obj);
    })
    .catch(error => console.log(error));
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers.hbs', { beersFromApi });
      //  console.log(beersFromApi);
    })
    .catch(error => console.log(error));
});
app.get('/random-beers', (req, res) => {
  punkAPI
    .getRandom()
    .then(beersFromApi => {
      // console.log(beersFromApi);
      res.render('random-beers.hbs', { beersFromApi });
    })
    .catch(error => console.log(error));
});
app.listen(3000, () => console.log('🏃‍ on port 3000'));
