const express = require('express');

const hbs = require('hbs');

const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials')

app.use(express.static(__dirname + '/public'));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then((beersFromApi)=>{
    res.render('beers', {data:beersFromApi})
  })
  .catch(error => console.log(error));
});
app.get('/randomBeer', (req, res) => {
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    res.render('randomBeer',responseFromAPI[0]);
  })
  .catch(error => console.log(error));
}); 

app.get(`/theBeer`, (req, res) => {
  punkAPI
  .getBeer(id)
  .then(idOfBeer => {
    console.log(idOfBeer)
    res.render('theBeer', idOfBeer);
  })
  .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
