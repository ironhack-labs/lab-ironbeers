const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:
app.engine(
  'hbs',
  hbs({
    extname: 'hbs',
    defaultLayout: 'main.hbs',
    layoutsDir: path.resolve(__dirname, 'views/layouts')
  })
);

app.set();

// add the routes here:
app.get('/', (req, res) => res.render('index'));
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromAPI => {
      //   res.send(beersFromAPI);
      res.render('beers', { beersList: beersFromAPI, column: true });
    })
    .catch(err => console.log(err));
});
app.get('/beers/beer-:beerId', (req, res) => {
  punkAPI
    .getBeer(req.params.beerId)
    .then(beersFromAPI => {
      //   res.send(beersFromAPI);
      res.render('beers', { beersList: beersFromAPI, extended: true });
    })
    .catch(err => console.log(err));
});
app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(beersFromAPI => {
      //   res.send(beersFromAPI);
      res.render('beers', { beersList: beersFromAPI, extended: true });
    })
    .catch(err => console.log(err));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
