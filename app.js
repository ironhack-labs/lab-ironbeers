const { randomBytes } = require('crypto');
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
  res.render('index.hbs');
});

app.get('/beers', async (req, res) => {  //la sintaxis del async siempre sería en esta linea
  const allbeers = await punkAPI.getBeers();
  //console.log(allbeers);//es recomendable ver un conlog viendo solo 1 para saber que tipo de 
  //objeto se tiene 
  res.render('beer.hbs', { allbeers })
})

app.get('/randomBeer', async (req, res) => {
  const randomBeer = await punkAPI.getRandom()
  //console.log('random', randomBeer)

  res.render('beerRandom.hbs', { randomBeer });
})

app.get('/beers/:beerId', async (req, res) => {
  const beerId = req.params.beerId //tiene que llamarse el contenido del parametro y el 
  //que se pide por el get
  console.log(beerId);
  const selectedBeers = await punkAPI.getBeer(beerId)

  res.render('beerpartial', { selectedBeers })
  console.log(selectedBeers);
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
