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
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// app.get('/', (req, res) => {
//   res.render('movies', { moviesList: movies })
// });

// app.get('/godfather', (req, res) => {
//   const godfather = movies.find(movie => movie.title === 'The Godfather');
//   console.log(godfather);
//   res.render('movieDetails', { clickedMovie: godfather });
// })

// app.get('/onemovie', (req, res) => {
//   res.render('onemovie')
// });
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', { beers: beersFromApi });
      //console.log(beersFromApi);
    })
    .catch(error => {
      console.log('error in get/beers: ', error);
    });

  app.get('/random-beers')
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
