const { response } = require('express');
const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials(__dirname + "/views/partials");

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...
app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then(beersFromApi => {
    console.log('Beers from the database: ', beersFromApi)
    res.render('beers.hbs', { "beerArray": beersFromApi});
  })
    .catch(error => {
      console.log('Error retrieving beers: ', error);
      res.send('error retrieving beers');
    })

  });



  app.get('/random-beer', async (req, res, next) => {
try {
  let myRandomBeerArray = await punkAPI.getRandom();
  console.log(myRandomBeerArray);
  res.render('randomBeer.hbs', {"randoBeer": myRandomBeerArray[0]});
} catch (error){
console.log('Error retrieving random beer: ', error);
res.send('error retrieving random beer')
}

  })


app.get('/', (req, res) => {
  res.render('index');
});



app.listen(3000, () => console.log('🏃‍ on port 3000'));
