const express = require('express');
const { get } = require('express/lib/response');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, 'views/partials'))



// Routes

app.get('/', (req, res) => {

  res.render('index');
})

app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then(beersFromApi =>  
    {
      res.render('beers', {theBeers: beersFromApi})
    }
  )
  .catch(error => console.log(error))
})

app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(randomBeerFromAPI=>{
    res.render('randomBeer', {theRandomBeer: randomBeerFromAPI})
  })
  .catch(error=>console.log('error'))
})

app.get(`/beers/beer-:id`, (req, res)=>{
  punkAPI.getBeer(req.params.id)
  .then(beer=>{
    res.render('randomBeer', {theRandomBeer: beer})
  })

})




app.listen(3000, () => console.log('🏃‍ on port 3000'));
