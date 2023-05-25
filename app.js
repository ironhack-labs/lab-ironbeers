const express = require('express');
const port = 3000;
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();
const randomBeer = punkAPI.getRandom();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.listen(`${port}`, () => console.log(`🏃‍ on port ${port}`));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});


app.get('/beers', (req, res) => {
punkAPI
  .getBeers()
  .then(beersFromApi => {
    res.render('beers', {beers: beersFromApi});
  })})
  /*.catch(error => {
    console.log(error);
    res.status(400).send('Error retrieving beers. Try again later!');
  });
});*/


/*app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(beerFromApi => {
     res.render('random-beer', {randombeer: beerFromApi[0]});
    })
    .catch(error => {
      console.log(error);
      res.status(400).send('Error retrieving random beer.');
    });
  });
 /*
    randomBeer.then(beer => {
    alert(beer[0].name)
    }) */