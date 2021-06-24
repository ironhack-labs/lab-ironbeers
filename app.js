const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();


//this is a bad idea as it calls the info when the website sets up, not when the client requests it.
//let getAllBeers;
//punkAPI.getBeers().then((allData) => getAllBeers = allData); 


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

//presetting the dir address for assets used by the hbs files - so then you can simply write it this way:
//<img src="images/beer.png" alt="beer picture">
//no need to write ../public/ before the images/beer.png , this prewrites it 
app.use(express.static(path.join(__dirname, 'public')));


// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname , "/views/partials")) 




// Add the route handlers here:

app.get('/', (req, res) => {res.render('index')});

/* app.all('/beers', (req, res) => {
punkAPI
  .getBeers()
  .then(beersFromApi => console.log('Beers from the database: ', beersFromApi))
  .catch(error => console.log(error));
})
 */


app.all("/beers", (req, res) => {
  punkAPI.getBeers()
  .then(data => {
    res.render("beers", {data})
  })
})



app.all("/random-beer", (req, res) => {
  punkAPI.getRandom()
  .then(data => {
    res.render("randomBeer", data[0])
  })
})



app.listen(4000, () => console.log('🏃‍ on port 4000'));
