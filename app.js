const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();


//configuramos handlebars como motor de renderizado en nuestra app
app.set('view engine', 'hbs');

// configuramos la carpeta de vistas en views
app.set('views', __dirname + 'views');

app.use(express.static('public'));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + '/views/partials');

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index')
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beersFromApi => 
    //console.log('Beers from the database: ', beersFromApi))
    res.render('allBeers', { beers: beersFromApi })
)
.catch(error => console.log(error));
});

app.get('/randomBeers', (req, res, next) => {
  punkAPI.getRandom()
  .then(beers => {
    const theBeer = beers[0];
    res.render("random-beer", theBeer );
  })
  .catch(error => console.log(error));
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
