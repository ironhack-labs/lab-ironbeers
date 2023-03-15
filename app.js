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

// ...

// Add the route handlers here:

//GET /
app.get('/', (req, res) => {
  res.render('index');
});

// GET /beers
app.get('/beers', (req, res, next) => {

  punkAPI.getBeers()
    .then((beersRetrieved) => {

      const data = {
        beers: beersRetrieved
      }

      console.log(data.beers[1])

      res.render('beers', data);

    })
    .catch((error) => {
      console.log(error);
    });
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));