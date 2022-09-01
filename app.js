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
  const data = {doctitle: 'Home of beers'}
  res.render('index',data);
});
//register the partials:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// get for /beers url
app.get('/beers', (req,res) => {
  punkAPI.getBeers()
  .then(beersArr => {
    const data = {doctitle: 'Beers', beers: beersArr}
    res.render('beers', data)
  })
  .catch(err => {
    console.log(err)
  })
})
app.get('/randombeer', (req,res) => {
  punkAPI.getRandom()
  .then(randomBeer => {
    console.log(randomBeer)
    const data = {doctitle: 'Random beer', beer: randomBeer}
    res.render('randomBeer', data)
  })
  .catch(err => {
    console.log(err)
  })
})
app.get('/beer-:id', (req,res) => {
  // proper punkAPI.getBeer to not waste time and bandwidth on downloading 
  // all beers :)
  const id = req.params.id;
  punkAPI.getBeer(id)
  .then(beer => {
    const selectedBeer = beer[0];
    const data = {doctitle: selectedBeer.name, selectedBeer}
    res.render('singleBeer', data)
  })

  //works but punkAPI supports single ID call 
  // .then(beersArr => {
  //   const id = req.params.id
  //   const selectedBeer = beersArr[id-1]
  //   console.log(selectedBeer)
  //   const data = {doctitle: selectedBeer.name, selectedBeer}
  //   res.render('singleBeer', data)
  // })

})

app.listen(3001, () => console.log('🏃‍ on port 3001'));
