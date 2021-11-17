// 1. Importaciones

const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();


// 2. MIDDLEWARS

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...



// 3. RUTAS, Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});


app.get('/beers', (req, res) => {
  res.render('beers');
});


app.get('/random-beer', (req, res) => {
  res.render('random-beer');
});



// 4. Servidor 

app.listen(3000, () => console.log('🏃‍ on port 3000'));


