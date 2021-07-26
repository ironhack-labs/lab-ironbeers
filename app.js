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
hbs.registerPartials(__dirname + '/views/partials')


// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  try{
    const beers = await punkAPI.getBeers()
    res.render('beers', {beers});
  }
  catch(err){
    console.log('Failed loading beers from API', err)
  }
});

app.get('/random-beer', async (req, res) => {
  try{
    const beer = await punkAPI.getRandom()
    res.render('random-beer', {beer : beer[0]});
  }
  catch(err){
    console.log('Failed loading random-beer from API', err)
  }
});

app.get('/beers/:id', async (req, res) => {
  const beerId = req.params.id
  try{
    const beer = await punkAPI.getBeer(beerId)
    res.render('random-beer', {beer : beer[0]});
  }
  catch(err){
    console.log('Failed loading random-beer from API', err)
  }
});



app.listen(3000, () => console.log('🏃‍ on port 3000'));
