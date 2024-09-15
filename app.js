const express = require('express');
const port = 3000;
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();
const getRandomBeer = punkAPI.getRandom();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});


app.get('/beers', (req, res) => {
punkAPI
  .getBeers()
  .then(beers => {
    res.render('beers', {beers: beers});
  })
  .catch(error => {
    console.log(error);
    res.status(400).send('Error retrieving beers. Try again later!');
  });
})



app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(randomBeer => {
    console.log("randomBeer", randomBeer);
     res.render('random-beer', {randomBeer: randomBeer});
    })
    .catch(error => {
      console.log(error);
      res.status(400).send('Error retrieving random beer.');
    });
  });

  app.listen(`${port}`, () => console.log(`🏃‍ on port ${port}`));