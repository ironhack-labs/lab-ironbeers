const { response } = require('express');
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

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  punkAPI
  .getBeers()
  .then(beersFromApi => {
    const data = await punkAPI.getBeers();
    
    res.render('beers'/beers.hbs, {data: beersFromApi}
  )
.catch(error => console.log(error));
  
});

app.get('/random-beers', async (req, res) => {
  punkAPI
  .getRandom()
  .then((responseFromAPI) => {
   const randomBeer = await punkAPI.getBeers();
     res.render('beers/random-beer.hbs', {beers : responseFromAPI});
  })
   .catch(error => console.log(error));
});

  
})


app.get('/beers/:beerId', (req, res) => {
punkAPI
.getBeer(req.params.beerId)
.then((responseFromAPI) => {
const responseFromAPI = await punkAPI.getBeer(req.params.beerId);
res.render('/beers/beer-details.hbs', {beers: responseFromAPI});
}) 
.catch(error => console.log(error));

}
);






app.listen(3000, () => console.log('🏃‍ on port 3000'));

