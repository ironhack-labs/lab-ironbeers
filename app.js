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



app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  // ruta del navegador
  // res.render('beers');  //ruta del archivo puedes ponerle o no el hbs PERO IGUAL QUE EN EL ARCHIVO
  punkAPI
    .getBeers()
    .then(beersFromApi => {
       res.render('beers', { beers: beersFromApi }); })
    .catch(error => console.log(error));
});

app.get('/randombeers', (req, res) => {
punkAPI
  .getRandom()
  .then(beersFromApi => {
    res.render('randombeers', { randombeers: beersFromApi });
  })
  .catch(error => console.log(error));
});
app.listen(3000, () => console.log(' on port 3000'));
