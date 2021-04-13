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
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  //res.send("hola")
  res.render('index');
});

let beerArray = []
app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      // console.log('Beers from the database: ', beersFromApi)
      beerArray.push(beersFromApi)
      res.render('beers', { beer: beersFromApi });
    })
    .catch(error => console.log(error));
  console.log(beerArray);
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(randomBeer => {
      console.log('Beers from the database: ', randomBeer)
      // beerArray.push(randomBeer)
      // res.render('beers', { beer: randomBeer });
      res.render('random-beer', { beer: randomBeer });
    })
    .catch(error => console.log(error));

});

app.get('/beers/:id', (req, res, next) => {
  const beerId = req.params.id
  punkAPI
    .getBeer(beerId)
    .then(beer => {
      console.log(beer);
      res.render('random-beer', { beer })
    })
  //res.render('beers/beer')
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
