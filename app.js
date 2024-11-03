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

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});
app.get ('/cervezas', (req, res) => {
  fetch("https://ih-beers-api2.herokuapp.com/beers")
  .then(response => response.json())
  .then(beersFromApi => {
    console.log('Cervezas desde la API: ', beersFromApi);
    res.render('cervezas', { beersFromApi }); 
})
  .catch(error => console.log(error));

  })

app.get('/cerveza-al-azar', (req, res) => {


  fetch("https://ih-beers-api2.herokuapp.com/beers/random")
  .then(response => response.json())
  .then(responseFromAPI => {
    // your magic happens here


    res.render('cerveza-al-azar', { beer: responseFromAPI });
  })
  .catch(error => console.log(error));
  
});



app.get('/cervezas/:id', (req, res) => {
  const beerId = req.params.id;

  fetch(`https://ih-beers-api2.herokuapp.com/beers/${beerId}`)
  .then(response => response.json())
  .then(beer => {
      res.render('detalle-cerveza', { beer });
  })
  .catch(error => {
    console.error('Error al obtener detalles de la cerveza:', error);
    res.status(500).send('Error al obtener detalles de la cerveza');
});



});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
