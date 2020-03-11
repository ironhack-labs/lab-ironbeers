const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();
const randomBeer = punkAPI.getRandom()

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:
app.get('/',(req,res,next)=>{
    res.render('index');
});
app.get('/beers',(req,res,next)=>{
    punkAPI.getBeers()
  .then(beersFromApi => {
      console.log('Beers from the database: ', beersFromApi);
      res.render('beers',{beersFromApi});
    })
  
  .catch(error => console.log(error));
});
app.get('/randombeers',(req,res,next)=>{
    punkAPI.getRandom()
  .then(beersFromApi => {
      console.log('Beers from the database: ', beersFromApi);
      res.render('randombeers',{beersFromApi});
    })
  
  .catch(error => console.log(error));
});


// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.listen(3000, () => console.log('🏃‍ on port 3000'));
