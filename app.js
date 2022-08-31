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

app.get('/', (req, res) => {
  res.render('index');
});
// get for /beers url
app.get('/beers', (req,res) => {
  punkAPI.getBeers()
  .then(beersArr => {
    console.log('Beers from the array:', beersArr)
    const data = {doctitle: 'Beers', beers: beersArr}
    res.render('beers', data)
  })
  .catch(err => {
    console.log(err)
  })

})

app.listen(3001, () => console.log('🏃‍ on port 3001'));
