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
hbs.registerPartials(path.join(__dirname, 'views/partials')); // bonus

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
    .then(beersFromApi => {
      console.log('Beers from the database: ', beersFromApi);
      res.render('beers', { beers: beersFromApi });
    })
    .catch(error => console.log(error));

});

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
    .then(responseFromApi => {
      res.render('random-beer', { beers: responseFromApi });
    })
    .catch(error => console.log(error));

});

app.get('/beers/:beerId', (req, res) => {
  const clickedBeer = req.params.beerId

  punkAPI.getBeer(clickedBeer)
    .then(beerDetails => {
      console.log('Beer details from the database: ', beerDetails);
      res.render('beerdetails', { beer: beerDetails[0] });
    })
    .catch(error => console.log(error));
});



// app.get('/expressions/:id', (req, res, next) => {
//   const gottenExpression = getElementById([req.params.id], expressions);
//   res.send(gottenExpression)
// })


app.listen(3000, () => console.log('🏃‍ on port 3000'));
