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


// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', async (req, res) => { 
  const beers = await punkAPI.getBeers()
  try {
      res.render('beers', {beers} )
      console.log(beers);  
  } catch (error) {
      console.error(error)
  }
})

app.get('/random-beers', async (req, res) => {
  const randomBeers = await punkAPI.getRandom()
  try {
    res.render('randomBeers', {randomBeers})
    console.log(randomBeers)
  } catch (err) {
    console.error(err);
  }
})

app.get('/beers/:id', async (req, res) => {
  const thisBeer = await punkAPI.getBeer(req.params.id) 
  try {
    res.render("beerPage", {thisBeer})
    console.log(thisBeer)
  } catch (err) {
    console.error(err)
  }
})


// app.get('/random-beers', async (req, res) => { 
  
//   const randomBeers = await punkAPI.getRandom()
//   try {
//       res.render('randomBeers', {randomBeers} )
//       console.log(randomBeers);  
//   } catch (error) {
//       console.error(error)
//   }
// })

app.listen(3000, () => console.log('🏃‍ on port 3000'));



