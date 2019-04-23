
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res, next) => {
  res.render('index');
});


app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    console.log("-------", beers);
    res.render('beers.hbs', {beers});
  })
  .catch(error => {
    console.log(error)
  })
});
hbs.registerPartials(__dirname + '/views/partials')

app.get('/random-beer', (req, res, next) => { //hit when i go to the page
  punkAPI.getRandom().then(beer=>{ //the api is called and returns a random beer
    let data = {
      image_url: beer[0].image_url,
      name:beer[0].name,
      tagline: beer[0].tagline,
      description: beer[0].description,
      food_pairing: beer[0].food_pairing,
      brewers_tips: beer[0].brewers_tips,
    }
    res.render('random-beer.hbs',data) //I render my page with the random beer
  })
});

app.listen(3000);