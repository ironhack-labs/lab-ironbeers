const express = require('express');
const path = require('path');
const hbs = require('hbs');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname + "/views/partials"))
// ...

// Add the route handlers here:
app.use("/", require("./routes/index"))

app.get('/', (req, res) => {
  res.render('index');
});


app.listen(3000, () => console.log('http://localhost:3000'));

