const express = require('express');

const hbs = require('hbs');
const path = require('path');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper("eq", function (a, b) {
  return a===b;
});

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get(`/breweries`, (req, res) => {
  fetch(`https://api.openbrewerydb.org/v1/breweries`)
  .then((response) => response.json())
  .then((response) => {
        res.render(`breweries`, { breweries: response });
  });
});

app.get(`/randomBrewery`, (req, res) => {
  fetch(`https://api.openbrewerydb.org/v1/breweries/random`)
  .then((response) => response.json())
  .then((response) => res.render(`randomBrewery`, { brewery: response[0] }));
});


app.get(`/breweries/:id`, (req, res) => {
  const id = req.params.id;
  fetch(`https://api.openbrewerydb.org/v1/breweries/${id}`)
    .then((response) => response.json())
    .then((response) => res.render(`randomBrewery`, { brewery: response}));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
