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
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});


app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(beersFromApi =>{
    console.log('Beers from the database: ', beersFromApi);
    res.render('beers', {beersFromApi});
    console.log(beersFromApi);
  })
  .catch(error => console.log(error));
});


app.get('/random-beers', async (req, res) => {
  const randomBeer = await punkAPI.getRandom()
  res.render('random-beer', {randBeer: randomBeer[0]}) ;
  });


app.get('/beers/:id', async (req, res) => {
    const specBeer = await punkAPI.getBeer(req.params.id);
    res.render('random-beer', {randBeer: specBeer[0]}) ;
});
  


app.listen(3000, () => console.log('🏃‍ on port 3000'));
