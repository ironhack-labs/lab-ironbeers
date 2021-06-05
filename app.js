const express = require('express');

const path = require('path');

const app = express();


//Register configuration
require('./config/hbs.config');

// creamos motor renderizado de vistas//
app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

app.use((req, res, next) => {
    // res.locals.path => global variables at hbs views (active path at navbar)
    res.locals.path = req.path;
    next();
  }); 

//use para las carpetas de public

app.use(express.static(`${__dirname}/public`));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:
const routes = require('./config/routes.config');
app.use('/', routes);


app.listen(3000, () => console.log('🏃‍ on port 3000'));
