const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));
// add the routes here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi =>
      // console.log('Beers from the database: ', beersFromApi)
      //console.log(beersFromApi)
      res.render('beers', { beers: beersFromApi })
    )
    .catch(error => console.log(error));
});
app.get('/random-beers', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI =>
      // your magic happens here
      res.render('random-beers', { beer: responseFromAPI })
    )
    .catch(error => console.log(error));
});

app.get('/beers/beer-:id', (req, res) => {
  let id = req.params.id;
  punkAPI
    .getBeer(id)
    .then(responseFromAPI =>
      res.render('random-beers', { beer: responseFromAPI })
    );
});
app.listen(3002, () => console.log('🏃‍ on port 3001'));
