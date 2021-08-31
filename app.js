const express = require('express');

const hbs = require('hbs');
const path = require('path'); 
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + "/views/partials");


// Add the route handlers here:
  //Index (Home)
  app.get("/", (req, res, next) => res.render("index"))

/*   app.get('/user/:id?', function userIdHandler (req, res) {
    console.log(req.route)
    res.send('GET')
  })
 */


  //Beers
  app.get('/beers', (req, res) => {
    console.log('entra')
    punkAPI
      .getBeers()
      .then(beersFromApi => {
        console.log('Beers from the database: ', beersFromApi)
        res.render("beers", {beersFromApi});
      })
    .catch(error => console.log(error));
  });

  app.get('/beers/:id', (req, res) => {
     punkAPI
      .getBeer(req.params.id)
      .then(beersFromApi => {
        console.log('Beers from the database: ', beersFromApi)
        res.render("beers", {beersFromApi});
      })
    .catch(error => console.log(error)); 
  });

  app.get("/random-beer", (req, res, next) => {
    punkAPI
      .getRandom()
      .then(beersFromApi => {
        console.log('random beer from the database: ', beersFromApi)
        res.render("random-beer"
        , {beersFromApi});
      })
    .catch(error => console.log(error));
  });


app.listen(3000, () => console.log('🏃‍ on port 3000'));
