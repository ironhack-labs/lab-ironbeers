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
hbs.registerPartials(path.join(__dirname, "views/partials"));
// ...

// Add the route handlers here:

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(apiSuccess => {
    let data = {
      beers : apiSuccess
    }
    console.log(apiSuccess);
    res.render('beers.hbs', data);
  })
  .catch(err => res.send(err));
});

app.get('/random-beer', (req, res, next) => {
  punkAPI.getRandom()
  .then(apiSuccess => {
    const [beer] = apiSuccess;
    res.render('random-beer', {beer});
  })
  .catch(err => res.send(err))
});

app.get('/beers/:id', (req, res) => {
  punkAPI.getBeer(req.params.id)
  .then(apiSuccess => {
    const [beer] = apiSuccess;
    res.render('beer', {beer});
  })
  .catch(err => res.send(err))
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
