
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
const PORT = 3000;

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static(__dirname +'/public'));

app.get('/', (req, res, next) => {

  res.render('home');

});

app.get('/beers', (req, res, next) => {
  // hacer llamada a la API
  punkAPI.getBeers()
  .then(beers=>{       
    res.render('beers', {beers: beers} );
    
  })
  .catch(err=>{
    console.log(err);
  });
  
});

app.get('/randombeer', (req, res, next) => {
  // data = {layout:false} //para que no muestre el layout
  
  punkAPI.getBeers()
  .then(beers=>{  

    let random = beers[Math.floor(Math.random() * beers.length)];
    
    res.render('randombeers', {beers: random} );
    
  })
  .catch(err=>{
    console.log(err);
  });

});

app.listen(PORT, ()=> console.log('running on port' + PORT));