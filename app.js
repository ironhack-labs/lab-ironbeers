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

//Set the partials location
hbs.registerPartials(__dirname + '/views/partials');

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});




app.get('/random-beer', async (req, res) => {
  try {
    let randomBeerFromAPI = await punkAPI.getRandom();
    
    console.log('test', randomBeerFromAPI);
    res.render('random-beer', {randomBeerFromAPI});
  } catch (e) {
    console.log(e);
  }
});







// app.get('/beers', (req, res) => {
//   //1. code runnning order (1)
//   punkAPI.getBeers().then((beersFromAPI) => {
//     //2. code runnning order (3)
//   res.render('beers', {beersFromAPI});
//   });
//   //3. code runnning order (2)
// });

app.get('/beers', async (req, res) => {
  try {
    let beersFromAPI = await punkAPI.getBeers();
    console.log(beersFromAPI);
    res.render('beers', {beersFromAPI});
  } catch(e){
    console.log(e);
  }
});


// punkAPI.getRandom()


app.listen(3000, () => console.log('🏃‍ on port 3000'));
