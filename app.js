const express = require('express');
const { registerPartial, registerPartials } = require('hbs');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname,'/views/partials'))
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  // res.send('ESTO ES EL INICIO')
  res.render('index');
});
app.get('/beers', (req, res) => {
  punkAPI.getBeers().then(beers => {
    res.render('beers', { beers: beers })
  })
    .catch(error => console.log(error));
  //no entiendo del todo lo del console.log aquí la verdad
  })

app.get('/random-beer', (req, res) => {
  res.render('random-beer');
})


app.listen(3000, () => console.log('🏃‍ on port 3000'));
