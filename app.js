// importaciones 
const express = require("express");
const hbs = require("hbs");
const app = express();
const async = require("hbs/lib/async")
const router		= express.Router()

const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');


const punkAPI = new PunkAPIWrapper();

// Middlewares
require("dotenv").config()

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');




// Register the location for handlebars partials here:

//hbs.registerPartial(path.join(__dirname + "./views/partial"))

// ...



// Add the route handlers here:



app.get("/", async(req, res) => {
res.render("index");
});

app.get("/beer", async(req,res)=> {
  res.render("beer")
})

app.get("/layout", async(req,res) =>{
  res.render("layout")
})



//Servidor

app.listen(3000, () => console.log('servidor activo'));
