
const express = require('express');
require('hbs');
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

app.get('/beers', (req, res) => {
  res.render('beers');
});

app.listen(3000, (req,res)=>{
  console.log('Ando en el 3000')
});