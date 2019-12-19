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
  //TODO try with async/await
  // .get(calls this stuff whenever it wants, therefore promise handling must happen inside it)
  // TODO como o array getBeers esta disponivel pra partials? bruxaria!!
  punkAPI.getBeers()
  .then((resolvedProm) => {
      const objArr = resolvedProm;
      console.log('objArr: ', objArr[0]) // check properties
      res.render('beers', {objArr})
    });
});
app.get('/random-beers', (req, res) => {
  res.render('random-beers.hbs');
});

app.listen(3000, console.log('listening on port 3000'));
