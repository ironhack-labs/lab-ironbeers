const express = require('express');
const app     = express();
const hbs     = require('hbs');
const PunkAPIWrapper = require('punkapi-javascript-wrapper')
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => {
    console.log('listening')
});


// //FIRST METHOD USING JSON FILE
// const beersObject = require('./beers.json');

// app.get('/beers', (req, res) => {
//     res.render('beers', {beers: beersObject})
// })

// app.get('/random-beer', (req, res) => {
//     var getRandomBeer = Math.floor(Math.random() * beersObject.length);
//     res.render('randomBeer', {randomBeer: beersObject[getRandomBeer]})
// });


//SECOND METHOD WITH PUNK API
app.get('/beers', (req, res) => {
    punkAPI.getBeers()
  .then(beers => {
      res.render('beers', {beers: beers})
  })
  .catch(error => {
    console.log(error)
  })
})

app.get('/random-beer', (req, res) => {
    punkAPI.getRandom()
  .then(beers => {
      var randomBeer = beers[0]
      res.render('randomBeer', {randomBeer: randomBeer})
  })
  .catch(error => {
    console.log(error)
  })
})