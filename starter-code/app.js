const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
hbs.registerPartials(path.join(__dirname, 'views/partials'));

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:

// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(allbeers => {
      res.render('beers', { allbeers });
    })
    .catch(dbErr => console.error('OH no, db err :', dbErr));
});

app.get('/beers/:id', (req, res) => {
  console.log(req.params.id);
  punkAPI
    .getBeer(Number(req.params.id))
    .then(mybeer => {
      console.log(mybeer);
      res.render('detailledbeers', { mybeer });
    })
    .catch(dbErr => console.error('OH no, db err :', dbErr));
});

app.get('/random-beers', (req, res) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      console.log(responseFromAPI);
      res.render('random-beers', { responseFromAPI });
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
