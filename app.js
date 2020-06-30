const express = require('express');
const hbs = require('hbs');
const path = require('path');

const getBeers = require('./getBeers');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  try{
    const beerList = await getBeers();
    res.render('beers', { beers: beerList });
  } catch (err) {
      console.log(err)
  }
});


app.get('/random-beers', async (req, res) => {
  try{
    const beerList = await getBeers();
    const randomB = Math.floor(Math.random()*beerList.length)
    res.render('random-beers', { beers: beerList[randomB] });
  } catch (err) {
      console.log(err)
  }
});


app.get('/beers/:beerId', async (req, res) => {
  try{
    const beerList = await getBeers();
    res.render('beer-details', { beers: beerList[req.params.beerId-1] });
  } catch (err) {
      console.log(err)
  }
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));