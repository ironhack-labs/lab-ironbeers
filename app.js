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

hbs.registerPartials(__dirname + "/views/partials")

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/beers', (req, res) => {
  punkAPI.getBeers()
    .then((beersData)=>{
      console.log('Beer data fetched')
      res.render('beers', {beersData});
    })
    .catch((err)=>{console.log(err)})
});
app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
    .then((beer)=>{
      console.log('rng beer passed')
      console.log(beer)
      res.render('random-beer', {beer});
    })
    .catch((err)=>console.log(err))
});
//Trying to make a unique beer page

app.get('/beer/*', (req, res) => {
    let beerId = req.params[0]
    console.log('beerId', beerId)
    punkAPI.getBeer(beerId)
    .then((beer)=>{
      res.render('uniqBeer', {beer})
    })
    .catch((err)=>{console.log(err)})
    
})




app.listen(3000, () => console.log('🏃‍ on port 3000'));
