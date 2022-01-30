const express = require('express');
const res = require('express/lib/response');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


app.set("views", __dirname + "/views"); // Register the location for handlebars partials here:
app.set("view engine", "hbs"); // ...
hbs.registerPartials(__dirname + "/views/partials"); // Add the route handlers here:


app.get('/', (req, res) => {
  res.render('index');
});

app.get("/beers", (req, res) => {
  punkAPI
    .getBeers()
      .then(beers => {
        console.log(beers)
        res.render("beers", { beers: beers })
      })
})
app.get("/random-beers", (req, res) => {
  punkAPI
    .getRandom()
      .then(beers => {
        res.render("randomBeers", { beer: beers[0] })
      })
})


app.use((req,res) => {
  res.status(404).send("Not Found");

});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
