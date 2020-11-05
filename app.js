const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + "/views/partials");

 //set the view engine template to understand express
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

//make the file accessible
app.use(express.static(path.join(__dirname, 'public')));

// Add the route handlers here:
app.get('/', (req, res) => {
  res.render('index');
  });

app.get('/beers', (req, res) => {
  //const greeting = "Hi there!";
  punkAPI
  .getBeers()
  .then(beersFromApi => {
    console.log('Beers from the database: ', beersFromApi)
    res.render("beers.hbs", { beersFromApi });
    })
  .catch(error => console.log(error)); 
 });


 app.get('/randombeers', (req, res) => {
  //const greeting = "Hi there!";
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    console.log('Beers from the database: ', responseFromAPI)
    res.render("randombeers.hbs", { responseFromAPI });
   })
  .catch(error => console.log(error)); 
 });


app.listen(3000, () => console.log('🏃‍ on port 3000'));
