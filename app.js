const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const { response } = require('express');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index'); // path.resolve(__dirname, './views/index.hbs');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromAPI => {
      res.render('beers', { beersFromAPI }); //path.resolve(__dirname, './views/beers.hbs')
    })
    .catch(err => console.log(err));
});

app.get('/random-beer', async (req, res) => {
  const [responseFromAPI] = await punkAPI.getRandom();
  res.render('random-beer', { responseFromAPI });
});

app.get('/beers-:id', async (req, res) => {
  const [responseFromAPI] = await punkAPI.getBeer(req.params.id);
  res.render('random-beer', { responseFromAPI });
});

app.listen(5000, () => console.log('🏃‍ on port 5000'));
