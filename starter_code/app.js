
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials')

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  //beerData is just a placeholder in can be any word
    .then(beerData => {
      //console.log(beerData)
  //beerData is what i will use to call {{#each beerData}} {{/each}}    
      res.render('beers', { beerData });
    })
    .catch(error => {
      console.log(error);
    });
});

app.get('/randombeer', (req, res, next) => {

  punkAPI.getRandom()
  .then(beerData => {
    //console.log(beerData[0])
    res.render('randombeer', { randomBeer:beerData[0] });
  })
  .catch(error => {
    console.log(error)
  })
  
});


app.listen(3000, () => console.log("Listening on port 3000:)"));
