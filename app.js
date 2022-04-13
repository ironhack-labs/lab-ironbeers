const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(__dirname + "/views/partials");


// Basic iterations

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beer-list', (req, res) => {
  punkAPI.getBeers()
    .then( beerList => res.render('beers', { beerList } ) )
    .catch(error => console.log(error));
});

//
app.get('/beer/:id?', (req, res) => {
  const beerID = req.params.id;
  punkAPI.getBeer(beerID)
    .then( beers => res.render('randombeer', { beers } ) )
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
    .then( beers => res.render('randombeer', { beers } ) )
    .catch(error => console.log(error));
});

// Messing around with things
//
app.get('/beers/:id?', (req, res) => {
  let call = (!isNaN(req.params.id) ? `getBeer` : `getRandom` )
  let param = (!isNaN(req.params.id) ? `${req.params.id}` : `` )
  punkAPI[call](param)
    .then( beers => res.render('randombeer', { beers } ) )
    .catch(error => console.log(error));  
});

// Bonus 'DRY' iteration
//
app.get('/dry-beer/:id?', (req, res) => {
  punkAPI.getBeer(req.params.id)
    .then( beers => res.render('drybeer', { beers } ) )
    .catch(error => console.log(error));  
});
app.get('/dry-beer-list/', (req, res) => {
  punkAPI.getBeers()
    .then( beers => res.render('beersdry', { beers } ) )
    .catch(error => console.log(error));  
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));

