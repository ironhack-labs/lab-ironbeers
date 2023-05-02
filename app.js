const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
//express instance
const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


//Pagina inicio
app.get('/', (req, res) => {
  res.render('index.hbs');
});

//Pagina beers
app.get('/beers', (req, res) => {

  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', { beersInfo: beersFromApi })
    })
    .catch(error => console.log(error));
});

//Pagina random beer
app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      res.render('random-beer', { randomBeer: responseFromAPI });

    })
    .catch(error => console.log(error));

  // res.send("probando si sale random beer")

});



app.listen(3000, () => console.log('🏃‍ on port 3000'));
