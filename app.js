const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const app = express();
const punkAPI = new PunkAPIWrapper();
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, '/views/partial'));
// Register the location for handlebars partials here:
// ...
// Add the route handlers here:
// app.get('/', (req, res, next) => {
//   res.sendFile(__dirname + '/views/home.html');
// });

app.get("/", (req, res, next) => res.render("index"));
app.get('/beer', (req, res, next) => {
  punkAPI
  .getBeers()
  .then(beersFromApi => 
    {
    console.log('Beers from the database: ', beersFromApi)
    res.render('beers',{beersFromApi:beersFromApi});
    })
  .catch(error => console.log(error));
});
  app.get('/Random-beer', (req, res, next) => {
  punkAPI
  .getRandom()
  .then(RbeersFromApi => 
    {
      console.log('randomBeers from the database: ', RbeersFromApi)
      res.render('Random-beer',{RbeersFromApi:RbeersFromApi});
    })
  .catch(error => console.log(error));
});
app.listen(5555, () => console.log('🏃‍ on port 1000'));
