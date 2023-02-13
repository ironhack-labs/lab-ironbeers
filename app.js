const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

//for the image? but its a form example
/* const bodyParser = require('body-parser') */
//for the image? but its a form example
//make the app use the bodyparser
/* app.use(bodyPerser.urlencoded({extended: true})) */


const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));



app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials')

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

/* app.get('/beers', (req, res) => {
  punkAPI.getBeers()
    .then(beers =>  {
    res.render('beers', { beers });
    console.log("Response is ", beers)
  })
  .catch(error => console.log(error));
}); */

app.get('/beers', async (req, res)=> {
  try {
    //get the beers from th e API 
    let beersFromApi = await punkAPI.getBeers()
    //console.log(beers)
    // Send the beers to the view
    res.render('beers', {beers: beersFromApi})
  } catch (error) {
    
  }
})


app.get('/beers/:beerId', (req, res) => {
  punkAPI
  .getBeer(req.params.beerId)
  .then((beersInfo) => {
    //console.log('beer info' , beersInfo.beers)
   
    res.render('info', {beers: beersInfo})
  })
  .catch((error) => console.log(error));
})


app.get('/random', (req, res) => {
  punkAPI.getRandom()
  .then(beers => {
    // your magic happens here
    res.render('random', beers[0]);
  })
  .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
