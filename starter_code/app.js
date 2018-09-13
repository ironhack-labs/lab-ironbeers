
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials')

app.get('/', (req, res, next) => {
  res.render('index');
});
app.get('/beer', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    console.log(beers[0]);
    res.render("beers", { beerlist: beers });
  })
  .catch(error => {
    console.log(error)
  })
});
app.get('/random-beer', (req, res, next) => {
  punkAPI.getRandom()
    .then(beers => {
      console.log("pasa");
      res.render('random-beer', {beerlist: beers })
      console.log("renderimg");
    })
    .catch(error => {
      console.log(error);
    })
});


app.listen(3000, () => {
  console.log("Listening on port 3000");
});
