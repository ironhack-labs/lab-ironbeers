//Importaciones
const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();
require("dotenv").config();

// 2. MIDDLEWARES
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + '/views/partials');
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get("/beers", (req, res) => {
  const listBeers = punkAPI.getBeers();
  listBeers.then(beers => {
    console.log(beers);
    res.render('beers', {
      data: beers,
    });
    
  })
    .catch(err => {
      console.log(error)
    });
 
});

app.get('/random-beer', (req, res) => {
  const randomBeer = punkAPI.getRandom();
  randomBeer.then(beer => {
    res.render('random-beer', {
      data: beer,
    });
  })
    .catch(err => {
      console.log(error)
    });
});

//4. Server
app.listen(3000, () => console.log('🏃‍ on port 3000'));
