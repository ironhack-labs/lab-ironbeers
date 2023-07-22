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
/*
app.get('/random-beer', (req, res, next) => {
  punkAPI.getRandomBeers(beers)
    .then((beers) => {
      const randomBeer= Math.floor(Math.random() * beers.length);
      res.render('random-beers', beers[randomBeer])
    })
    .catch((err) => {
      console.error('Error fetching beers from the PunkAPI');
    });
});
*/
app.get('/random-beer', (req, res, next) => {
  punkAPI.getRandomBeers()
.then(beer => {
  alert(beer[0].name)
});
 
});


app.get('/beers', (req, res, next) => {
  punkAPI.getBeers({ per_page: 25 })
    .then((beers) => {
      console.log(beers)
      res.render('beers', { beers });
    })
    .catch((err) => {
      console.error('Error fetching beers from the PunkAPI');
    });
});

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
