const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + "/views/partials");

app.get('/', (req, res) => {
  res.render('index');
});

app.get("/beers", async (req, res) => {
  res.render("beers", await punkAPI.getBeers());
});

app.get("/detailed-beer/random", async (req, res) => {
  res.render("detailedBeer", await punkAPI.getRandom());
})

app.get("/detailed-beer/:id", async (req, res) => {
  const beer = await punkAPI.getBeer(req.params.id);
  res.render(`detailedBeer`, beer);
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
