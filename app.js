const express = require('express');

const hbs = require('hbs'); // html enriquecido
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));
// ...

// Add the route handlers here:

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
    .then(beersFromApi => {
      console.log('Beers from the database: ', beersFromApi);

      const data = {
        beers: beersFromApi
      };
      res.render('beers', data);
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
    .then(responseFromAPI => {
      console.log('Random beer from the database: ', responseFromAPI);

      res.render('random-beer', responseFromAPI[0]);
    })
    .catch(error => console.log(error));
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));  //// npm run dev - localhost:3000
