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

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {

  const beers = async () => {
    const listaCerAPI = await punkAPI.getBeers()
    console.log(listaCerAPI)
    res.render('beers', {
      listado25Cervezas:listaCerAPI
    })
  }
  beers()
});

app.get('/random-beers', (req, res) => {

  const getBeerRandom = async () => {
    const cervezaRandom = await punkAPI.getRandom()
    console.log(cervezaRandom)

    res.render("random-beer",  cervezaRandom[0])
  }

  getBeerRandom()

})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
