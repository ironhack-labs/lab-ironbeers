
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');

const PORT = 3000;
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {

  punkAPI.getBeers()
  .then(beers => {
    res.render('beers', {beers});
    console.log({beers})
  })
  .catch(error => {
    console.log(error)
  })
});

app.get('/random-beer', (req, res, next) => {
  res.render('index');
});




app.listen(PORT, () =>{
  console.log(PORT);
  
});
