const express = require('express');

const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');

const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  //res.render('moviedetail', { clickedMovie: godfather, doctitle: 'movie details' });
  res.render('index');
});

app.get('/beers', (req, res) => {
  //let beersArr = punkAPI.getBeers();
  punkAPI
  .getBeers()
  .then(beersFromApi => {
    //console.log('Beers from the database: ', beersFromApi);
    res.render('beers', {beerList: beersFromApi});
  })
  .catch(error => console.log(error));
});
  

app.get('/random-beer', (req, res) => {
  //let beersArr = punkAPI.getBeers();
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    res.render('random-beer', {randomBeer: responseFromAPI});
  })
  .catch(error => console.log(error));
;
    
  })

  app.get('/:id', (req, res) => {
    punkAPI
    .getBeer(req.params.id)
    .then(beerNew => {
      console.log("hi!!!!!x")
      console.log(beerNew)
      res.render('beerdetail', {beerDet: beerNew});
    })
    .catch(error => console.log(error));
  ;
    })  
//res.render('moviedetail', { clickedMovie: godfather, doctitle: 'movie details' });


app.listen(5000, () => console.log('🏃‍ on port 5000'));
