const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

// creamos motor renderizado de vistas//
app.set('view engine', 'hbs');
app.set('views',` ${__dirname}/views`);

//use para las carpetas de public

app.use(express.static(`${__dirname}/public`));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:
const routes = require('./config/routes.config');
app.use('/', routes);


app.listen(3000, () => console.log('🏃‍ on port 3000'));
