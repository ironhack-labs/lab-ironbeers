const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

const app = express();


app.set('view engine', 'hbs');

// creates an absolute path pointing to a folder called "views"
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + "/views/partials"); //load all partials from a specific directory.



app.get('/', (req, res) => {
  res.render('index');
});

app.get("/beersPage", (req, res) => {
  punkAPI
    .getBeers()
    .then(beersArray => {
      console.log('Beers from the database: ', beersArray)
      res.render("beersPage", { newname: beersArray })
    })
    .catch(error => console.log(error));
})

app.get('/random', (req, res) => {
  punkAPI
    .getRandom()
    .then(randomBeer => {
      console.log("sasdasdadsasdasdasdsdfghhfgkjg",randomBeer)
      res.render('random',{randomBeer});
    })
    .catch(error => console.log(error));
});

app.get("/bonusPage", (req, res) => {
  punkAPI
    .getBeers()
    .then(beersArray => {
      console.log('Beers from the database: ', beersArray)
      res.render("bonusPage", { newname: beersArray })
    })
    .catch(error => console.log(error));
})

// Default route
app.use((req, res) => {
  res.status(404).send("Not found wey");
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));

