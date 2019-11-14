const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, 'views', 'partials'))



app.get('/', (req, res, next) => res.render('index'));
app.get('/beers', (req, res) => 
  punkAPI.getBeers()
    .then(beers => {
      res.render('beers', {beers}
      )
    })
    .catch(error => {
      console.log(error)
    })
);

app.get('/random-beers', (req, res) => 
punkAPI.getRandom()
  .then(beers => {
    res.render('random-beers', {beers})

  })
  .catch(error => {
    console.log(error)
  })
);

// app.get('/beerPartial', (req, res, next) => {
//   res.render("beerPartial")
// });

app.listen(3000)