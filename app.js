const express = require('express');

const hbs = require('hbs');
const path = require('path');

const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, '/public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + "/views/partials");
// ...

// Add the route handlers here:

app.get('/', (req, res, next) => {
  res.render('index');
});


app.get('/beers', async (req, res, next) => {
  try {
    const beers = await punkAPI.getBeers();
    console.log(typeof beers, beers, beers[0]);
    res.render("beers", {
      beers,
      css: ["mod-beers"]
    });

  } catch (errApi) {
    console.log(errApi);
  }

});

app.get('/beer/:id', (req, res, next) => {
  console.log('single beer');
  var currentId = req.params.id;
  var numId = parseInt(currentId, 10);
  var beer;
  punkAPI.getBeer(numId)
    .then((res) => {
      console.log(res);
      //const beer = el[0];
      beer = res[0];
    })
    .then(() => {
      res.render("beer", {
        beer,
        css: ["mod-single-beer"]
      });
    })
    .catch(err => console.log(err));

});

app.get('/random-beer', (req, res, next) => {
  try {
    punkAPI.getRandom()
      .then((beer) => {
        const randomBeer = beer[0];
        if (randomBeer.image_url == null) randomBeer.image_url = '/images/beer.png';

        res.render("randomBeer", {
          randomBeer,
          css: ['mod.single-beer']
        });
      });
  } catch (apiErr) {
    console.log(apiErr);
  }
});



app.listen(3000, () => console.log('🏃‍ on port 3000'));