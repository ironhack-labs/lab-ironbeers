const path = require('path');

const express = require('express');
// using express-handlebars instead standard hbs installation
// due facing several issues with frozen content on page reload
const handlebars = require('express-handlebars');

const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

const hbs = handlebars.create({
  defaultLayout: 'main',
  extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// app.set('view options', { layout: 'layouts/main' });

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Register the location for handlebars partials here:
// hbs.registerPartials(__dirname + '/views/partials');

app.get('/', (req, res) => {
  res.render('index', {
    isIndex: true
  });
});

app.get('/beers', async (req, res) => {
  try {
    res.render('beers', {
      isBeers: true,
      beers: await punkAPI.getBeers()
    });
  } catch (err) {
    throw err;
  }
});

app.get('/random-beer', async (req, res) => {
  try {
    res.render('randomBeer', {
      isRandom: true,
      beer: await punkAPI.getRandom()
    });
  } catch (err) {
    throw err;
  }
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
