cconst express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index.hbs');
});


app.get('/beers', (req, res) => {
  //res.render(__dirname + '/views/beers.hbs', ) // how it was before
  punkAPI.getBeers()
    .then(beersFromApi => 
      {console.log('Beers from the database: ', beersFromApi)
      res.render(__dirname + '/views/beers.hbs', { beersFromApi: beersFromApi }) // always pass information as objects ( with {})
  })
    .catch(error => console.log(error));  
})
    


app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
    .then(responseFromAPI  => 
      {console.log('Random beer: ', responseFromAPI )
      res.render(__dirname + '/views/random-beer.hbs', { responseFromAPI : responseFromAPI  }) // always pass information as objects ( with {})
  })
    .catch(error => console.log(error));  
});


app.listen(3001, () => console.log('running on port 3001'));
