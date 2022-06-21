const express = require('express');
const { read } = require('fs');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// ...

// Add the route handlers here:

app.get('/', (req, res) => {

  //res.send('No arriesgo')
  res.render('index');
});

app.get('/beers', (req, res) => {

  //res.send('No arriesgo')
  punkAPI
    .getBeers()
    .then(beersFromApi => res.render('beers', { theBeers: beersFromApi }))
    .catch(error => console.log(error));


});

app.get('/random-beer', (req, res) => {

  //res.send('No arriesgo')
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      console.log(responseFromAPI)
      res.render('random-beer', { theRandomBeers: responseFromAPI })
    })
    .catch(error => console.log(error));

});



app.listen(3000, () => console.log('🏃‍ on port 3000'));
