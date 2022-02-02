//IMPORTACIONES
const express = require('express');

const hbs = require('hbs');
const path = require('path');


const app = express();


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname + '/views/partials'));


// Add the route handlers here:
//RUTAS


app.use("/", require("./routes/index"))

//SERVIDOR

app.listen(3000, () => console.log('http://localhost:3000'));
