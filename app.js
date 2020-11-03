const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const homeRouter = require("./routes/home.routes");
const beersRouter = require("./routes/beers.routes");
const randomBeersRouter = require("./routes/random-beers.routes");

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + "/views");
// ...

// Add the route handlers here:
app.use("/", homeRouter);
app.use("/beers", beersRouter);
app.use("/teams", randomBeersRouter);

app.get('/', (req, res) => { //Original setup
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));

module.exports = router;