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
hbs.registerPartials(__dirname + '/views/partials');

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  // define the variables
  const imageUrl = '/images/beer.png';
  const user = 'neil';

  //   render the view
  //   syntax: render(<name of view file>, <data in one object>)
  res.render('home', {
    imageUrl,
    user
  });
});

app.get('/beers', (req, res) => {
  //using async/await + try/catch
  punkAPI
    .getBeers()
    .then(data => {
      res.render('beers', { data });
    })
    .catch(error => console.log(error));
});

app.get('/random', (req, res) => {
  punkAPI
    .getRandom()
    .then(data => {
      // your magic happens here
      console.log(data);
      res.render('random', { data });
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
