const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static("public"));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + "/views/partials");

// Add the route handlers here:
app.get('/', (req, res, next) => {
  res.render('home');
});

app.get('/beers', (req, res, next) => {
  res.render('beers');
});

app.get('/random-beer', (req, res, next) => {
  res.render('random-beer');
});

app.use((req, res, next) => {
  res.status(400)
  res.send('404 ERROR')
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
