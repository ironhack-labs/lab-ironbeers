const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();


app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials("partials_absolute_path") // para poder agregar partials creamos esto al principio

// estan son de requisito para el funcionamiento del hbs
app.set('view engine', 'hbs'); 
app.set('views', path.join(__dirname, 'views'));
// hasta aqui los requisitos del hbs
hbs.registerPartials(__dirname + "/views/partials"); // esta es obligatoria para los partials



app.get("/", (req, res, next) => {
  res.render("index") 
});

app.get("/beers", (req, res, next) => {
  punkAPI
  .getBeers()
    .then(beersFromApi => {
      res.render("beers", {beersFromApi}) 
      console.log(beersFromApi)
    })
    .catch(error => console.log(error));

});

app.get("/random-beer", (req, res, next) => {
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    console.log(responseFromAPI)
    res.render("random-beer", {responseFromAPI}) 
  })
  .catch(error => console.log(error));
});

// app.get("/beers/:id", (req, res, next) => {
  
//   punkAPI
//   .getBeers()
//     .then(beersFromApi => {
//       res.render("beers", {beersFromApi}) 
//       console.log(beersFromApi)
//     })
//     .catch(error => console.log(error));
// });




// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
