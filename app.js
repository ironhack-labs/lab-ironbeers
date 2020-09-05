/* eslint-disable no-console */

const express = require('express');
const hbs = require('hbs');
const path = require('path');

const app = express();
const appRoutes = require('./routes/appRoutes');

app.listen(3000, () => console.log('🏃‍ on port 3000'));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', appRoutes);

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'partials'));

// Add the route handlers here:
