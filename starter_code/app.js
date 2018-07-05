const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();


app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'))
app.use(express.static(__dirname + '/node_modules/jquery/dist'))
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
    .then(beers => {
      res.render('beers', {
        title: 'Beers',
        beers
      });
    })
    .catch(error => {
      console.log(error)
    });
});

app.get('/random-beer', (req, res, next) => {
  punkAPI.getRandom()
  .then(randomBeer => {
      console.log(randomBeer);
      res.render('random-beers', {
        title: 'Random Beer',
        randomBeer,
      });
    })
    .catch(error => {
      console.log(error)
    });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Ready http://localhost:${port}`)
})