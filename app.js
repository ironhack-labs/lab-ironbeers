const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Set up of public path
app.use(express.static(path.join(__dirname, 'public')));


// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'))
// ...

// Add the route handlers here:

app.get('/', (req, res) => res.render('index'))

app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => res.render('beers', {beersFromApi}))
    .catch(error => console.log(error))
})

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(beerFromApi => res.render('random-beer', beerFromApi[0]))
    .catch(error => console.log(error))
})


app.get('/beer-:id', (req, res) => {
  const beerId = req.params.id;
  punkAPI
    .getBeer(beerId)
    .then(beer => {
      res.render('random-beer', beer[0]);
    })
    .catch(error => console.log(error))
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
