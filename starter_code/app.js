
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname+"/views/partials")

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers',(req,res)=>{
})

app.get('/random-beer',(req,res)=>{
})

const listener = app.listen(3012, () =>{
  console.log("your express running at : http://localhost:3012");
})

