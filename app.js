const express   = require("express");
const hbs       = require("hbs");
const path      = require("path");

const app       = express();
 
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
hbs.registerPartials(__dirname + "/views/partials");

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
  .getBeers()
  .then(beersFromApi => {
    console.log('Beers from the database: ', beersFromApi)
    
  res.render('beers', {data: beersFromApi})
  })
  .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    console.log('Random beer: ', responseFromAPI)
    
    res.render('random-beer', {data:responseFromAPI});
  })
  .catch(error => console.log(error));

});

app.listen(3000, () => console.log('🏃‍ on port 3000'));