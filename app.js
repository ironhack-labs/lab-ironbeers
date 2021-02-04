//1.  IMPORTACIONES
const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();


// 2. MIDDLEWARES

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials("partials_absolute_path")
hbs.registerPartials(path.join(__dirname, 'views/partials'));


// 3. RUTAS
// Add the route handlers here:


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {

  const beers = async()=>{
    const listaCerv = await punkAPI.getBeers()
    res.render('beers', listaCerv);

  }

  beers();

});


app.get('/random-beers', (req, res) => {
  const randBeers = async()=>{
    const RandBeer = await punkAPI.getRandom();
    res.render('random-beers',RandBeer[0]);
    console.log(RandBeer)

  }
  randBeers();
});

//4. LEVANTAMIENTO DEL SERVIDOR
app.listen(3003, () => console.log('🏃‍ on port 3000'));
