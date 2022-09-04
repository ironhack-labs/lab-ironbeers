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

//Ruta Beers localhost:3000/beers
app.get("/beers", (req,res) => {
  punkAPI.getBeers() //pides
  .then(cervezas => { //recibes datos
      console.log(cervezas);
      res.render("beers", { cervezas: cervezas}) //envias
    })
    .catch(err => console.log(err)); //manda msj si hay error
});

//Ruta Beers localhost:3000/beers
app.get("/random-beer", (req,res) => {
  punkAPI
  .getRandom() //pides
  .then(cerveza => { //recibes datos
      console.log(cerveza);
      res.render("random-beer", { cerveza: cerveza[0]})
    })
    .catch(err => console.log(err));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
