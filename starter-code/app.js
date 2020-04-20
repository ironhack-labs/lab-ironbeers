require('dotenv').config();
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
// const sassMiddleware = require('node-sass-middleware');

const app = express();
const punkAPI = new PunkAPIWrapper();

// app.use(
//   sassMiddleware({
//     /* Options */
//     src: path.join(__dirname, 'public'),
//     dest: path.join(__dirname, 'public'),
//     debug: true,
//     outputStyle: 'compressed',
//     prefix: '/stylesheets', // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
//   })
// );

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.locals.title = 'IronBeers';

// add the routes here:
app.get('/', (req, res) =>
  res.render('index', {
    section: 'home',
  })
);

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then((result) => {
      res.render('beers', {
        section: 'beers',
        beers: result,
      });
    })
    .catch((error) => console.log(error));
});

app.get('/beers/:id', (req, res) => {
  punkAPI
    .getBeer(req.params.id.substr(5))
    .then((result) => {
      res.render('spec-beer', {
        section: 'spec-beer',
        beer: result[0],
      });
    })
    .catch((error) => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then((result) => {
      res.render('spec-beer', {
        section: 'spec-beer',
        beer: result[0],
      });
    })
    .catch((e) => console.log(e));
});

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🏃‍ on port http://localhost:${port}`));
