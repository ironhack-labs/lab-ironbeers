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

hbs.registerPartials("partials_absolute_path")
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) =>{
  const beers = async () =>{
    const beerList= await punkAPI.getBeers()
    //console.log(beerList)
  res.render('beers', {
    listado: beerList
  })
  }
  beers()
});

app.get('/random-beers', (req, res) =>{
  const getBeerRandom = async () =>{
    const oneRandomBeer = await punkAPI.getRandom()
    console.log(oneRandomBeer)
    
    res.render('random-beers', oneRandomBeer[0]);
}
getBeerRandom()
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
