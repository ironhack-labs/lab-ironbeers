const express = require('express');

const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

const app = express();

//Init configurations
require('./configs/hbs.config');

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

//Setup express middlewares
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
    console.debug(req.path);
    res.locals.currentPath = req.path;
    next();
})

// Register the location for handlebars partials here:
//...hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Connect application routes
const routes = require ("./configs/router.config");
app.use('/', routes);

app.listen(3000, () => console.log('🏃‍ on port 3000'));
