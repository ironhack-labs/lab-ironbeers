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
hbs.registerPartials(path.join(__dirname + "/views/partial"))
// ...

// Add the route handlers here:

app.get('/', (req, res) => { res.render('index')});


app.get('/beers', (req, res) => { 
  punkAPI
  .getBeers()
    .then(beersFromApi => { res.render ('beers', { beers: beersFromApi });
    })
    .catch(e => console.log(e));
});

  app.get('/beers/:id', (req, res) => {
    punkAPI
    .getBeer(req.params.id)
    .then(singleBeer => {res.render('beer', singleBeer[0]);
    })
  }
  )

app.get('/random-beer', (req, res) => { 
  punkAPI.getRandom().then(myBeer => {
    res.render('random-beer', {myRBeer: myBeer})
  })
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
