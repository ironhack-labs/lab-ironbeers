const express = require('express');
const req = require('express/lib/request');

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

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beers => res.render('beers-page', { theBeers: beers }))
    .catch(err => console.log(err))
})

app.get('/randombeer', (req, res) => {
  punkAPI
    .getRandom()
    .then(random => {
      console.log(random[0].id)
      res.render('randombeer-page', { randomBeer: random })
    })
    .catch(err => console.log(err))
})


app.get('/beers/:id', (req, res) => {
  punkAPI
    .getBeer(req.params.id)
    .then(id => {
      res.render('single-beer', { idBeer: id })
    })
})



// server listening

app.listen(3000, () => console.log('🏃‍ on port 3000'));
