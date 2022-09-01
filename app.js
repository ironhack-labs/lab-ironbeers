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
app.get('/beers', (req, res) => {
  //punkAPI.getBeers(); //aqui estamos pidiendole a punkAPI que dispare una acción y pida la info
  punkAPI.getBeers().then(cervezas =>{ //aquí tenemos que agregar la promesa
    console.log(cervezas);//mando a llamar, mi objeto
    res.render('beers', {cervezas: cervezas});
  })
  .catch(err => console.log(err));
});

app.get('/randombeer', (req, res) => {
  punkAPI.getRandom().then(cerveza =>{ 
    console.log(cerveza);
    res.render('randombeer', {cerveza: cerveza[0]});
  })
  .catch(err => console.log(err));
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
