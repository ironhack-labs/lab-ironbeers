let express = require('express');

let hbs = require('hbs');
let path = require('path');
let PunkAPIWrapper = require('punkapi-javascript-wrapper');

let app = express();
let punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(__dirname + "/views/partials");

// Add the route handlers here:

app.get('/', (req, res) => {res.render('index')});


app.get("/beers", (req, res) => {
  punkAPI.getBeers().then((response) => {
  res.render("beers", {response})
}).catch(err => console.log("error"));
})

app.get("/random-beer", (req, res) => {
  punkAPI.getRandom().then((response) => {
    res.render("random-beer",{response})
  }).catch(err => console.log("error"));
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
