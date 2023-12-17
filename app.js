const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then(beersFromApi => res.render('beers', {beersFromApi}))
  .catch(error => console.log(error));

});

app.get("/random-beer", (req, res, next)=>{
  punkAPI.getRandom()
  .then((responseFromAPI)=>{
      console.log (responseFromAPI);
      res.render('random-beer', {beer: responseFromAPI[0]});
  })
})

app.get('/beers/:beerID', (req, res) => {
  punkAPI.getBeer(req.params.beerID).then((theBeer)=>{
    res.render('random-beer', {beer: theBeer[0]})
  });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
