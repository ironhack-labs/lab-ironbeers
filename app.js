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

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
    .then(beersList => {
      console.log('beers from api', beersList[0])
      res.render('beers', { beersList });
    })
    .catch(err => {
      console.log('error', err);
      res.status(500).send('sorry a server error occured'); // <- force a '500' and "send"/throw a user facing message should the promise fail to fulfill. 
    })
});

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
    .then(randomBeer => {
      console.log(randomBeer);
      res.render('randomBeer', {randomBeer: randomBeer[0]}); // <-- this was needed, prior it would not render
    })
    .catch(err => {
      console.log('error', err);
      res.status(500).send('sorry could not retreive a random beer');
    })
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
