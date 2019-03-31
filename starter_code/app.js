
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {

  let data;
 punkAPI.getBeers().then(beers => {

  this.data= beers;
    
  });
console.log(this.data);
  res.render('beers',this);

});

app.get('/randombeers', (req, res, next) => {
  res.render('randombeers');
});


app.listen(3000,()=>{
console.log('listening on port 3000!');

});
