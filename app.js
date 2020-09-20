const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const router = require('../../../../dev-squad-248/module-2/week-1/day-5/1-basic-CRUD/routes/pages');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log(beersFromApi);
      res.render('beers', { beersFromApi });
    })

    .catch(error => console.log(error));
});

app.get('/randomBeers', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromApi => {
      res.render('random-beers', { responseFromApi});
    })
    .catch(err => console.log(err));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
