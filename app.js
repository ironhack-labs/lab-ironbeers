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
hbs.registerPartials(__dirname + "/views/partials");


// HOME PAGE
app.get('/', (req, res, next) => {
  res.render('home', { title: 'Home' });
});

// BEER LIST
app.get('/beers', (req, res, next) => {
  punkAPI
  .getBeers()
  .then(beersFromApi => {
    res.render('beers', { beersFromApi, title: 'Beers' })
  })
  .catch(error => console.log(error))
});

// RANDOM BEER
app.get('/random-beer', (req, res, next) => {
  punkAPI
  .getRandom()
  .then(randomBeer => {
    res.render('beer', { beer: randomBeer[0], title: 'Random Beer' });
  })
  .catch(error => console.log(error));
});


// BEER BY ID
app.get('/beer/:id', (req, res, next) => {
  let beerId = req.params.id

  punkAPI
  .getBeer(beerId)
  .then(Beer => {
    res.render('beer', { beer: Beer[0], title: 'Beer' });
  })
  .catch(error => console.log(error));
});


// 404
app.use((req, res, next) => {
  res.status(400)
  res.render('error', {title: '404 Error'})
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
