
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {

    punkAPI.getBeers()
        .then(beers => {

          let beerArr = beers.map(beer => {
            return {
                title: beer.name,
                tagline: beer.tagline,
                url: beer.image_url,
                description: beer.description
            }
          });

            res.render('beers', {beers: beerArr});
        })
        .catch(error => {
            console.log(error)
        });

});

app.get('/random-beer', (req, res, next) => {

    punkAPI.getRandom()
        .then(beers => {

            let beer  = { title: beers[0].name,
                         tagline: beers[0].tagline,
                         url: beers[0].image_url,
                         description: beers[0].description,
                         food: beers[0].food_pairing,
                         tips: beers[0].brewers_tips
                        };
              console.log(beer);
            res.render('randomBeer', {beer: beer});
        })
        .catch(error => {
            console.log(error)
        })

});


app.listen(3000);