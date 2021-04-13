
//require: cargo los modulos que preciso para realizar la activación
const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

//realizando la activación de modulos (asignandolos a variables) y generando un servidor
const app = express();
const punkAPI = new PunkAPIWrapper();

//configurando el servidor utilizando los parámetros que da Express 
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

//middleware: configura el sitio desde donde se cargarán los archivos
app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ------ HASTA AQUI ES SETUP - NO HAY NADA QUE REPASAR, SE HACE SOLO UNA VEZ POR COMIENZO DE PROYECTO ------ //

// Sgte: Build routes (connect URL to an HTML file, for render)
app.get('/', (req, res) => {
  res.render('index');
});
app.get('/beers', (req, res) => {
  res.render('beers');
});
app.get('/random-beers', (req, res) => {
  res.render('random-beers');
});

//conecta el servidor con el puerto 3000 (para acceder a cualquier puerto el comando "Localhost");
app.listen(3000, () => console.log('🏃‍ on port 3000'));
