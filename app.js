const express = require('express');

//const hbs = require('hbs');
const path = require('path');

const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next()
})

require('./config/hbs.config.js');

const router = require('./config/routes.config');
app.use('/', router);


app.listen(3000, () => console.log('🏃‍ on port 3000'));
