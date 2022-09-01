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

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()  
  .then(beersFromApi => {
    //console.log('Beers from the database: ', beersFromApi)
    res.render('beers', {beers : beersFromApi})
  })
  .catch(error => console.log(error))  
})


app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    //console.log(responseFromAPI)
    res.render('random-beer', {random: responseFromAPI })
  })
  .catch(error => console.log(error));
  
})

//for (let i = 0; i++ < punkAPI.length; i++)

app.get('/beers/:beerId', (req, res) => {
  const id = req.params.beerId;
  punkAPI
  .getBeer(id)
  
  .then(beer=> {    
    const beerObj = beer[0]
    res.render('beer', {beerObj})
  })
  
  
  
})


app.listen(3000, () => console.log('🏃‍ on port 3000'));
