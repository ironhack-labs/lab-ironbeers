const express = require('express');

const path = require('path');

const app = express();

// Register configuration
require('./config/hbs.config');


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// ...

// Add the route handlers here:
const routes = require('./config/routes.config');
app.use('/', routes);

app.listen(3000, () => console.log('🏃‍ on port 3000'));
