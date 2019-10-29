
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res, next) => {
  let dataIndex = {
    beerImg: "/images/beer.png" 
  }
  res.render('index', dataIndex);
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render('beers', { beers: beers }); //creamos obj todas
    console.log(beers)
  })
  .catch(error => {
    console.log(error)
  })
});

app.get('/random-beers', (req, res, next) => {
  punkAPI.getRandom()
  .then(beers => {
    //console.log(beers)
    res.render('random-beers', { beers: beers[0] }); //return single obj
  })
  .catch(error => {
    console.log(error)
  })  
});


app.listen(3000, () => {
  console.log('Running on 3000')
})
