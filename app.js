const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


// Register the location for handlebars partials here:

hbs.registerPartials(__dirname + "/views/partials");

// Add the route handlers here:

const links = [];

// index route
app.get('/', (req, res) => {
  res.render("index", {
    doctitle: "Home Page",
    links: [
      { href: "/", linkText: "Home Page" },
      { href: "/beers", linkText: "Beers" },
      { href: "/random-beer", linkText: "Random Beer" },
    ],
    });
  });


// beers route
app.get("/beers", (req, res) => {
  punkAPI.getBeers()
    .then(beersFromApi => {
      console.log("Received beers " + beersFromApi);
      res.render("beers", {
        doctitle: "Beers Page",
        links: [
          { href: "/", linkText: "Home Page" },
          { href: "/beers", linkText: "Beers" },
          { href: "/random-beer", linkText: "Random Beer" },
        ],
        beers: beersFromApi
      });
    })
    .catch(error => console.log(error));
  
});


// random-beer route
app.get("/random-beer", (req, res) => {
  punkAPI.getRandom()
  
  .then(randomBeersFromAPI => {
    res.render("random-beer", {
      doctitle: "Random-beer",
      links: [
        { href: "/", linkText: "Home Page" },
        { href: "/beers", linkText: "Beers" },
        { href: "/random-beer", linkText: "Random Beer" },
      ],
      randomBeer: randomBeersFromAPI
    });
  })
  .catch(error => console.log(error));
});







app.listen(3000, () => console.log('🏃‍ on port 3000'));
