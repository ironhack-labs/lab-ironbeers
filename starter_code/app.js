
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();
const PORT = 3000;

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials')

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers',(req, res, next) => {ç
  punkAPI.getBeers()
  .then(beers => {
    const items = beers;
    console.log(items);
  })
  .catch(error => {
    console.log(error)
  })
  res.render('beers',{items});
})

app.get('/randombeers',(req, res, next) => {
  punkAPI.getRandom()
  .then(beers => {
    const items = beers;
  })
  .catch(error => {
    console.log(error)
  })
  res.render('randombeers',{items});
})

app.listen(PORT,() => {
  console.info(`App listen at port ${PORT}`);
});
