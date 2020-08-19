const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const homeRouter = require("./routes/home.routes");
const beersRouter = require("./routeS/beers.routes");
const randomBeersRouter = require("./routes/randombeers.routes");

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// ...

// Add the route handlers here:\
app.use("/", homeRouter);
app.use("/", beersRouter);
app.use("/", randomBeersRouter);



app.listen(3000, () => console.log('🏃‍ on port 3000'));
