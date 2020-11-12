const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

// app.get('/beers', (req, res) => {
//   punkAPI
//   .getBeers()
//   .then(beersFromApi => {
//     res.render('beers', { beerList: beersFromApi } );
//     // console.log('Beers from the database: ', beersFromApi)
//   })
//   .catch(error => console.log(error));
// });

app.get('/beers', async (req, res) => {
  let beersFromApi = await punkAPI.getBeers()
  res.render('beers', { beerList: beersFromApi } );
});

app.get('/beer/:id', (req, res) => {  
  // console.log(req.params.id);  
  // const id = req.params.id;  
  punkAPI    
  .getBeer(req.params.id)
  .then(beerFromAPI => {
    res.render('beer', { beer: beerFromAPI[0] });    
  })    
  .catch(err => console.log(err));
});

app.get('/random-beer', async (req, res) => {
  let responseFromAPI = await punkAPI.getRandom()
  res.render('random-beer', { random: responseFromAPI });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
