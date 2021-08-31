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
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => res.render('beers', { beers: beersFromApi }))
    .catch(error => console.log(error));
});

app.get('/random-beers', (req, res) => {
  punkAPI
    .getRandom()
    .then(infoBeer => {
      res.render('info', { infoBeer: infoBeer });
    })
    .catch(error => console.log(error));
});

app.get('/beer-info/:tagId', function (req, res) {
  punkAPI
    .getBeer(req.params.tagId)
    .then(infoBeer => {
      res.render('info', { infoBeer: infoBeer });
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('Working‍ on port 3000'));
