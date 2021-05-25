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

hbs.registerPartials(path.join(__dirname, "/views/partials"));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  const beers = punkAPI.getBeers()
  beers
  .then(beers => {
    res.render('beers.hbs',{
      beers
    })
  })
  .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  const randomBeer = punkAPI.getRandom()
  randomBeer
  .then(randomBeer => {
    res.render('random-beer.hbs', {
      randomBeer: randomBeer[0]
    })
  })
  .catch(error => console.log(error));
});

app.get('/beers/:id', (req, res) => {
  const beerId = punkAPI.getBeer(Number(req.params.id))
  beerId
  .then(beerId => {
    res.render('beers', {
      beers: beerId 
    })
  })
  .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));

//utilizo la misma vista, pero le estoy pasando el beerId que es la 
//cerveza con el id que quiero que me enseñe(estoy haciendo click en su link en el título)