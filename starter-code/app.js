express = require('express');
hbs = require('hbs');
path = require('path');
PunkAPIWrapper = require('punkapi-javascript-wrapper');

app = express();
punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:
hbs.registerPartials(__dirname + '/views/partials');

// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', { beersFromApi });
    })

    .catch(error => {
      console.log('Error', error);
    });
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then((responseFromAPI) => {
      res.render('random-beer', { responseFromAPI });
    })
    .catch((error) => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
