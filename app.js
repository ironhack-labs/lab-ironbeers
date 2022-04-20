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
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then((beersFromApi)=>{
    console.log(beersFromApi);
    console.dir(req.params[0])
    res.render('beers', {beersArr : beersFromApi})
  })
  .catch((error)=> console.log(error));
});

app.listen(3001, () => console.log('🏃‍ on port 3000'));

app.get('/random-beer', (req, res) => {

  punkAPI
  .getRandom()
  .then((randomBeerFromApi)=>{
    console.log(randomBeerFromApi);
    res.render('random-beer', randomBeerFromApi[0])
  })
  .catch((error)=> console.log(error));
});

// app.get('/specific',(req, res)=>{

//   punkAPI
//   .getBeer()
//   .then((BeerFromApi)=>{
//     console.log(BeerFromApi);
//   })
//   .catch((error)=> console.log(error));
// })

// localhost:3000/artists/michael
// app.get("/artists/:id", () => {
  // req.params.id
// });

