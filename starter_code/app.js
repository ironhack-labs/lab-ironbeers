const express = require('express');
const bigode = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

// hbs setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// partial setup
bigode.registerPartials(`${__dirname}/views/partials`);

// static serving setup
app.use(express.static(path.join(__dirname, 'public')));

// my callback for onFulfillment

// consuming promise from

app.get('/', (req, res) => {
  res.render('index.hbs');
});
app.get('/beers', (req, res) => {
  // app.get() calls this stuff whenever it listen to path, therefore promise handling must happen inside this block.
  punkAPI.getBeers().then((resolvedProm) => {
    const objArr = resolvedProm;
    // console.log('objArr: ', objArr[0]) // check properties
    res.render('beers', { objArr });
  });
});
// now with Async/await
app.get('/random-beers', (req, res) => {
  const getRandomBeer = async () => {
    const resolvedProm = await punkAPI.getRandom();
    // console.log(resolvedProm[0]);
    res.render('random-beers', resolvedProm[0]);
  };
  getRandomBeer();
});
const port = 3000;
app.listen(port, console.log(`listening on port ${port}`));
