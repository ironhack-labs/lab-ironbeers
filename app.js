
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs'); 
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials')



app.get('/', (req, res, next) => {
  res.render('index');
});


app.get('/beer', (req, res, next) => { 
  punkAPI.getBeers()
  .then(beers => {
    console.log({beers})
    res.render('beer', {beers});
  })
  .catch(error => { 
    console.log(error)
  })
});


app.get('/', (req, res, next) => {
  res.render('random-beer');
  punkAPI.getRandom()
  .then(beers => {
    console.log({beers})
    res.render('beer', {beers});
  })
  .catch(error => { 
    console.log(error)
  })

});



const port = undefined;
app.listen ((port || 3000),()=>{
  console.log(`port ${port || 3000}`)
});
