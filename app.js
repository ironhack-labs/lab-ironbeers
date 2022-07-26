const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'))

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then(beersFromApi =>{
    console.log ('Beers from the database: ', beersFromApi)
    res.render('beers.hbs', {"beerArray": beersFromApi})
  })
  .catch(err=> {
    console.log('Error retrieving beers: ', err);
    res.render('Error retrieving beers');
  })
});

app.get('/random-beer', async (request, response, next) => {
  try{
    let myRandomBeerArray = await punkAPI.getRandom();
    console.log(myRandomBeerArray);
    response.render('randomBeer.hbs', myRandomBeerArray[0]) ;
  } catch (error){
    console.log('Error retrieving random beer: ', error);  
    res.send('error retrieving random beer'); 
  }
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
