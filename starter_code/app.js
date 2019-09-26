
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname + '/public')));
hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(data => {
    res.render('beers', {data} );
  })
  .catch(error => {
    throw new Error(error)
  })
})

app.get('/random-beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(data => {
    res.render('randomBeers', data[0] );
  })
  .catch(error => {
    throw new Error(error)
  })
});

app.listen(3000);




// const fetchBeer = async () => {
//   const data = await punkAPI.getBeers();
//   res.send(data);
// }
// try {
//   fetchBeer();
// } catch (error) {
//   throw new Error(error);
// }