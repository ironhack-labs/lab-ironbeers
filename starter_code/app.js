
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res, next) => {
  res.render('index.pug');
});

app.get('/beers', (req, res, next) => {
  
  punkAPI.getBeers()
  .then(beers => {
    //console.log(JSON.stringify(beers));
    res.render('beers.pug', {beers : beers});
  })
  .catch(error => {
    console.log(error)
  });

});

app.get('/random-beers', (req, res, next) => {

  punkAPI.getRandom()
  .then(beers => {
    //console.log(JSON.stringify(beers));
    res.render('random.pug', {beers : beers});
  })
  .catch(error => {
    console.log(error)
  })

})

app.listen(3000, () => {
  console.log(`Listening in port 3000`);
});
