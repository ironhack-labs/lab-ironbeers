const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials')
 

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:


// add the routes here:
app.get('/',(req,res,next) =>{
    res.render('index');
});  
app.get('/beers',(req,res,next) =>{
    punkAPI.getBeers()
  .then(function(beersFromApi){
    console.log('Beers from the database: ', beersFromApi)
    res.render('beers',{beersFromApi});
  })
  //.then(beersFromApi => console.log('Beers from the database: ', beersFromApi))
  .catch(error => console.log(error));
    
});    

app.get('/randomBeers',(req,res,next) =>{
    punkAPI.getRandom()
    .then(function(beersFromApi){
      console.log('Beers from the database: ', beersFromApi[0])
      res.render('randomBeers',beersFromApi[0]);
    
}); 
});    


app.get('/', (req, res) => res.render('index'));

app.listen(3000, () => console.log('🏃‍ on port 3000'));
