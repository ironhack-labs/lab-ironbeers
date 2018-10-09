
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + "/views/partials");




app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers',(req,res) => {
  punkAPI.getBeers()
      .then(beers =>{
        res.render('beers',{beers});
      })
      .catch(error =>{
        console.log('error at getBeers => ' + error )
      })
});

app.get('/random-beers',(req,res) => {
  punkAPI.getRandom()
      .then(beer => {
        res.render('random-beer', {beer});
      })
      .catch(error => {
        console.log('Error at => ' + error);
      })
});


app.listen(3000, () =>{
  console.log("El servidor ya esta arriba paps")
});
