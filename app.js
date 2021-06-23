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

// Set the partials location:
hbs.registerPartials(__dirname + "/views/partials");

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

// app.get('/beers', (req, res) => {
//   res.render('beers');
// });

/* app.get("/beers", (req, res)=>{
  punkAPI.getBeers().then(beersFromTheAPI)=>{
    res.render('beers', {beersFromTheAPI});
  });  
}); */

app.get("/beers", async (req, res) => {
  let beersFromTheAPI = await punkAPI.getBeers();
/*   console.log("Here I am:", beersFromTheAPI);
 */  res.render("beers", { beersFromTheAPI });
});

app.get("/random-beer", async(req, res)=>{
  let randomBeerFromAPI = await punkAPI.getRandom();
/*   console.log('This is a random beer from the beers array', randomBeerFromAPI)
 */  res.render("random", {randomBeerFromAPI});
});



app.listen(3500, () => console.log('🏃‍ on port 3500'));
