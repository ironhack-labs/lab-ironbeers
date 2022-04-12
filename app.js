const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, 'views/partials'));


app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(randomBeer => {
      res.render('random-beer', { randomBeer })
    })
    .catch(error => console.log(error))
})

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beers => {
      res.render('beers', { beers })
    })
    .catch(error => console.log(error));

})

//app.get('/beers/:id', (req, res) => {
// punkAPI
// .getBeer(req.params.id)
//  .then(id =>
//res.render('beer-id', { id })) ¿HAY QUE CREAR UNA NUEVA PAG EN VIEWS PARA EL ID?
//.catch(error => console.log(error));
//})

app.get('/', (req, res) => {
  res.render('index');
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
