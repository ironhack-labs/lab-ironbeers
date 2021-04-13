const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();


app.use(express.static('public'));
app.set('views', `${__dirname}/views`);
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views/partials'));




// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index-page');
});

app.get('/beers', (req, res) => {

  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log('Beers from the database: ', beersFromApi)
      res.render('beers-page', { beers: beersFromApi });

    })
    .catch(error => console.log(error));

});

app.get('/random-beer', (req, res) => {


  const randomBeer = punkAPI.getRandom()

  randomBeer.then(beer => {
    console.log(beer[0].name)
    res.render('random-beer', { randomBeer: beer });
  })
    .catch(error => console.log(error));


});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
