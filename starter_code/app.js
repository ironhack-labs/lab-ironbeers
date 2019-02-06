
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

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(result => {
    console.log(result)
  res.render('beers', {result})
})
.catch(error => {
  res.render('beers', {error: "algo salio mal"})
})
})

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
  .then(result => {
    console.log(result)
  res.render('random-beer', {result})
})
.catch(error => {
  res.render('random-beer', {error: "algo salio mal"})
})
})

// punkAPI.getBeers()
// .then(beers => {

// })
// .catch(error =>{
//   console.log(error)
// })


app.listen(3000);
