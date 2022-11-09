const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

/* _,.-'~'-.,__,.-'~'-.,__,.-'~'-.,__,.-'~'-.,__,.-'~'-.,_ */


// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

 

// ...

// Add the route handlers here:
app.get('/beers', (req, res, next) => {
punkAPI
  .getBeers(25)
  .then(beersFromApi => res.render('beers', {beerlist: beersFromApi}))
  .catch(error => console.log("error :("+error))
});

app.get('/random-beer', (req, res, next) => {
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    res.render('random-beer', {beerRandom: responseFromAPI})
  })
  .catch(error => console.log("error :("+error))
})

/* _,.-'~'-.,__,.-'~'-.,__,.-'~'-.,__,.-'~'-.,__,.-'~'-.,_ */

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
