const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then((beers) => {
    console.log(beers);
    res.render('beers', { beers });
  })
  .catch(error => {
    res.render('error');
    console.log(error);
  });
});

app.get("/random-beer", (req,res, next)=> {
  punkAPI.getRandom()
  .then((beerPartial) => {
  console.log(beers);
  res.render("randomBeers", beerPartial[0]);
  })
  .catch(error => {
    console.log(error);
    res.render('error');
  });
  
})


app.listen(3000);
