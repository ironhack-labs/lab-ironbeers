const express = require('express');
const res = require('express/lib/response');
const { get } = require('express/lib/response');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(`${__dirname}/views/partials/`)
// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req,res) => {  
  punkAPI
  .getBeers()
  .then(beersFromApi => res.render('beers', {beersFromApi}))
  .catch(error => console.log(error))
})

app.get('/random-beer', (req,res) => {
  punkAPI
  .getRandom()
  .then(responseFromAPI => res.render('random-beer', responseFromAPI[0]))
  .catch(error => console.log(error))
})
  

app.listen(3000, () => console.log('on port 3000'));
