// IMPORT

const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

// MIDDLEWARE

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials("partials_absolute_path")
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// App routes

app.get('/', (req, res) => {  
  res.render('index');
});


// app.get('/beers', (req, res) => {

//   const beers = async()=>{
//     const listaCerv = await punkAPI.getBeers()
//     res.render('beers', listaCerv);

//   } 

//   beers();

// });

app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then((beersFromApi) => {
  res.render('beers', {beers: beersFromApi}); //Name of the destiny, ()
  // console.log(beersFromApi);
  })
  .catch(error => console.log(error));
});


// app.get('/random-beers', (req, res) => {
//   const randBeers = async()=>{
//     const RandBeer = await punkAPI.getRandom();
//     res.render('random-beers',RandBeer[0]);
//     console.log(RandBeer)

//   }
//   randBeers();
// });

app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then((beersFromApi) => {
  res.render('random-beer', {beers: beersFromApi}); //Name of the destiny, ()
  // console.log(beersFromApi);
  })
  .catch(error => console.log(error));
});
// Server started
app.listen(3000, () => console.log('🏃‍ on port 3000'));
