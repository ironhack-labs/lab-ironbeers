const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

/* ---------- Route Handlers ---------- */
app.get('/', (req, res) => res.render('index')) // Route handler to / (home page)

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
    .then(beersFromAPI => { // the type of beersFromAPI is Object not Array
      res.render('beers', { beersFromAPI }); // To assign an object to the render need to add {}
    })
    .catch(err => console.error(err))
}) // Route handler to /beers

/* ---------- Middleware ---------- */
app.listen(3000, () => console.log('🏃‍ on port 3000'));
