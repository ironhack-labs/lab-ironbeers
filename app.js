const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();

express.static('myViews', path.join(__dirname, 'views'));
express.static(path.join(__dirname, 'public'));

app.set('view engine', 'hbs');

const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();




app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', { beersFromApi })

      // console.log(beersFromApi)
    })
});

app.get('/beersDetails'), (req, res) => {
  punkAPI
    .getBeer(req.beersFromApi.id)
    .then(beersFromApi => {
      res.render('beersDetails', { beersFromApi })
    })
    .catch()
}

app.listen(3000, () => console.log('🏃‍ on port 3000'));
