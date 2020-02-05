const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, '/views/partials'));

// add the partials here:

// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res) => {
  punkAPI.getBeers().then(beer => res.render('beers', { beer }));
});

app.get('/random-beers', (req, res) => {
  punkAPI.getRandom().then(beer => res.render('random-beer', beer[0]));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));

app.get('/beers/:beerId', (req, res) => {
  punkAPI
    .getBeer(req.params.beerId)
    .then(beer => res.render('random-beer', beer[0]));
});

// app.get('/movieDetail/:movieId', (req, res) => {
//   Movies.findById(req.params.movieId).then(allMovieDetails => {
//     res.write(`<!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <meta http-equiv="X-UA-Compatible" content="ie=edge">
//         <title>Document</title>
//     </head>
//     <body>
//       <h1>${allMovieDetails.title}</h1>
//       <h2>${allMovieDetails.year}</h2>
//       <h3>Director: ${allMovieDetails.director}</h3>
//     </body>
//     </html>`);
//   });
// });
