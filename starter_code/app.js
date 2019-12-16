
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

const port = 3000

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render('beers', { beers });
  })
  .catch(error => {
    console.log(error);
  })
});

app.get('/randomBeer', async(req, res, next) => {
   const beers = await punkAPI.getRandom()
  try {
    res.render('randomBeer', { 
      beers
    })
  }catch(error) {
    console.log(error);
  }
});


app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
