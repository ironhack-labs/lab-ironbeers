const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
app.get("/beers", (req, res) => { punkAPI.getBeers().then(beer => {
  res.render("beers",{beers:beer});
});
});

app.get("/random-beers", (req, res) => { punkAPI.getRandom().then(beer => {
  res.render("random-beers",{beers:beer});
});
});

app.get('/', (req, res) => {res.render('index');});

app.get("/beers/:id", (req, res) => { punkAPI.getBeer(req.params.id).then(beer => {
  res.render("random-beers",{beers:beer});
});
});

//app.get("/random-beers", (req, res) => res.render("random-beers"))

// Add the route handlers here:



app.listen(3000, () => console.log('🏃‍ on port 3000'));
