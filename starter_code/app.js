const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

//PARTIALS ARE REGISTERED HERE
// \/\/\/\/\/\/\/\/\/\/\/\/\/
hbs.registerPartials(__dirname + '/views/partials');



app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beers => {
      // console.log(beers)

      res.render('beers',{beers});
    })
    .catch(erro =>{
      // console.log(erro)
      throw new Error(erro);
    })
});

app.get('/random-beers', (req, res, next) => {

  punkAPI
    .getRandom()
    .then(beers => {
      // console.log(beers)
      res.render('random-beers', {beers});
    })
    .catch(erro =>{
      // console.log(erro)
      throw new Error(erro);
    })

});




app.listen(3000);
  
