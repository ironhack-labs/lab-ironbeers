const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials'); //partials (ex: navbar || footer)

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beers => {
      res.render('beers', { beers });
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  const randomBeer = punkAPI.getRandom();
  randomBeer
    .then(beer => {
      res.render('random-beer', beer);
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));

// app.get("/users/:id", (req, res, next) => {
//   const idParam = req.params.id;

//   fetch(`https://jsonplaceholder.typicode.com/users/${idParam}`)
//     .then((response) => response.json())
//     .then((user) => {
//       res.render("detail", { user });
//     });
// });
