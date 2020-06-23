const express = require('express');
const router = express.Router();

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

//Statics Resources
app.use(express.static('public'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

// app.get('beers', (req, res) => res.render('beers'))

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log('Beers from the database: ', beersFromApi);
      res.render('beers', {
        beers: beersFromApi
      });
    })
    .catch(error => console.log(error));
});

app.get('/random-beers', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      res.render('random-beers', {
        beersRandom: responseFromAPI
      });
    })
    .catch(error => console.log(error));
});

app.get('/:id', (req, res) => {
  const beer = punkAPI.getBeer(req.params.id);
  beer.then(beer => {
    res.json(beer[0]);
  });
});

// Route path: /users/: userId / books /: bookId
// Request URL: http: //localhost:3000/users/34/books/8989
//   req.params: {
//     "userId": "34",
//     "bookId": "8989"
//   }
app.listen(3000, () => console.log('🏃‍ on port 3000'));
