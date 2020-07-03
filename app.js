const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));
// ...

// Add the route handlers here:
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  console.log(`on the beer route`);

  try {
    var beersFromApi = await punkAPI.getBeers();
    console.log(`retrived the fresh beers ${beersFromApi}`);
    res.render('beers', { beersFromApi });
  } catch (err) {
    console.error(err);
  }
});

app.get('/random-beer',
  async (req, res) => {
    console.log(`on the random beer route !`);
    try {
    var randomBeerArray = await punkAPI.getRandom();
    var randomBeer = randomBeerArray;
     console.log(`got the random beer !, it is ${randomBeer}`);
     //var randomBeer = randomBeerArray[0];
     res.render('random-beer', {randomBeer});

    } catch (err) {
     // console.error(err);
    }
  });


  app.get('/beers/beer-:id', async (req, res) => {
try {
  console.log(`got the beer  id!, it is ${req.params.id}`);
  var beer = await punkAPI.getBeer(req.params.id);
  console.log(`got the beer ! it is ${beer[0]}`);
  res.render('beer', {beer})
  console.log(`render sent`);
}
catch (err) {
  console.error(err)
}
  })



/* SHOULD BE LAST */

app.listen(3000, () =>
  console.log('🏃‍ on port 3000 => http://localhost:3000/ ')
);
