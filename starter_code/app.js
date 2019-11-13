
const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, 'views', 'partials'))


//Routing
app.get('/', (req, res) => res.render('index'))
app.get('/beers', (req, res) => {
  punkAPI.getBeers()
    .then(beers => {
      res.render('beers', { beers })
      //console.log(beers)
    })
    .catch(error => {
      console.log("error")
    })
})

app.get('/randomBeer', (req, res) => {
  punkAPI.getRandom()
    .then(beers => {
      res.render('randomBeer', { beers })
    })
    .catch(erro => {
      console.log("error")
    })
})




app.listen(3000, console.log("A la escucha"));
