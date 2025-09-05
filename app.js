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

hbs.registerPartials(path.join(__dirname + "/views/partials"));



// ...

// Add the route handlers here:

app.get('/', (req, res, next) => res.render("Home"));

app.get('/beers', (req, res, next) => {

fetch("https://api.sampleapis.com/beers/ale")
  .then(response => response.json())
  .then(beersFromApi => { 
    console.log('Beers from the API:', beersFromApi);
    
    res.render("beers", { beers: beersFromApi })
  })
  .catch(error => console.log(error));

});

app.get("/random", (req, res, next) => {
  fetch("https://api.sampleapis.com/beers/ale")
    .then(response => response.json())
    .then(beersFromApi => {
      console.log('Total beers:', beersFromApi.length)
      const randomBeer = beersFromApi[Math.floor(Math.random()*beersFromApi.length)] //devuelve un objeto
      res.render('random', {beers: [randomBeer]} ) //poner [] para convertirlo a array
    })
    .catch(error => console.log(error));

});
//para mostrar los detalles de una sola cerveza
app.get("/beers/:id", (req, res, next) => {
  const beerId = req.params.id;

  fetch("https://api.sampleapis.com/beers/ale")
    .then(response => response.json())
    .then(beersFromApi => {
      const beer = beersFromApi.find(b => String(b.id) === beerId);
      if (!beer) return res.status(404).send("Cerveza no encontrada");
      res.render("beerDetails", { beer });
    })
    .catch(next);
  })

 


app.listen(3000, () => console.log('🏃‍ on port 3000'));
