// importaciones 
const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

// Middlewares


require("dotenv").config()
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

//hbs.registerPartial(__dirname + "/views/partials")

// ...



// Add the route handlers here:



app.get("/", (req, res) => {
res.render("index");
});

app.get("/beer", (req,res)=> {
  res.render("beer")
})




//Servidor

app.listen(3000, () => console.log('servidor activo'));
