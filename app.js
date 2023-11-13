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

// ...

// Add the route handlers here:

/* no sale correcto. iteracion 3
app.get('/beers', (req, res) => {
  .getBeers()
    .then(beersFromApi => console.log('Beers from the database: ', beersFromApi))
      res.render('beers.hbs')
    
  .catch(error => console.log(error));
})
*/

app.get('/', (req, res) => {
  res.render('index.hbs');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
