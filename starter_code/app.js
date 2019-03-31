const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const beers = require('./services/apiBeers')

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
      beers.getBeers.then(beers=>{
        res.render('beers',{beers})
      }).catch(error=>{
        console.log(error)
      })
})

app.get('/random-beers', (req, res, next) => { 
  beers.getRandom.then(beers =>{
    res.render('random-beers',{beers})
  }).catch(error =>{
     console.log(error)
  })
})
app.listen(3008);