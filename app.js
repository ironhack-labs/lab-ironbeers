const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});


app.get('/beers', (req, res) => {
  punkAPI.getBeers()
    .then((beersArr) => {
      const data = {
        listOfBeers: beersArr
      }
      console.log(data);
        res.render('beers', data);
      })
      .catch((err) => console.log("Error fetching one beer", err))
    });

    app.get('/random-beer', (req, res) => {
      punkAPI.getRandom()
        .then((responseFromAPI) => {
          const data = {
            randomBeer: responseFromAPI
          }
          console.log(data);
            res.render('random-beer', data);
          })
          .catch((err) => console.log("Error fetching one beer", err))
        });

app.listen(3000, () => console.log('🏃‍ on port 3000'));
