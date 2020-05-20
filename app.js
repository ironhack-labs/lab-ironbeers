const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const title = require('express-title');

const app = express();
const punkAPI = new PunkAPIWrapper();

// Handlebars templating
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(title());

app.set('title', 'IronBeers');

// Routing
app.get('/', (req, res) => {
  res.title('Home');
  res.render('index');
});
app.get('/beers', (req, res) => {
  res.title('List of Beers');
  punkAPI.getBeers().then(beers => res.render('beers', { beers }));
});
app.get('/random-beer', (req, res) => {
  res.title('Random Beer');
  punkAPI.getRandom().then(beer => res.render('random-beer', beer[0]));
});
app.get('/beers/:id', (req, res) => {
  const id = req.params.id;
  res.title('Single Beer');
  punkAPI.getBeer(id).then(beer => res.render('beer', beer[0]));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
