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

// ...
//todo, define prefixes of all-beers.js

const indexRouter = require("./routes/index");
const beersRouter = require("./routes/beers");

app.use("/", indexRouter);
app.use("/beers", beersRouter);

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  res.render('beers');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
