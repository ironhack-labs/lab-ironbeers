const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(path.join(__dirname, 'views/partials'));




// Register the location for handlebars partials here:
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  try {
    // getting all the beers from the getBeers method
    const beers = await punkAPI.getBeers()
    res.render('beers', {beers});

  }catch(error){
    console.log(error)
  }
});

app.get('/random-beer', async (req, res) => {
  try{
    const result = await punkAPI.getRandom();
    const beer = result[0]

    res.render('random-beer', {beer});
  }catch(error){
    console.log(error)
  }
});

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
