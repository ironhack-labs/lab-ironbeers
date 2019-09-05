
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials')


app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  const beers = await punkAPI.getBeers()
  res.render('beers', {
    beers
  })
});

app.get('/random-beer', async (req, res) => {
  const [beer] = await punkAPI.getRandom()
  res.render('random-beer', {
    beer
  });
});

app.listen(3000, ()=>{
  console.log(`server running on http://localhost:3000`)
});
