const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

// const rooter = express.Router();

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// add the routes here:
app.get('/', (req, res) => res.render('index'));


app.get('/beers', (req, res) => {
     punkAPI
     .getBeers()
     .then(dbRes => {
        //  console.log("beers from API", dbRes);
        res.render("beers", {dbRes});
      })
     .catch(error => console.log(error));
});

app.get("/beers/single/:id", (req, res) => {
  punkAPI
  .getBeer(req.params.id)
  .then(dbRes => {
      console.log("beer ID from API", dbRes);
      // res.send("whatever");
     res.render("beers-allinfo", {dbRes});
   })
  .catch(error => console.log(error));
});



app.get('/random-beers', (req, res) => {
    punkAPI
    .getRandom()
    .then(dbRes => {
        // console.log("beers from API", dbRes);
       res.render("random-beers", {dbRes});
     })
    .catch(error => console.log(error));
});



app.listen(3000, () => console.log('🏃‍ on port 3000'));


module.exports = app;
