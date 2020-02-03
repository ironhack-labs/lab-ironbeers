const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// add the routes here:
app.get('/', (req, res) => res.render('index'));
app.get('/beers', (req, res) => {
  const beers = punkAPI
    .getBeers()
    .then(beers => {
      console.log(beers);
      res.render('beers', { beers });
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/random-beer', async (req, res) => {
  try {
    const beer = await punkAPI.getRandom();
    res.render('random-beer', ...beer);
  } catch (error) {
    console.log(err);
  }
});

app.get('/beers/beer-:id', async (req, res) => {
  try {
    const beer = await punkAPI.getBeer(req.params.id);
    res.render('random-beer', ...beer);
  } catch (error) {
    console.log(err);
  }
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
