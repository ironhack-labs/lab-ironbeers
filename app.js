const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');


const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

//para generar vista de seccion beers
app.get('/beers', (req, res) => {
  const allBeers = punkAPI.getBeers();
  allBeers
  .then((beers)=>{
    res.render('beers',{
      cheve:beers
    })
  })
    .catch((error)=>{
      console.log(error)
    })
  });

//para generar vista de seccion beers
app.get('/random-beer', (req, res) => {
  const randomBeers = punkAPI.getRandom();
  randomBeers
    .then((beers)=>{
        res.render("random-beer",{
            cheve:beers 
        })
    })
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
