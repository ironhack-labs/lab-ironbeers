const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

hbs.registerPartials(`${__dirname}/views/partials`)





app.get('/', (req, res) => {
  //  res.send('estamos ready')
  res.render('index')
})




app.get('/beers', (req, res) => {
  //  res.send('estamos')
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      //console.log(beersFromApi)
      res.render('beers', { beers: beersFromApi })
    })
    .catch(error => console.log(error))

})


app.get('/randomBeer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {

      res.render('random', { beers: responseFromAPI })
    })
    .catch(error => console.log(error))
})




app.listen(5005, () => console.log('🏃‍ on port 5005'));
