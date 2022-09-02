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
hbs.registerPartials(__dirname + '/views/partials')

// Add the route handlers here:


// RENDER IMAGE
app.get('/', (req, res) => { 
  punkAPI
  .getBeers()
  .then(function (beersFromApi) {
    //console.log('Beers from the database: ', beersFromApi)
    res.render('index')
  }) 
  .catch(error => console.log(error))
});  

 //01:07:44 https://ironhack.zoom.us/rec/play/6N7aH4RnPk-YRBkDXUmdkXg6Ao2sQ3jWLylRZAFXUZOMuc-0NfXDKuXQ_tdTy0SmLg6T92gYSZg6apPe.ROfxTdpzXNdlJgvp?_x_zm_rhtaid=190&_x_zm_rtaid=9NkwxNZQSWiZSZ-bp9yqqg.1661930492924.6c27eb56b81bd009e29379ac01ce5c8e&autoplay=true&continueMode=true&startTime=1636624014000

 app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then(function (beersFromApi) {
    //console.log(beersFromApi)
    res.render('beers', {beers: beersFromApi})
  }) 

  .catch(error => console.log(error))
});

app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(randomBeer => {
    console.log(randomBeer[0])
    res.render('randomBeer', {beer: randomBeer[0]})
  }) 

  .catch(error => console.log(error))
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
