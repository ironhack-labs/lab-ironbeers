const express = require('express');
const port = 3000;
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

/* const homeRouter = require("./routes/home.routes");
const beersRouter = require("./routes/beers.routes");
const randomBeersRouter = require("./routes/randombeers.routes"); */

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + "/views/partials");
// ...

// Add the route handlers here:
/* app.use("/", homeRouter);
app.use("/beers", beersRouter);
app.use("/teams", randomBeersRouter); */
app.get('/', (req, res) => {
  res.render("index");
});

app.get('/beers', (req, res) => { 
  punkAPI
  .getBeers()
  .then(beersFromApi => {
    console.log('Beers from the database: ', beersFromApi);
    res.render('beers', { beersFromApi });
  })
  .catch(error => console.log(error));
});

app.get('/random-beers', (req, res) => { 
  const randomBeer = punkAPI.getRandom()
  randomBeer.then(randomBeersFromApi => {
    console.log('Random beers from the database:', randomBeersFromApi);
    res.render('random-beers', {randomBeersFromApi})
  })
  .catch(error => console.log(error));
});

app.listen(port, () => console.log(`🏃‍ on port ${port}`));

