
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

const PORT = 3000

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + "/views/partials")

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render('beers', {
      beers
    });
  })
})

app.get('/beer/:beerID', async (req, res) => {
  let punkAPISingleBeerURL = `https://api.punkapi.com/v2/beers/${req.params.beerID}`
  let fullBeer = await fetch(punkAPISingleBeerURL)
  let fullBeerData = await fullBeer.json()

  // We don't want to send an array. So we send the beer we've just get as an object.
  res.render('beer-detail', fullBeerData[0])
})

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()

  .then(randomBeerInfo => {
    // We don't want to send an array. So we send the beer we've just get as an object.
    res.render('random-beer', randomBeerInfo[0])
  })

})

app.listen(PORT, () => {
  console.log(`Server runing at http://localhost:${PORT}`)
});
