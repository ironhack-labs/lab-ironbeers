const express = require('express');

const hbs = require('hbs');
const path = require('path');

const app = express();


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));
// ...

// Add the route handlers here:
const routes = require('./config/routes.config');
app.use('/', routes);

app.listen(3000, () => console.log('🏃‍ on port 3000'));
