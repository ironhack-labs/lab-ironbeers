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

app.get('/', (req, res) => {
  res.render('index');});

// Página Beer
app.get('/beers-page', (req, res) => {  //3.1 primer paso

  punkAPI.getBeers() // segundo paso
   .then(beers => {
      res.render("beers-page", { beers: beers }); // tercer paso
    })
    .catch(error => console.log(error));
});
//Página Random
app.get('/random', (req, res) => { 

  const randomBeer = punkAPI.getRandom()
  randomBeer.then(beers => {

    res.render('random-beers', { beers: beers });
  })
    .catch(err => console.log(err))
});

app.listen(5000, () => console.log(' on port 5000'));
