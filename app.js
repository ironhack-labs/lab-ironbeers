const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

//Static Files Location Configuration (public folder )
app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + "/views/partials");

// Home Route

app.get('/', (req, res) => res.render('index'));


// Beer Route
app.get("/beers", async (req, res) => {
    try {
      const selectBeer = await punkAPI.getBeers();
      console.log(selectBeer);
      res.render('beers', {selectBeer})
    } catch (error) {
      console.log(error)
    }
  })
  


// Random Beer Route
app.get("/random-beer", async(req, res) => {
    try {
        const randomBeer =await punkAPI.getRandom();
        console.log(randomBeer);
        res.render('random-beer', {randomBeer})
      }catch (error) {
        console.log(error)
      }
      })


app.listen(3000, () => console.log('🏃‍ on port 3000'));
