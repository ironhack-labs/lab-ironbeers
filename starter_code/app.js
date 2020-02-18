const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the routes here
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res) => {
  punkAPI.getBeers().then((response) => {
    res.render('beers.hbs', {
      beers: response
    })
    // console.log(respose.data);
  });
  // .then(responseFromApi =>
  //   //console.log('Beers from database', responseFromApi))
  //   res.render('beers.hbs', {beers: responseFromApi})
  // .catch(error => console.log(error))
});


app.get('/random-beer', (req, res) => {
  punkAPI.getRandom().then(response => {
    console.log(response)
    res.render('random-beer.hbs', {
      beer: response[0]
    })
  })

})

app.listen(3000, () => {
  console.log('listening on 3000');
});