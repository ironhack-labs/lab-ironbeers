const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();     //the PunkAPIWrapper has been given by npm

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + "/views/partials")
hbs.registerPartials(path.join(__dirname, 'views/partials'));


// Add the route handlers here:
app.get('/', (req, res) => {
  res.render('index');
});

app.get("/random-beer", async (req, res) => {

  try {
  let randomBeerFromAPI = await punkAPI.getRandom();
  res.render("random-beer", { randomBeerFromAPI });
  } catch(e) {
    console.log(e);
  }
});

// app.get('/beers', (req, res) => {             //
//   punkAPI.getBeer().then((beers) => {
//     res.render('beers', { beersFromTheAPI })
//   })
//   res.render('beers');
// });


//Old-way of doing it
// app.get('/beers', (req, res) => {
//   punkAPI.getBeers().then(beersFromTheAPI => {
//     res.render('beers', { beersFromTheAPI });
//   });
// });

//Better-practice way of doing it ⬇️ 

app.get('/beers', async (req, res) => {
  let beersFromTheAPI = await punkAPI.getBeers();
  res.render('beers', { beersFromTheAPI });
});


//aftewards we need to render what is in the beers, that need to go to
//we need to through a random at some point in it, so a .getRandom

app.listen(3000, () => console.log('🏃‍ on port 3000'));
