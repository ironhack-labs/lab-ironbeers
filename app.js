const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));  
hbs.registerPartials(path.join(__dirname, 'views/partials'));

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
    .then(beersArr => {
     
      res.render('beers', {beers: beersArr});
    })
    .catch(e => {
      console.log(e);
    });
});

app.get('/random-beers',(req, res) => {
  punkAPI
  .getRandom()
  .then(beersArr => {
    console.log(beersArr)
     
      res.render('random-beer', beersArr[0]);
    })
  .catch(error => console.log(error))
})
app.listen(3001, () => console.log('🏃‍ on port 3001'));
